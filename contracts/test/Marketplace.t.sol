// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {DatasetNFT} from "../src/DatasetNFT.sol";
import {Marketplace} from "../src/Marketplace.sol";
import {Deploy} from "../script/Deploy.s.sol";

contract MarketplaceTest is Test {
    Deploy deploy;
    DatasetNFT datasetNFT;
    Marketplace marketplace;
    address public seller = address(0x1);
    address public buyer = address(0x2);

    function setUp() public {
        // Deploy contracts using the Deploy script
        deploy = new Deploy();
        deploy.run();

        // Fund the buyer with some Ether
        vm.deal(buyer, 10 ether);
    }

    function testCreateListingAndBuyDataset() public {
        // Seller creates and lists a new dataset
        vm.startPrank(seller);
        string memory ipfsHash = "QmExampleIPFSHash";
        uint256 price = 1 ether;

        // Mint NFT and approve Marketplace contract
        datasetNFT.createDataset(ipfsHash, seller);
        uint256 tokenId = datasetNFT.getID();
        datasetNFT.approve(address(marketplace), tokenId);

        // List the dataset on the marketplace
        marketplace.listNewDataset(ipfsHash, price);
        vm.stopPrank();

        // Buyer purchases the dataset
        vm.startPrank(buyer);
        marketplace.buyDataset{value: 1 ether}(tokenId);
        vm.stopPrank();

        // Assertions to verify correctness
        assertEq(
            datasetNFT.ownerOf(tokenId),
            buyer,
            "Buyer should now own the NFT"
        );
        assertEq(
            buyer.balance,
            9 ether,
            "Buyer balance should have reduced by the price"
        );
        assertEq(
            seller.balance,
            1 ether,
            "Seller should have received the payment"
        );
    }
}
