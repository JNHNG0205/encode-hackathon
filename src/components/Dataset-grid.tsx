"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FileQuestion, Database } from "lucide-react";
import Link from "next/link";
import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { CONTRACTS } from "@/contracts/contractAddress";
import { useReadContract } from "thirdweb/react";


export function DatasetGrid({
  view,
}: {
  view: string;
}) {
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: CONTRACTS.marketplace
  });

  const { data, isPending } = useReadContract({
    contract:contract,
    method: "function getAllListings() view returns ((uint256 datasetID, string title, string category, string description, address seller, uint256 price, bool isActive)[])",
    params: [],
  }); 

  const contract2 = getContract ({
    client: client,
    chain: sepolia,
    address: CONTRACTS.bidding
  });

  const { data:auctionDetails, isPending:isLoading } = useReadContract({
    contract:contract2,
    method:
      "function getAllAuctions() view returns ((uint256 auctionId, uint256 tokenId, address seller, uint256 minBid, uint256 highestBid, address highestBidder, bool active, bool fundsWithdrawn, string title, string description, string category)[])",
    params: [],
  });

  // Directly map over all listings without filtering
  const datasets = data || [];

  const auction = auctionDetails || [];

  // Check if the data is still loading
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (datasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <FileQuestion className="w-16 h-16 mb-4" />
        <p className="text-xl font-semibold">No datasets found</p>
        <p>Try adjusting your search or view settings</p>
      </div>
    );
  }

  // Check if the view is "bidding" and map over auction details
  if (view === "bidding") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auction.map((auctionItem) => (
          <Link
            href={`/bidding/${auctionItem.auctionId}`}
            key={auctionItem.auctionId}
            className="h-[300px] block"
          >
            <Card className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-colors h-full flex flex-col">
              <CardHeader className="flex-none pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-2xl">
                    {auctionItem.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
                  >
                    {auctionItem.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden px-6">
                <p className="text-gray-400 mb-6">{auctionItem.description}</p>
              </CardContent>
              <CardFooter className="flex-none flex justify-between items-center mt-auto px-6 pb-6">
                <span className="text-cyan-500 font-semibold text-xl">
                  {Number(auctionItem.minBid) / 1e18} ETH
                </span>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-950"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {datasets.map((dataset) => (
        <Link
          href={`/dataset/${Number(dataset.datasetID)}`}
          key={Number(dataset.datasetID)}
          className="h-[300px] block"
        >
          <Card className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-colors h-full flex flex-col">
            <CardHeader className="flex-none pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-white text-2xl">
                  {dataset.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
                >
                  {dataset.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden px-6">
              <p className="text-gray-400 mb-6">{dataset.description}</p>
            </CardContent>
            <CardFooter className="flex-none flex justify-between items-center mt-auto px-6 pb-6">
              <span className="text-cyan-500 font-semibold text-xl">
                {Number(dataset.price) / 1e18} ETH
              </span>
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-950"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
