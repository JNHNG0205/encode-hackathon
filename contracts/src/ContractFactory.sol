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

    // Function to deploy a new DatasetNFT contract
    function createDatasetNFT(
        string memory name,
        string memory symbol
    ) public returns (address) {
         DatasetNFT datasetNFT = new DatasetNFT();
        datasetNFTContracts.push(address(datasetNFT));
        emit DatasetNFTCreated(address(datasetNFT));

        // Approve the marketplace to manage the created DatasetNFT
        approveMarketplace(address(datasetNFT));

        return address(datasetNFT);
    }

    // Function to deploy a new Bidding contract
    function createBidding(address _datasetNFTContract) public returns (address) {
        Bidding biddingContract = new Bidding(_datasetNFTContract);
        biddingContracts.push(address(biddingContract));
        emit BiddingContractCreated(address(biddingContract));

        // Approve the Bidding contract to interact with DatasetNFT
        approveBidding(address(biddingContract));

        return address(biddingContract);
    }

    // Function to deploy a new Marketplace contract
    function createMarketplace(address _datasetNFTContract) public returns (address) {
        Marketplace marketplaceContract = new Marketplace(_datasetNFTContract);
        marketplaceContracts.push(address(marketplaceContract));
        emit MarketplaceContractCreated(address(marketplaceContract));

        // Approve the Marketplace to manage DatasetNFT
        approveMarketplace(address(marketplaceContract));

        return address(marketplaceContract);
    }

    // Function to approve the Marketplace to manage DatasetNFT (approve operation)
    function approveMarketplace(address _marketplace) internal {
        DatasetNFT datasetNFT = DatasetNFT(_marketplace);
        datasetNFT.approve(address(_marketplace), 1); // Approve a specific dataset ID
    }

    // Function to approve the Bidding contract to place bids on DatasetNFT
    function approveBidding(address _biddingContract) internal {
        DatasetNFT datasetNFT = DatasetNFT(_biddingContract);
        datasetNFT.approve(address(_biddingContract), 1); // Approve a specific dataset for bidding
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
