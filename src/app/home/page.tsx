'use client'

import { useState } from 'react'
import { DatasetGrid } from '@/components/Dataset-grid'
import { Navbar} from '@/components/Navbar'
import { ViewToggle } from '@/components/View-toggle'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'

// export default function HomePage() {
//   const [currentView, setCurrentView] = useState('market')
//   const [searchQuery, setSearchQuery] = useState('')

//   const handleViewChange = (view: string) => {
//     setCurrentView(view)
//   }

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//   }

//   return (
//     <div className="min-h-screen bg-gray-950">
//       <Navbar onSearch={handleSearch}/>
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <ViewToggle onViewChange={handleViewChange} />
//         </div>
//         <DatasetGrid view={currentView}  searchQuery={searchQuery}/>
//       </main>
//     </div>
//   )
// }
export default function HomePage() {
  const [currentView, setCurrentView] = useState('market')
  const [searchQuery, setSearchQuery] = useState('')

  const handleViewChange = (view: string) => {
    setCurrentView(view)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search is now instantly applied as the user types,
    // so we don't need to do anything special here
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <ViewToggle onViewChange={handleViewChange} />
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Search datasets..."
              className="w-full bg-gray-800 border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        <DatasetGrid view={currentView} searchQuery={searchQuery} />
      </main>
    </div>
  )
}
