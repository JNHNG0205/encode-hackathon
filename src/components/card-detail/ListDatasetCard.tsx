'use client'

import React from 'react'
import { useState } from 'react'
import { client } from "@/app/client"
import { CONTRACTS } from "@/contracts/contractAddress"
import { getContract } from "thirdweb"
import { sepolia } from "thirdweb/chains"
import { useActiveAccount } from "thirdweb/react"
import { useReadContract } from "thirdweb/react"
import { Card, CardContent } from '../ui/Card'
import { CheckCircle2 } from 'lucide-react'

interface ListDatasetCardProps {
    selectedDataset: bigint | null;
    setSelectedDataset: (id: bigint | null) => void;
}

export default function ListDatasetCard({ selectedDataset, setSelectedDataset }: ListDatasetCardProps) {
    const activeAccount = useActiveAccount()

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: CONTRACTS.datasetNFT
    })

    const { data, isPending, error } = useReadContract({
        contract,
        method: "function getOwnedDatasets(address user) view returns (uint256[] tokenIds, string[] names, string[] tokenURIs)",
        params: [activeAccount?.address],
    })

    const handleSelectDataset = (id: bigint) => {
        setSelectedDataset(id === selectedDataset ? null : id)
        console.log("Current selected dataset ID:", id)
    }

    if (isPending) return <p className="text-center text-gray-500">Loading datasets...</p>
    if (error) return <p className="text-center text-red-500">Error fetching data: {error.message}</p>
    if (!data || data[0]?.length === 0) return <p className="text-center text-gray-500">No dataset details available.</p>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data[0].map((id, index) => (
                <Card 
                    key={id.toString()} 
                    className={`bg-gray-900 border-2 ${
                        selectedDataset === BigInt(id)
                            ? 'border-cyan-500' 
                            : 'border-gray-800 hover:border-cyan-500/50'
                    } text-white transition-all duration-300 cursor-pointer`}
                    onClick={() => handleSelectDataset(BigInt(id))}
                >
                    <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold truncate">{data[1][index].toString()}</h3>
                            {selectedDataset === BigInt(id) && (
                                <CheckCircle2 className="text-cyan-500 h-5 w-5" />
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

