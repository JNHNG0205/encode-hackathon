'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export function ViewToggle({ onViewChange }: { onViewChange: (view: string) => void }) {
  const [view, setView] = useState('market')

  const handleViewChange = (newView: string) => {
    setView(newView)
    onViewChange(newView)
  }

  return (
    <div className="flex justify-center">
      <Tabs value={view} onValueChange={handleViewChange} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="market">Marketplace</TabsTrigger>
          <TabsTrigger value="bidding">Bidding</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

