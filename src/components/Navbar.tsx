'use client'
import React, { useState } from 'react'
import { ConnectWallet } from '@/components/ui/ConnectWallet'
import Link from 'next/link'
import Image from 'next/image'
import { useActiveAccount, useActiveWallet } from 'thirdweb/react'

export function Navbar() {
  // const activeAccount = useActiveAccount();
  // console.log(activeAccount?.address)

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-gray-400 hover:text-white">
              <Image src="/logo.webp" alt="DATA.AUC Logo" width={100} height={100} />
            </Link>
            <nav className="hidden md:flex space-x-16">
              <Link href="/home" className="text-gray-300 hover:text-white">Home</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
              <Link href="/mint-NFT" className="text-gray-300 hover:text-white">Mint Dataset NFT</Link>
              <Link href="/list-dataset" className="text-gray-300 hover:text-white">List Dataset NFT</Link>
            </nav>
          <ConnectWallet />
        </div>  
      </div>
    </header>
  )
}