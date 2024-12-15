import { DatasetGrid } from '@/components/Dataset-grid'
import { Header } from '@/components/Header'
import { ViewToggle } from '@/components/View-toggle'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ViewToggle />
        </div>
        <DatasetGrid />
      </main>
    </div>
  )
}