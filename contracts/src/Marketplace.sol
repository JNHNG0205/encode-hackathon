// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {DatasetNFT} from "./DatasetNFT.sol";

contract Marketplace is ReentrancyGuard {
    DatasetNFT public DatasetContract;
    uint256 public listingIdCounter;

    struct Listing {
        uint256 datasetID;
        address seller;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => uint256[]) public userListings;
    mapping(address => uint256[]) public userPurchases;

    event DatasetListed(
        uint256 indexed listingId,
        uint256 indexed datasetId,
        address seller,
        uint256 price
    );
    event DatasetSold(
        uint256 indexed listingId,
        uint256 indexed datasetId,
        address seller,
        address buyer,
        uint256 price
    );
    event DatasetDelisted(uint256 indexed listingId, uint256 indexed datasetId, address seller);

    constructor(address _datasetContract) {
        DatasetContract = DatasetNFT(_datasetContract);
    }

    function listNewDataset(string memory _IPFSHash, uint256 _price) public {
    uint256 datasetId = DatasetContract.createDataset(msg.sender, _IPFSHash); 

    require(DatasetContract.ownerOf(datasetId) == msg.sender, "You must be the owner of the dataset to list it");

   
    DatasetContract.approveMarketplace(address(this));
    listingIdCounter++;

    listings[listingIdCounter] = Listing({
        datasetID: datasetId,
        seller: msg.sender,
        price: _price,
       isActive:true
    });

    userListings[msg.sender].push(listingIdCounter);

    emit DatasetListed(listingIdCounter, datasetId, msg.sender, _price);
}

    
    function buyDataset(uint256 _listingID) public payable nonReentrant {
        Listing storage listing = listings[_listingID];
        require(listing.isActive, "Listing is not active");
        require(msg.value == listing.price, "Incorrect price");
        require(listing.seller != msg.sender, "Seller cannot buy their own dataset");

        
        DatasetContract.transferFrom(listing.seller, msg.sender, listing.datasetID);
        payable(listing.seller).transfer(msg.value);

        
        listing.isActive = false;
        userPurchases[msg.sender].push(_listingID);

        emit DatasetSold(_listingID, listing.datasetID, listing.seller, msg.sender, listing.price);
    }

    
    function delistDataset(uint256 _listingID) public nonReentrant {
        Listing storage listing = listings[_listingID];
        require(listing.seller == msg.sender, "Only the seller can delist");
        require(listing.isActive, "Listing is not active");

        listing.isActive = false;

        emit DatasetDelisted(_listingID, listing.datasetID, msg.sender);
    }

   
    function getUserListings(address user) external view returns (uint256[] memory) {
        return userListings[user];
    }

   
    function getUserPurchases(address user) external view returns (uint256[] memory) {
        return userPurchases[user];
    }

    
    function displayMarketplaceDatasets() public view returns (Listing[] memory) {
        uint256 totalListings = listingIdCounter;
        uint256 count = 0;

        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].isActive) {
                count++;
            }
        }

        Listing[] memory activeListings = new Listing[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].isActive) {
                activeListings[index] = listings[i];
                index++;
            }
        }

        return activeListings;
    }
}
