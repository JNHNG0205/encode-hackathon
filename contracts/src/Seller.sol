// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DatasetNFT.sol";

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

   
    function uploadDataset(string memory _IPFSHash, uint256 _price ) public {
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

    
    function getSellerDatasets(address _seller) public view  returns (uint256[] memory){
        return sellerDatasets[_seller];
    }
}
