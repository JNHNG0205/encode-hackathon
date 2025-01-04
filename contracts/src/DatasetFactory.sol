// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DatasetNFT.sol";  
import "./Buyer.sol"; 

contract DatasetFactory {
    address public datasetNFTAddress;  
    address public buyerContractAddress; 

    mapping(uint256 => address) public datasetToBuyerContract;

    event DatasetCreated(uint256 datasetID, address datasetAddress, address buyerContractAddress);

    constructor(address _datasetNFTAddress) {
        datasetNFTAddress = _datasetNFTAddress;
    }

    
    function createDataset(
        string memory _IPFSHash,
        address _sellerAddress
    ) public returns (uint256) {
        DatasetNFT nft = DatasetNFT(datasetNFTAddress);

        uint256 datasetID = nft.createDataset(_IPFSHash, _sellerAddress);

        
        BuyerContract buyerContract = new BuyerContract();

       
        datasetToBuyerContract[datasetID] = address(buyerContract);

        emit DatasetCreated(datasetID, datasetNFTAddress, address(buyerContract));
        return datasetID;
    }

    
    function getBuyerContract(uint256 _datasetID) public view returns (address) {
        return datasetToBuyerContract[_datasetID];
    }

    
    function setDatasetNFTAddress(address _datasetNFTAddress) public {
        datasetNFTAddress = _datasetNFTAddress;
    }
}
