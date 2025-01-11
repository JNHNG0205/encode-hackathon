'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FileQuestion, Database } from 'lucide-react'
import Link from 'next/link'

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

const MOCK_DATASETS: Dataset[] = [
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
    description: 'Historical stock market data with technical indicators. ',
    price: '0.8 ETH',
    category: 'Finance',
    type: 'bidding',
    records: '500K+',
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    title: 'IoT Sensor Readings',
    description: 'Real-time sensor data from industrial IoT devices. ',
    price: '0.3 ETH',
    category: 'Industrial',
    type: 'market',
    records: '10M+',
    lastUpdated: '2024-01-20'
  },
  {
    id: '4',
    title: 'Social Media Trends',
    description: 'Aggregated social media engagement metrics.',
    price: '0.6 ETH',
    category: 'Social',
    type: 'bidding',
    records: '5M+',
    lastUpdated: '2024-01-18'
  },
  {
    id: '5',
    title: 'Healthcare Analytics',
    description: 'Anonymized patient care and treatment outcomes. ',
    price: '1.2 ETH',
    category: 'Healthcare',
    type: 'market',
    records: '2M+',
    lastUpdated: '2024-01-05'
  },
  {
    id: '6',
    title: 'Supply Chain Data',
    description: 'Global supply chain and logistics performance metrics. ',
    price: '0.7 ETH',
    category: 'Logistics',
    type: 'bidding',
    records: '750K+',
    lastUpdated: '2024-01-12'
  },
]

export function DatasetGrid({ view, searchQuery }: { view: string, searchQuery: string }) {
  const filteredDatasets = MOCK_DATASETS.filter(dataset => 
    dataset.type === view && 
    dataset.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredDatasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <FileQuestion className="w-16 h-16 mb-4" />
        <p className="text-xl font-semibold">No datasets found</p>
        <p>Try adjusting your search or view settings</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDatasets.map((dataset) => (
        <Link href={`/dataset/${dataset.id}`} key={dataset.id} className="h-[300px] block">
          <Card className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-colors h-full flex flex-col">
            <CardHeader className="flex-none pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-white text-2xl">{dataset.title}</CardTitle>
                <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20">
                  {dataset.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden px-6">
              <p className="text-gray-400 mb-6">{dataset.description}</p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <Database className="w-5 h-5 mr-2 text-cyan-500" />
                  <span>Records: {dataset.records}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FileQuestion className="w-5 h-5 mr-2 text-cyan-500" />
                  <span>Last Updated: {dataset.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-none flex justify-between items-center mt-auto px-6 pb-6">
              <span className="text-cyan-500 font-semibold text-xl">{dataset.price}</span>
              <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-500 hover:bg-cyan-950">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}