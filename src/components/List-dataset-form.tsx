'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/Radio-group'
// import { Toaster } from '@/components/ui/toast'
import { Upload } from 'lucide-react'

export function ListDatasetForm() {
  const [file, setFile] = useState<File | null>(null)
  const [listingType, setListingType] = useState('marketplace')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Simulate form submission
    console.log('Form Data:', Object.fromEntries(formData))
    console.log('File:', file)
    console.log('Listing Type:', listingType)

    // Show success toast
    // Toaster({
    //   title: "Dataset Listed Successfully",
    //   description: "Your dataset has been submitted for review.",
    // })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
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

      <div>
        <Label htmlFor="title" className="text-white">Dataset Title</Label>
        <Input id="title" name="title" className="mt-2 bg-gray-800 border-gray-700 text-white" required />
      </div>

      <div>
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea id="description" name="description" className="mt-2 bg-gray-800 border-gray-700 text-white" required />
      </div>

      <div>
        <Label htmlFor="category" className="text-white">Category</Label>
        <Input id="category" name="category" className="mt-2 bg-gray-800 border-gray-700 text-white" required />
      </div>

      <div>
        <Label htmlFor="price" className="text-white">Price (ETH)</Label>
        <Input id="price" name="price" type="number" step="0.01" className="mt-2 bg-gray-800 border-gray-700 text-white" required />
      </div>

      <div>
        <Label className="text-white">Listing Type</Label>
        <RadioGroup defaultValue="marketplace" className="mt-2" onValueChange={setListingType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="marketplace" id="marketplace" />
            <Label htmlFor="marketplace" className="text-white">Sell in Marketplace</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bidding" id="bidding" />
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

