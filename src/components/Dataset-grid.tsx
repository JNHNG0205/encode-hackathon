'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FileQuestion } from 'lucide-react'

interface Dataset {
  id: string
  title: string
  description: string
  price: string
  category: string
  type: 'market' | 'bidding'
}

const MOCK_DATASETS: Dataset[] = [
  {
    id: '1',
    title: 'Customer Behavior Analysis',
    description: 'Comprehensive dataset of customer purchasing patterns and behaviors',
    price: '0.5 ETH',
    category: 'Marketing',
    type: 'market'
  },
  {
    id: '2',
    title: 'Financial Markets Data',
    description: 'Historical stock market data with technical indicators',
    price: '0.8 ETH',
    category: 'Finance',
    type: 'bidding'
  },
  {
    id: '3',
    title: 'IoT Sensor Readings',
    description: 'Real-time sensor data from industrial IoT devices',
    price: '0.3 ETH',
    category: 'Industrial',
    type: 'market'
  },
  {
    id: '4',
    title: 'Social Media Trends',
    description: 'Aggregated social media engagement metrics',
    price: '0.6 ETH',
    category: 'Social',
    type: 'bidding'
  },
  {
    id: '5',
    title: 'Healthcare Analytics',
    description: 'Anonymized patient care and treatment outcomes',
    price: '1.2 ETH',
    category: 'Healthcare',
    type: 'market'
  },
  {
    id: '6',
    title: 'Supply Chain Data',
    description: 'Global supply chain and logistics performance metrics',
    price: '0.7 ETH',
    category: 'Logistics',
    type: 'bidding'
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
        <Card key={dataset.id} className="bg-gray-900 border-gray-800 hover:border-cyan-500/50 transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-white">{dataset.title}</CardTitle>
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20">
                {dataset.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{dataset.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-cyan-500 font-semibold">{dataset.price}</span>
            <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-500 hover:bg-cyan-950">
              {view === 'market' ? 'Buy Now' : 'Place Bid'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}