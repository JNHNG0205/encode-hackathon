
# Contracts

**DatasetNFT contract**\
When uploading the dataset file (CSV file) to IPFS, it will return a hash which uniquely identify the file. So we store that hash string in the NFT which will soon be traded in the marketplace or bidding.

**Marketplace contract**\
The marketplace is just a normal NFT trading platform where users will be listing their NFTs dataset there. However, in order for the dataset NFT to be sold, the seller first have to interact with the DatasetNFT contract ```approve``` function only then the NFT can be transfered to the buyer address.