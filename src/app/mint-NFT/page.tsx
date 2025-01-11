'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/Radio-group'
// import { Toaster } from '@/components/ui/toast'
import { Upload } from 'lucide-react'
import { upload } from "thirdweb/storage";
import { client } from '@/app/client'
import { Navbar } from '@/components/Navbar'
import { CONTRACTS } from '@/contracts/contractAddress'
import { ABIS } from '@/contracts/contractABI'
import { getContract } from 'thirdweb'


export default function MintNFTPage() {

  const contract = getContract({
    
  })

  const [file, setFile] = useState<File | null>(null)
  const [listingType, setListingType] = useState('marketplace')

  const contractAddress = CONTRACTS.datasetNFT;
  const contractABI = ABIS.datasetNFT;


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  async function createDataset () {
    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      if (!file) throw new Error('No file selected')
      
      // Upload file to IPFS using thirdweb v5
      const uri = await upload({
        client,
        files: [file],
      });

      // Extract just the base hash without filename
      const baseHash = uri.split('//')[1].split('/')[0]
      console.log('IPFS Hash:', baseHash)
      
      // Add IPFS hash to form data
      formData.append('ipfsHash', baseHash)
      
      // Continue with the rest of your form submission logic
      console.log('Form Data:', Object.fromEntries(formData))
      console.log('Listing Type:', listingType)
    } catch (error) {
      console.error('Error uploading to IPFS:', error)
      // Handle error appropriately
    }
  }
    
    return (
    <div>
        <Navbar />
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto mt-8">
            <div>
                <Label htmlFor="file" className="text-white">Upload Dataset (CSV)</Label>
                <div className="mt-2 flex items-center justify-center w-full">
                <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">CSV file (MAX. 100MB)</p>
                    </div>
                    <Input id="file" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                </label>
                </div>
                {file && (
                <p className="mt-2 text-sm text-gray-400">
                    Selected file: {file.name}
                </p>
                )}
            </div>
        </form>
    </div>
    )
}