'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export function ViewToggle() {
  const [view, setView] = useState('market')

  return (
    <div className="flex justify-center">
      <Tabs value={view} onValueChange={setView} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="bidding">Bidding</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}