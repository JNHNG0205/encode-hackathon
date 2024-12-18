import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Database, Clock } from 'lucide-react'

interface DatasetDetailsProps {
  id: string
}

export function DatasetDetails({ id }: DatasetDetailsProps) {
  // In a real application, fetch this data from your API
  const dataset = {
    title: 'Customer Behavior Analysis',
    owner: '0x1234...5678',
    category: 'Marketing',
    publishedDate: '2024-01-15',
    description: 'Comprehensive dataset of customer purchasing patterns and behaviors. This dataset includes detailed information about customer demographics, purchase history, browsing behavior, and engagement metrics.',
    specifications: [
      'Format: CSV',
      'Size: 2.5GB',
      'Records: 1M+',
      'Updated: Monthly',
      'Historical Data: 2 years'
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">{dataset.title}</h1>
        <div className="flex items-center gap-4 text-gray-400">
          <Badge variant="outline" className="bg-gray-800/50">
            ID: {id}
          </Badge>
          <span>Owned by {dataset.owner}</span>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5" />
            Dataset Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">{dataset.description}</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Dataset Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-400">
            {dataset.specifications.map((spec, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                {spec}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}