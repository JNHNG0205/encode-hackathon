// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DatasetNFT} from "./DatasetNFT.sol";

contract Marketplace {
    DatasetNFT public DatasetContract;
    uint256 public listingIdCounter;

    struct Listing {
        uint256 datasetID; 
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listingID;
    mapping(address => uint256[]) public userListings;
    mapping(address => uint256[]) public userPurchases;

    event DatasetListed(
        uint256 indexed listingId,
        uint256 indexed datasetId,
        address seller,
        uint256 price
    );
    event DatasetSold(
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    constructor(address _datasetContract) {
        DatasetContract = DatasetNFT(_datasetContract);
    }

    function listNewDataset(string memory _IPFSHash, uint256 _price) public {
        uint256 datasetId = DatasetContract.getID() + 1; 
        DatasetContract.createDataset(msg.sender, _IPFSHash); 
        listingIdCounter++; 

        listingID[listingIdCounter] = Listing({
            datasetID: datasetId,
            seller: msg.sender,
            price: _price
        });

        userListings[msg.sender].push(listingIdCounter); 

        emit DatasetListed(listingIdCounter, datasetId, msg.sender, _price);
    }


    function buyDataset(uint256 _listingID) public payable {
        Listing storage listing = listingID[_listingID];
        
        require(msg.value == listing.price, "Wrong price");

        DatasetContract.transferFrom(listing.seller, msg.sender, _listingID);

        payable(listing.seller).transfer(msg.value);
        userPurchases[msg.sender].push(_listingID);
        emit DatasetSold(_listingID, listing.seller, msg.sender, listing.price);
        listing.seller = msg.sender;
    }

    function getUserListings(address user) external view returns (uint256[] memory) {
        return userListings[user];
    }

    function getUserPurchases(address user) external view returns (uint256[] memory) {
        return userPurchases[user];
    }


    //ADD ON
    //display the datasets
    function displayMarketplaceDatasets() public view returns (Listing[] memory) {
        uint256 totalListings = DatasetContract.getID();
        uint256 count = 0;


    for (uint256 i = 1; i <= totalListings; i++) {
        if (listingID[i].seller != address(0)) {
            count++;
        }
    }

    Listing[] memory activeListings = new Listing[](count);
    uint256 index = 0;
    for (uint256 i = 1; i <= totalListings; i++) {
        if (listingID[i].seller != address(0)) {
            activeListings[index] = listingID[i];
            index++;
        }
    }

    return activeListings;
}

    
    function transferDatasetOwnership(uint256 _datasetID, address _newOwner) public {
    Listing storage listing = listingID[_datasetID];
    require(listing.seller == msg.sender, "Only the seller can transfer ownership");

    listing.seller = _newOwner;

    DatasetContract.transferFrom(msg.sender, _newOwner, _datasetID);
}


}
