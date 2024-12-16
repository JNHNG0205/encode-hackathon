import { ListDatasetForm } from '@/components/List-dataset-form'
import { Navbar } from '@/components/Navbar'

export default function ListDatasetPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">List Your Dataset</h1>
        <ListDatasetForm />
      </main>
    </div>
  )
}

