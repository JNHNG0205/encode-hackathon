import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Database, Clock } from 'lucide-react'
import { getContract } from 'thirdweb'
import { sepolia } from 'thirdweb/chains'
import { client } from '@/app/client'
import { CONTRACTS } from '@/contracts/contractAddress'
import { useReadContract } from 'thirdweb/react'

// Hardcoded specifications
const specifications = [
  "Format: CSV",
  "Size: 100MB",
  "Records: 1M+",
  "Updated: Monthly",
  "Historical Data: 2 years",
];

export function DatasetDetails({ id }: { id: string }) {
  
  const contract = getContract({
    client:client,
    chain: sepolia,
    address: CONTRACTS.marketplace
  })

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getListingDetails(uint256 _datasetId) view returns (bool isListed, uint256 price, string title, string category, string description)",
    params: [BigInt(id)],
  });

  // Destructure the data array
  const [isListed, price, title, category, description] = data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-gray-400">
          <Badge variant="outline" className="bg-gray-800/50">
            ID: {id}
          </Badge>
          <span>Owned by 0x85...105B</span>
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
          <p className="text-gray-400">{description}</p>
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
            {specifications.map((spec, index) => (
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