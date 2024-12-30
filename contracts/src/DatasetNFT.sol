// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract DatasetNFT is ERC721 {
    uint256 public dataset_id = 0;

    struct Dataset {
        string IPFSHash; // IPFS hash
        address creator; // seller that created the dataset
    }

    mapping(uint256 => Dataset) public getDataset;

    constructor() ERC721("Dataset Token", "DT") {}

    function createDataset(
        string memory _IPFSHash,
        address _sellerAddress
    ) public {
        dataset_id += 1;
        _mint(_sellerAddress, dataset_id);
        getDataset[dataset_id] = Dataset(_IPFSHash, msg.sender);
    }

    function getID() public view returns (uint256) {
        return dataset_id;
    }
}
