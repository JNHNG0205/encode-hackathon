'use client'

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { WalletIcon, Database, TrendingUp, BadgeDollarSign, ChevronDown, ChevronUp, FileQuestion } from "lucide-react";
import Image from 'next/image';
import ProfitChart from '@/components/Chart';
import { Badge } from "@/components/ui/Badge";
import Link from 'next/link';

interface Dataset {
  id: string
  title: string
  description: string
  price: string
  category: string
  type: 'market' | 'bidding'
  records?: string
  lastUpdated?: string
}

export default function Dashboard() {
  const [openCard, setOpenCard] = useState<'purchased' | 'sold' | null>(null);

  const mockUserData = {
    name: "John Doe",
    walletAddress: "0x1234...5678",
    walletBalance: 0.01,
    datasetsPurchased: 3,
    datasetsSold: 2,
    profit: 0.124,
  };

  // Update the mock data to match Dataset-grid structure
  const purchasedDatasets: Dataset[] = [
    {
      id: '1',
      title: 'Customer Behavior Analysis',
      description: 'Comprehensive dataset of customer purchasing patterns and behaviors.',
      price: '0.5 ETH',
      category: 'Marketing',
      type: 'market',
      records: '1M+',
      lastUpdated: '2023-12-15'
    },
    {
      id: '2',
      title: 'Financial Markets Data',
      description: 'Historical stock market data with technical indicators.',
      price: '0.8 ETH',
      category: 'Finance',
      type: 'market',
      records: '500K+',
      lastUpdated: '2024-01-10'
    },
    {
      id: '3',
      title: 'IoT Sensor Readings',
      description: 'Real-time sensor data from industrial IoT devices.',
      price: '0.3 ETH',
      category: 'Industrial',
      type: 'market',
      records: '10M+',
      lastUpdated: '2024-01-20'
    }
  ];

  // Similar structure for sold datasets
  const soldDatasets: Dataset[] = [
    {
      id: '4',
      title: 'Social Media Trends',
      description: 'Aggregated social media engagement metrics.',
      price: '0.6 ETH',
      category: 'Social',
      type: 'market',
      records: '5M+',
      lastUpdated: '2024-01-18'
    },
    {
      id: '5',
      title: 'Healthcare Analytics',
      description: 'Anonymized patient care and treatment outcomes.',
      price: '1.2 ETH',
      category: 'Healthcare',
      type: 'market',
      records: '2M+',
      lastUpdated: '2024-01-05'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="mb-8 flex items-start gap-6">
          <div className="relative">
            <Image
              src="/pfp.webp"
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full bg-gray-800"
            />
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-gray-950 bg-green-500"></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{mockUserData.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-gray-400">
              <WalletIcon className="h-4 w-4" />
              <span className="font-mono">{mockUserData.walletAddress}</span>
            </div>
            <div>
                <span className='font-mono text-white'>{mockUserData.walletBalance} ETH</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Expandable Cards */}
          <div className="space-y-6">
            {/* Datasets Purchased */}
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader 
                className="flex flex-row items-center justify-between pb-2 cursor-pointer"
                onClick={() => setOpenCard(openCard === 'purchased' ? null : 'purchased')}
              >
                <CardTitle className="text-sm font-medium text-gray-400">
                  Datasets Purchased
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-gray-400" />
                  {openCard === 'purchased' ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{mockUserData.datasetsPurchased}</div>
                {openCard === 'purchased' && (
                  <div className="space-y-3 mt-4 border-t border-gray-800 pt-4">
                    {purchasedDatasets.map((dataset) => (
                      <Link href={`/dataset/${dataset.id}`} key={dataset.id}>
                        <Card className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-colors">
                          <CardHeader>
                            <div className="flex justify-between">
                              <CardTitle className="text-white flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                {dataset.title}
                              </CardTitle>
                              <Badge variant="outline" className="bg-gray-800/50">
                                ID: {dataset.id}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-400 mb-4">{dataset.description}</p>
                            <ul className="space-y-2 text-gray-400">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Category: {dataset.category}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Records: {dataset.records}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Last Updated: {dataset.lastUpdated}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Price: {dataset.price}
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Datasets Sold */}
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader 
                className="flex flex-row items-center justify-between pb-2 cursor-pointer"
                onClick={() => setOpenCard(openCard === 'sold' ? null : 'sold')}
              >
                <CardTitle className="text-sm font-medium text-gray-400">
                  Datasets Sold
                </CardTitle>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  {openCard === 'sold' ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{mockUserData.datasetsSold}</div>
                {openCard === 'sold' && (
                  <div className="space-y-3 mt-4 border-t border-gray-800 pt-4">
                    {soldDatasets.map((dataset) => (
                      <Link href={`/dataset/${dataset.id}`} key={dataset.id}>
                        <Card className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-colors">
                          <CardHeader>
                            <div className="flex justify-between">
                              <CardTitle className="text-white flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                {dataset.title}
                              </CardTitle>
                              <Badge variant="outline" className="bg-gray-800/50">
                                ID: {dataset.id}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-400 mb-4">{dataset.description}</p>
                            <ul className="space-y-2 text-gray-400">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Category: {dataset.category}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Records: {dataset.records}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Last Updated: {dataset.lastUpdated}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Price: {dataset.price}
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Static Cards */}
          <div className="space-y-6">
            {/* Profit Card */}
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total Profit
                </CardTitle>
                <BadgeDollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockUserData.profit.toLocaleString()} ETH
                </div>
              </CardContent>
            </Card>
            
            {/* Chart */}
            <ProfitChart data={{
              profit: mockUserData.profit
            }} />
          </div>
        </div>
      </main>
    </div>
  );
}