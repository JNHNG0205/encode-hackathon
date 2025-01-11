"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowUpIcon as ArrowTrendingUp, Clock } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";

interface BiddingPanelProps {
  id: string;
}

export function BiddingPanel({ id }: BiddingPanelProps) {
  const [bidAmount, setBidAmount] = useState("");
  const currentHighestBid = "1.5 ETH"; // This would come from your backend
  const timeLeft = "2 days 4 hours"; // This would be calculated from your backend data

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="bg-gray-900 border-gray-800 sticky top-4">
      <CardHeader>
        <CardTitle className="text-white text-xl">Place Your Bid</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Current Highest Bid</span>
            <span className="text-2xl font-bold text-cyan-500">
              {currentHighestBid}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Time Left: {timeLeft}</span>
          </div>
        </div>

        <form onSubmit={handleBidSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="bidAmount" className="text-sm text-gray-400">
              Your Bid (ETH)
            </label>
            <div className="relative">
              <Input
                id="bidAmount"
                type="number"
                step="0.01"
                placeholder="Enter bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="bg-gray-800 border-gray-700 pr-16"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ETH
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <ArrowTrendingUp className="w-4 h-4 mr-2" />
            Place Bid
          </Button>
        </form>

        <div className="rounded-lg bg-gray-800/50 p-4">
          <h4 className="font-semibold text-white mb-2">Recent Bids</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">0x1234...5678</span>
              <span className="text-cyan-500">1.5 ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">0x8765...4321</span>
              <span className="text-cyan-500">1.3 ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">0x9876...5432</span>
              <span className="text-cyan-500">1.2 ETH</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-400">
          All bids are final and cannot be withdrawn. Make sure you have
          sufficient funds in your wallet before bidding.
        </p>
      </CardFooter>
    </Card>
  );
}
