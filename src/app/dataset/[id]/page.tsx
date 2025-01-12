'use client'

import { useParams } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { DatasetDetails } from '@/components/card-detail/Dataset-details'
import { PurchasePanel } from '@/components/card-detail/Purchase-panel'

export default function DatasetPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DatasetDetails id={id} />
          </div>
          <div>
            <PurchasePanel id={id} />
          </div>
        </div>
      </main>
    </div>
  )
}

