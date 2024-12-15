'use client'
import { ConnectWallet } from '@/components/ui/ConnectWallet'
import { Input } from '@/components/ui/Input'
import { X } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </Link>
            <div className="w-64">
              <Input
                type="search"
                placeholder="Search datasets..."
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}