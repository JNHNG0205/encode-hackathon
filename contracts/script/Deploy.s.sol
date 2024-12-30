// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {DatasetNFT} from "../src/DatasetNFT.sol";
import {Marketplace} from "../src/Marketplace.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy DatasetNFT contract
        DatasetNFT datasetNFT = new DatasetNFT();
        console.log("DatasetNFT deployed at:", address(datasetNFT));

        // Deploy Marketplace contract with DatasetNFT address
        Marketplace marketplace = new Marketplace(address(datasetNFT));
        console.log("Marketplace deployed at:", address(marketplace));

        vm.stopBroadcast();
    }
}
