// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DatasetNFT is ERC721URIStorage {
    uint256 public dataset_id = 0;

    
    constructor() ERC721("Dataset Token", "DT") {}
    
    function createDataset(address seller, string memory tokenURI) public returns (uint256) {
        dataset_id += 1;
        _mint(seller, dataset_id);
        _setTokenURI(dataset_id, tokenURI);

        
        return dataset_id;
    }
    
    function getID() public view returns (uint256) {
        return dataset_id;
    }
    
    function checkOwnership(uint256 _datasetID, address _owner) public view returns (bool) {
        return ownerOf(_datasetID) == _owner;
    }
    
    function approveMarketplace(address operator) public {
        
        setApprovalForAll(operator, true);
    }

    function getOwnedDatasets(address user) public view returns (uint256[] memory) {
    uint256 count = 0;
    for (uint256 i = 1; i <= dataset_id; i++) {
        if (ownerOf(i) == user) {
            count++;
        }
    }

    uint256[] memory ownedDatasets = new uint256[](count);
    uint256 index = 0;

    for (uint256 i = 1; i <= dataset_id; i++) {
        if (ownerOf(i) == user) {
            ownedDatasets[index] = i;
            index++;
        }
    }
    return ownedDatasets;
}

}



