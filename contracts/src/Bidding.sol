// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DatasetNFT.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Bidding is ReentrancyGuard {
    DatasetNFT public DatasetContract;

    struct Auction {
        uint256 auctionId;
        uint256 tokenId;
        address seller;
        uint256 minBid;
        uint256 highestBid;
        address highestBidder;
        bool active;
        bool fundsWithdrawn;
    }

    uint256 public auctionCounter = 0;
    mapping(uint256 => Auction) public auctions;
    mapping(address => uint256[]) public userBids;
    mapping(address => uint256) public auctionEarnings;

    event AuctionCreated(
        uint256 indexed auctionId,
        address seller,
        uint256 minBid
    );

    event NewBid(
        uint256 indexed auctionId,
        address bidder,
        uint256 bidAmount
    );

    event AuctionClosed(
        uint256 indexed auctionId,
        address seller,
        address winner,
        uint256 winningBid
    );

    constructor(address _datasetContract) {
        DatasetContract = DatasetNFT(_datasetContract);
    }

    function createAuction(uint256 _tokenId, uint256 _minBid) public {
        require(_minBid > 0, "Minimum bid must be greater than zero");
        require(DatasetContract.ownerOf(_tokenId) == msg.sender, "Caller is not the owner of the dataset");

        auctionCounter++;

        auctions[auctionCounter] = Auction({
            auctionId: auctionCounter,
            tokenId: _tokenId,
            seller: msg.sender,
            minBid: _minBid,
            highestBid: 0,
            highestBidder: address(0),
            active: true,
            fundsWithdrawn: false
        });

        emit AuctionCreated(auctionCounter, msg.sender, _minBid);
    }

    function placeBid(uint256 _auctionId) public payable nonReentrant {
        Auction storage auction = auctions[_auctionId];
        require(auction.active, "Auction is not active");
        require(msg.value >= auction.minBid, "Bid must meet minimum bid");
        require(msg.value > auction.highestBid, "Bid must be higher than the current highest bid");
        require(msg.sender != auction.seller, "Seller cannot place a bid on their own auction");

        if (auction.highestBidder != address(0)) {
            (bool success, ) = auction.highestBidder.call{ value: auction.highestBid }("");
            require(success, "Refund failed");
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;

        userBids[msg.sender].push(_auctionId);

        emit NewBid(_auctionId, msg.sender, msg.value);
    }

    function closeAuction(uint256 _auctionId) public nonReentrant {
        Auction storage auction = auctions[_auctionId];
        require(auction.active, "Auction is already closed");
        require(auction.seller == msg.sender, "Only the seller can close the auction");
        require(!auction.fundsWithdrawn, "Funds have already been withdrawn");

        auction.active = false;

        if (auction.highestBidder != address(0)) {
            
            DatasetContract.transferFrom(auction.seller, auction.highestBidder, auction.tokenId);

            
            (bool success, ) = auction.seller.call{value: auction.highestBid}("");
            require(success, "Transfer to seller failed");

            auctionEarnings[auction.seller] += auction.highestBid;

            emit AuctionClosed(_auctionId, auction.seller, auction.highestBidder, auction.highestBid);
        } else {
            emit AuctionClosed(_auctionId, auction.seller, address(0), 0);
        }

        
        auction.fundsWithdrawn = true;
    }

   
    function getAuctionEarnings(address seller) external view returns (uint256) {
        return auctionEarnings[seller];
    }

    function getUserBids(address _user) public view returns (uint256[] memory) {
        return userBids[_user];
    }

    function getAuctionDetails(uint256 _auctionId) public view returns (address seller, uint256 minBid, uint256 highestBid, address highestBidder, bool active) {
        Auction storage auction = auctions[_auctionId];
        return (
            auction.seller,
            auction.minBid,
            auction.highestBid,
            auction.highestBidder,
            auction.active
        );
    }
}
