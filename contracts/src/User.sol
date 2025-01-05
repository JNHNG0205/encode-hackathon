// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DatasetNFT.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Seller {
    DatasetNFT public DatasetContract;

    struct UploadedDataset {
        string IPFSHash;
        address seller;
        uint256 price;
        bool isLegit;
    }

    mapping(uint256 => UploadedDataset) public uploadedDatasets;
    mapping(address => uint256[]) public sellerDatasets;

    event DatasetUploaded(
        uint256 indexed datasetId,
        address indexed seller,
        string IPFSHash,
        uint256 price
    );

    event DatasetApproved(uint256 indexed datasetId, bool isLegit);

    constructor(address _datasetContract) {
        DatasetContract = DatasetNFT(_datasetContract);
    }

    function uploadDataset(string memory _IPFSHash, uint256 _price) public {
        require(bytes(_IPFSHash).length > 0, "IPFS hash is required");
        require(_price > 0, "Price must be greater than zero");

        DatasetContract.createDataset(_IPFSHash, msg.sender);
        uint256 datasetId = DatasetContract.getID();

        uploadedDatasets[datasetId] = UploadedDataset(
            _IPFSHash,
            msg.sender,
            _price,
            false
        );

        sellerDatasets[msg.sender].push(datasetId);

        emit DatasetUploaded(datasetId, msg.sender, _IPFSHash, _price);
    }

    function approveDataset(uint256 _datasetId, bool _isLegit) public {
        UploadedDataset storage dataset = uploadedDatasets[_datasetId];
        require(dataset.seller != address(0), "Dataset not found");
        require(msg.sender == dataset.seller, "Only the seller can approve");

        dataset.isLegit = _isLegit;

        emit DatasetApproved(_datasetId, _isLegit);
    }

    function getSellerDatasets(
        address _seller
    ) public view returns (uint256[] memory) {
        return sellerDatasets[_seller];
    }
}

contract Buyer {
    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Bid[]) public biddingHistory;
    mapping(uint256 => uint256) public highestBids;
    mapping(uint256 => address) public highestBidder;
    mapping(uint256 => address) public datasetSeller;
    mapping(uint256 => bool) public isBiddingActive;

    function placeBid(uint256 _datasetID) public payable {
        require(isBiddingActive[_datasetID], "Bidding not active");
        require(msg.value > highestBids[_datasetID], "Bid too low");

        if (highestBids[_datasetID] > 0) {
            payable(highestBidder[_datasetID]).transfer(
                highestBids[_datasetID]
            );
        }

        biddingHistory[_datasetID].push(
            Bid({
                bidder: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp
            })
        );

        highestBids[_datasetID] = msg.value;
        highestBidder[_datasetID] = msg.sender;
    }

    function approveSale(uint256 _datasetID, address _nftContract) public {
        IERC721 nft = IERC721(_nftContract);
        address owner = nft.ownerOf(_datasetID);
        require(msg.sender == owner, "Only owner can approve");
        nft.approve(address(this), _datasetID);
    }

    function purchaseDataset(uint256 _datasetID, address _nftContract) public {
        require(msg.sender == highestBidder[_datasetID], "Not highest bidder");

        IERC721 nft = IERC721(_nftContract);
        address currentOwner = nft.ownerOf(_datasetID);

        nft.safeTransferFrom(currentOwner, msg.sender, _datasetID);
        isBiddingActive[_datasetID] = false;
    }

    function distributeToSeller(uint256 _datasetID) public {
        address seller = datasetSeller[_datasetID];
        require(seller != address(0), "Invalid seller");
        require(highestBids[_datasetID] > 0, "No bids");

        payable(seller).transfer(highestBids[_datasetID]);
        highestBids[_datasetID] = 0;
        highestBidder[_datasetID] = address(0);
    }

    function getBiddingHistory(
        uint256 _datasetID
    ) public view returns (Bid[] memory) {
        return biddingHistory[_datasetID];
    }
}
