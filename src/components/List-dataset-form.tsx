'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/Radio-group'
import { Upload } from 'lucide-react'
import { upload } from "thirdweb/storage";
import { client } from '@/app/client'
import { getContract } from 'thirdweb'
import { useActiveAccount } from 'thirdweb/react'
import { sepolia } from 'thirdweb/chains'
import { CONTRACTS } from '@/contracts/contractAddress'
import ListDatasetCard from './card-detail/ListDatasetCard'
import { useSendTransaction } from 'thirdweb/react'
import { prepareContractCall } from 'thirdweb'

export function ListDatasetForm() {
  const activeAccount = useActiveAccount()
  const { mutate: sendTransaction } = useSendTransaction();
  const contract = getContract ({
    client: client,
    chain: sepolia,
    address: CONTRACTS.marketplace
  })

  const contract2 = getContract({
    client: client,
    chain: sepolia,
    address: CONTRACTS.bidding
  })

  const [listingTitle, setListingTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [listingType, setListingType] = useState('marketplace')
  const [selectedDataset, setSelectedDataset] = useState<bigint | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (listingType === 'marketplace' && selectedDataset !== null) {
        const listDataset = prepareContractCall({
            contract:contract,
            method: "function listDataset(uint256 _datasetId, uint256 _price, string _title, string _category, string _description)",
            params: [
                selectedDataset,
                BigInt(price * 1e18),
                listingTitle,
                category,
                description,
            ],
        });
        sendTransaction(listDataset);
    } else if (listingType === 'bidding' && selectedDataset !== null) {
        const createAuction = prepareContractCall({
            contract:contract2,
            method: "function createAuction(uint256 _tokenId, uint256 _minBid, string _title, string _description, string _category)",
            params: [
                selectedDataset,
                BigInt(price * 1e18),
                listingTitle,
                description,
                category,
            ],
        });
        sendTransaction(createAuction);
    }

    if (selectedDataset !== null) {
        const approve = prepareContractCall({
            contract,
            method: "function approve(address to, uint256 tokenId)",
            params: [CONTRACTS.marketplace, selectedDataset],
        });
        sendTransaction(approve);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="dataset" className='text-white text-xl mb-2'>Choose Dataset to List</Label>
        <ListDatasetCard selectedDataset={selectedDataset} setSelectedDataset={setSelectedDataset} />
      </div>

      <div>
        <Label htmlFor="title" className="text-white">Dataset Title</Label>
        <Input id="title" name="title" className="mt-2 bg-gray-800 border-gray-700 text-white" required value={listingTitle} onChange={(e) => setListingTitle(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea id="description" name="description" className="mt-2 bg-gray-800 border-gray-700 text-white" required value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="category" className="text-white">Category</Label><br />
        <select 
          id="category" 
          name="category" 
          className="mt-2 bg-gray-800 border-gray-700 text-white" 
          required 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          <option value="finance">Finance</option>
          <option value="real-estate">Real Estate</option>
          <option value="trading">Trading</option>
          <option value="medical">Medical</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="price" className="text-white">Price (ETH)</Label>
        <Input id="price" name="price" type="number" step="0.01" className="mt-2 bg-gray-800 border-gray-700 text-white" required value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </div>

      <div>
        <Label className="text-white">Listing Type</Label>
        <RadioGroup defaultValue={listingType} className="mt-2" onValueChange={setListingType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="marketplace" id="marketplace" className="text-white" />
            <Label htmlFor="marketplace" className="text-white">Sell in Marketplace</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bidding" id="bidding" className="text-white" />
            <Label htmlFor="bidding" className="text-white">Open for Bidding</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
        List Dataset
      </Button>
    </form>
  )
}

