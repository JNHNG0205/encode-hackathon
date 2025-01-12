"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { client } from "@/app/client";
import { sepolia } from "thirdweb/chains";
import { CONTRACTS } from "@/contracts/contractAddress";
import { getContract } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";



const specifications = [
  "Format: CSV",
  "Size: 100MB",
  "Records: 1M+",
  "Updated: Monthly",
  "Historical Data: 2 years",
];

export default function BiddingPage({ params }: { params: { id: string } }) {
  const { mutate: sendTransaction } = useSendTransaction();

  const [bidAmount, setBidAmount] = useState("");

  const contract = getContract({
    client: client,
    chain: sepolia,
    address: CONTRACTS.bidding
  })

  const auctionId = params.id;

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAuctionDetails(uint256 _auctionId) view returns (string title, string description, address seller, uint256 minBid, uint256 highestBid, address highestBidder, bool active)",
    params: [BigInt(auctionId)],
  });

  const [title, description, seller, minBid, highestBid, highestBidder, isActive] = data || [];

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    const bid = prepareContractCall({
      contract,
      method:
        "function placeBid(uint256 _auctionId) payable",
      params: [BigInt(auctionId)],
    });
    sendTransaction(bid);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Dataset Info */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-400">{description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Owned by
                    </h3>
                    <p className="text-gray-400">{seller}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Dataset Specifications
                    </h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bidding Panel */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Current Bid
                </CardTitle>
                <p className="text-2xl font-bold text-cyan-500">
                  {highestBid !== undefined ? Number(highestBid) / 1e18 : "N/A"}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBid} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Your Bid (ETH)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      placeholder="Enter bid amount"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    Place Bid
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
