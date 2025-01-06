// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";  // Import ERC721URIStorage to manage token URIs

contract DatasetNFT is ERC721URIStorage {  // Use ERC721URIStorage instead of ERC721
    uint256 public dataset_id = 0;

    constructor() ERC721("Dataset Token", "DT") {}

    function createDataset(address seller, string memory tokenURI) public {
        dataset_id += 1;
        _mint(seller, dataset_id);
        _setTokenURI(dataset_id, tokenURI); // Store the IPFS hash here
    }

   
    function getID() public view returns (uint256) {
        return dataset_id;
    }

    
    function checkOwnership(uint256 _datasetID, address _owner) public view returns (bool) {
        return ownerOf(_datasetID) == _owner;
    }
}
