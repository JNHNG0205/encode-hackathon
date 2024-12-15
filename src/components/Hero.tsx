import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center space-y-8">
          <Image
            src="/dataauc.jpg"
            alt="DATA.AUC Logo"
            width={180}
            height={180}
            className="mx-auto"
          />
          <h1 className="text-4xl sm:text-6xl font-bold text-white max-w-3xl mx-auto tracking-tight">
            Smart Bidding Platform for Data-Driven Decisions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Optimize your bidding strategy with advanced analytics and real-time market insights.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/home">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <a>Start Bidding</a>
                </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-cyan-500 border-cyan-500 hover:bg-cyan-950">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}