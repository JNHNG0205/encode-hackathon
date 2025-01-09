// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DatasetNFT.sol";
import "./Bidding.sol";
import "./Marketplace.sol";

contract ContractFactory {

    // Store deployed DatasetNFT contracts
    address[] public datasetNFTContracts;
    
    // Store deployed Bidding contracts
    address[] public biddingContracts;

    // Store deployed Marketplace contracts
    address[] public marketplaceContracts;

    // Event to log the creation of a DatasetNFT contract
    event DatasetNFTCreated(address indexed datasetNFTAddress);

    // Event to log the creation of a Bidding contract
    event BiddingContractCreated(address indexed biddingContractAddress);

    // Event to log the creation of a Marketplace contract
    event MarketplaceContractCreated(address indexed marketplaceContractAddress);

    // Event to log a new auction creation
    event AuctionCreated(uint256 indexed auctionId, address indexed seller, uint256 minBid);

    // Function to deploy a new DatasetNFT contract
    function createDatasetNFT() public returns (address) {
        DatasetNFT datasetNFT = new DatasetNFT();
        datasetNFTContracts.push(address(datasetNFT));
        emit DatasetNFTCreated(address(datasetNFT));

        return address(datasetNFT);
    }

    // Function to create a new dataset via DatasetNFT's createDataset method
    function createDatasetInNFT(address datasetNFTAddress, address seller, string memory tokenURI) public returns (uint256) {
        DatasetNFT datasetNFT = DatasetNFT(datasetNFTAddress);
        uint256 datasetId = datasetNFT.createDataset(seller, tokenURI);
        
        return datasetId;
    }

    // Function to deploy a new Bidding contract
    function createBidding(address _datasetNFTContract, address _marketplaceContract) public returns (address) {
        Bidding biddingContract = new Bidding(_datasetNFTContract, _marketplaceContract);
        biddingContracts.push(address(biddingContract));
        emit BiddingContractCreated(address(biddingContract));

        return address(biddingContract);
    }

    // Function to deploy a new Marketplace contract
    function createMarketplace(address _datasetNFTContract) public returns (address) {
        Marketplace marketplaceContract = new Marketplace(_datasetNFTContract);
        marketplaceContracts.push(address(marketplaceContract));
        emit MarketplaceContractCreated(address(marketplaceContract));

        return address(marketplaceContract);
    }

    // Function to create an auction in the Bidding contract
    function createAuctionInBidding(
        address biddingContractAddress,
        uint256 tokenId,
        uint256 minBid
    ) public returns (uint256) {
        Bidding biddingContract = Bidding(biddingContractAddress);

        // Call the createAuction function in the Bidding contract
        biddingContract.createAuction(tokenId, minBid);

        // Emit an event after auction is created
        emit AuctionCreated(tokenId, msg.sender, minBid);

        return tokenId; // Returning the tokenId just for reference
    }

    // Function to get all deployed DatasetNFT contracts
    function getAllDatasetNFTContracts() public view returns (address[] memory) {
        return datasetNFTContracts;
    }

    // Function to get all deployed Bidding contracts
    function getAllBiddingContracts() public view returns (address[] memory) {
        return biddingContracts;
    }

    // Function to get all deployed Marketplace contracts
    function getAllMarketplaceContracts() public view returns (address[] memory) {
        return marketplaceContracts;
    }

    // Function to list a DatasetNFT in the marketplace
    function listDatasetInMarketplace(
        address _marketplace,
        uint256 _datasetId,
        uint256 _price
    ) public {
        Marketplace marketplace = Marketplace(_marketplace);
        marketplace.listDataset(_datasetId, _price);
    }

    // Function to place a bid in the Bidding contract
    function placeBid(
        address _biddingContract,
        uint256 _auctionId
    ) public payable {
        // Call the placeBid function in the Bidding contract
        Bidding bidding = Bidding(_biddingContract);

        // Ensure that the Bidding contract has valid auction ID
        bidding.placeBid{value: msg.value}(_auctionId);

        // Emit an event for successful bid placement (optional)
        emit NewBid(_auctionId, msg.sender, msg.value);
    }

    // Event to log a new bid placed
    event NewBid(uint256 indexed auctionId, address indexed bidder, uint256 bidAmount);
}
