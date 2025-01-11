"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Mock data - replace with your actual data fetching
const MOCK_DATASETS = {
  "2": {
    id: "2",
    title: "Financial Markets Data",
    description: "Historical stock market data with technical indicators.",
    currentBid: "0.8 ETH",
    ownedBy: "0x1234...5678",
    specifications: [
      "Time Period: 2010-2024",
      "Update Frequency: Daily",
      "Data Format: CSV",
      "Size: 2.5GB",
    ],
  },
  // ... add other datasets
};

export default function BiddingPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("");
  const dataset = MOCK_DATASETS[params.id];

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your bidding logic here
    console.log("Placing bid:", bidAmount);
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
                  {dataset.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-400">{dataset.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Owned by
                    </h3>
                    <p className="text-gray-400">{dataset.ownedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                      Dataset Specifications
                    </h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {dataset.specifications.map((spec, index) => (
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
                  {dataset.currentBid}
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
