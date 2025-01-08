// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DatasetNFT.sol";
import "./Bidding.sol";

contract ContractFactory {
    // Tracks the deployed DatasetNFT and Bidding contracts
    address[] public deployedDatasetContracts;
    address[] public deployedBiddingContracts;

    event DatasetContractDeployed(address indexed datasetContract);
    event BiddingContractDeployed(address indexed biddingContract);

    /**
     * @dev Deploys a new DatasetNFT contract.
     * @param _name The name of the NFT collection.
     * @param _symbol The symbol for the NFT collection.
     * @param _baseURI The base URI for the NFT metadata.
     * @return The address of the newly deployed DatasetNFT contract.
     */
    function deployDatasetNFT(string memory _name, string memory _symbol, string memory _baseURI) external returns (address) {
        DatasetNFT datasetContract = new DatasetNFT(_name, _symbol, _baseURI);
        deployedDatasetContracts.push(address(datasetContract));
        emit DatasetContractDeployed(address(datasetContract));
        return address(datasetContract);
    }

    /**
     * @dev Deploys a new Bidding contract linked to a specific DatasetNFT contract.
     * @param _datasetContract The address of the DatasetNFT contract that the bidding contract will interact with.
     * @return The address of the newly deployed Bidding contract.
     */
    function deployBidding(address _datasetContract) external returns (address) {
        require(_datasetContract != address(0), "Invalid dataset contract address");
        Bidding biddingContract = new Bidding(_datasetContract);
        deployedBiddingContracts.push(address(biddingContract));
        emit BiddingContractDeployed(address(biddingContract));
        return address(biddingContract);
    }

    /**
     * @dev Retrieves the list of deployed DatasetNFT contract addresses.
     * @return An array of DatasetNFT contract addresses.
     */
    function getDeployedDatasetContracts() external view returns (address[] memory) {
        return deployedDatasetContracts;
    }

    /**
     * @dev Retrieves the list of deployed Bidding contract addresses.
     * @return An array of Bidding contract addresses.
     */
    function getDeployedBiddingContracts() external view returns (address[] memory) {
        return deployedBiddingContracts;
    }
}
