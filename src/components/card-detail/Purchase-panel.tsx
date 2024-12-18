import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileText, MessageCircle } from 'lucide-react'

interface PurchasePanelProps {
  id: string
}

export function PurchasePanel({ id }: PurchasePanelProps) {
  // In a real application, fetch this data from your API
  const dataset = {
    price: '0.5 ETH',
    sales: 45
  }

  return (
    <Card className="bg-gray-900 border-gray-800 sticky top-4">
      <CardHeader>
        <div className="aspect-square rounded-lg bg-gray-800 flex items-center justify-center">
          <FileText className="w-16 h-16 text-gray-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-white">{dataset.price}</span>
          <span className="text-gray-400">{dataset.sales} sales</span>
        </div>
        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mb-4">
          Purchase Dataset
        </Button>
        <Button variant="outline" className="w-full border-cyan-500 text-cyan-500 hover:bg-cyan-950">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Owner
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-400">
          Network gas fees may apply to this transaction. Make sure your wallet is connected before making a purchase.
        </p>
      </CardFooter>
    </Card>
  )
}