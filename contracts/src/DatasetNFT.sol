// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract DatasetNFT is ERC721URIStorage {
    uint256 public dataset_id = 0;

    struct Dataset {
        string name; // Name of the dataset
        string tokenURI; // IPFS hash or metadata URI
    }

    // Mapping to store dataset details
    mapping(uint256 => Dataset) public getDatasetDetails;

    constructor() ERC721("Dataset Token", "DT") {}

    function createDataset(
        string memory name,
        string memory tokenURI
    ) public returns (uint256) {
        dataset_id += 1;

        // Mint the NFT
        _mint(msg.sender, dataset_id);

        // Set the token URI for the NFT
        _setTokenURI(dataset_id, tokenURI);

        // Store the dataset details
        getDatasetDetails[dataset_id] = Dataset(name, tokenURI);

        return dataset_id;
    }

    function getID() public view returns (uint256) {
        return dataset_id;
    }

    function checkOwnership(uint256 _datasetID) public view returns (bool) {
        return ownerOf(_datasetID) == msg.sender;
    }

    function approveMarketplace(address operator) public {
        setApprovalForAll(operator, true);
    }

    function getOwnedDatasets(
        address user
    ) public view returns (uint256[] memory) {
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

    function fetchDatasetDetails(
        uint256 _datasetID
    ) public view returns (string memory, string memory) {
        require(
            _datasetID > 0 && _datasetID <= dataset_id,
            "Dataset does not exist"
        );

        Dataset memory dataset = getDatasetDetails[_datasetID];
        return (dataset.name, dataset.tokenURI);
    }
}
