// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DatasetNFT} from "./DatasetNFT.sol";

contract Marketplace {
    DatasetNFT public DatasetContract;

    struct Listing {
        string IPFSHash;
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listingID;
    mapping(address => uint256[]) public userListings;
    mapping(address => uint256[]) public userPurchases;

    event DatasetListed(
        uint256 indexed listingId,
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

    function listNewDataset(string memory _IPFSHash, uint256 price) public {
        DatasetContract.createDataset(_IPFSHash, msg.sender);
        listingID[DatasetContract.getID()] = Listing(
            _IPFSHash,
            msg.sender,
            price
        );
        userListings[msg.sender].push(DatasetContract.getID());

        emit DatasetListed(DatasetContract.getID(), msg.sender, price);
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

    function getUserListings(
        address user
    ) external view returns (uint256[] memory) {
        return userListings[user];
    }

    function getUserPurchases(
        address user
    ) external view returns (uint256[] memory) {
        return userPurchases[user];
    }
}
