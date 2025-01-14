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
import { getContract } from 'thirdweb'
import { sepolia } from 'thirdweb/chains'
import { prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendTransaction} from "thirdweb/react";
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function MintNFTPage() {

  const contract = getContract({
    client:client,
    chain: sepolia,
    address: CONTRACTS.datasetNFT
  })


  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('');

  const { mutate: sendTransaction } = useSendTransaction()


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      if (!file) throw new Error('No file selected')
      
      // Upload file to IPFS using thirdweb
      const uri = await upload({
        client,
        files: [file],
      });

      // Extract just the base hash without filename
      const baseHash = uri.split('//')[1].split('/')[0]
      console.log('IPFS Hash:', baseHash)
      
      // Add IPFS hash to form data
      formData.append('ipfsHash', baseHash)
      
      // Prepare the contract call to mint the NFT
      const createDataset = prepareContractCall({
        contract,
        method: "function createDataset(string datasetName, string tokenURI) returns (uint256)",
        params: [name, baseHash],
      });

      await sendTransaction(createDataset)
      
      toast.success('Mint Dataset NFT Successful!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      console.log('Form Data:', Object.fromEntries(formData))
    } catch (error) {
      console.error('Error uploading to IPFS or sending transaction:', error)
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

                <div className='mt-2'>
                  <Label htmlFor="file" className="text-white">DatasetNFT Name</Label>
                  <Input id="name" type="text" className='text-black' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>


            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Mint Dataset NFT
            </Button>

            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
              />
        </form>
    </div>
    )
}