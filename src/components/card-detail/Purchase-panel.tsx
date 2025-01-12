import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileText, MessageCircle } from 'lucide-react'
import { getContract, prepareContractCall } from 'thirdweb'
import { client } from '@/app/client'
import { sepolia } from 'thirdweb/chains'
import { CONTRACTS } from '@/contracts/contractAddress'
import { useReadContract, useSendTransaction } from 'thirdweb/react'



export function PurchasePanel({ id }: { id: string }) {

  const { mutate: sendTransaction } = useSendTransaction();
  const contract = getContract({
    client:client,
    chain: sepolia,
    address: CONTRACTS.marketplace
  })

  const listingId = 2;


  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getListingDetails(uint256 _datasetId) view returns (bool isListed, uint256 price, string title, string category, string description)",
    params: [BigInt(id)],
  });

  const [isListed, price, title, category, description] = data || [];


  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function buyDataset(uint256 _listingID) payable",
      params: [BigInt(listingId)],
    });
    sendTransaction(transaction);
  };

  return (
    <Card className="bg-gray-900 border-gray-800 sticky top-4">
      <CardHeader>
        <div className="aspect-square rounded-lg bg-gray-800 flex items-center justify-center">
          <FileText className="w-16 h-16 text-gray-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-white">
            {price !== undefined ? (price / BigInt(1e18)).toString() : 'N/A'} ETH
          </span>
          <span className="text-gray-400">10 sales</span>
        </div>
        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mb-4" onClick= {onClick}>
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