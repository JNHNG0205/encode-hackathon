// import Link from "next/link"
// import Image from "next/image"
// // import buttonUI from "../components/button"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-black text-green-500 relative overflow-hidden font-pixel">
//       {/* Matrix-like background */}
//       <div className="absolute inset-0 z-0">
//         {/* Base gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#001a13] via-[#002a20] to-[#001a13]"></div>
        
//         {/* Binary code rain effect */}
//         <div className="absolute inset-0 overflow-hidden opacity-20">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-[#00ff9d] text-xs font-mono whitespace-nowrap"
//               style={{
//                 left: `${i * 5}%`,
//                 top: '-20px',
//                 animation: `fall ${Math.random() * 5 + 10}s linear infinite`,
//                 animationDelay: `-${Math.random() * 10}s`
//               }}
//             >
//               {'10100110'.repeat(20)}
//             </div>
//           ))}
//         </div>

//         {/* Data nodes and connections */}
//         <div className="absolute inset-0">
//           <svg className="w-full h-full opacity-10">
//             <defs>
//               <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
//                 <circle cx="25" cy="25" r="1" fill="#00ff9d" className="animate-pulse"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* Data flow lines */}
//         <div className="absolute inset-0">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute h-px bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent"
//               style={{
//                 top: `${20 + i * 15}%`,
//                 left: '0',
//                 right: '0',
//                 opacity: 0.1,
//                 animation: `dataflow ${3 + i}s linear infinite`
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       {/* Navigation */}
// <nav className="relative z-10 flex items-center justify-between p-4">
//   <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-green-400">
//     data.fun
//   </Link>
//   <div className="flex items-center gap-4">
//     <Link href="/auctions" className="text-sm hover:text-green-400 transition-colors">
//       [Auctions]
//     </Link>
//     <Link href="/datasets" className="text-sm hover:text-green-400 transition-colors">
//       [Datasets]
//     </Link>
//     <Link href="/create" className="text-sm hover:text-green-400 transition-colors">
//       [Create]
//     </Link>
//   </div>
// </nav>
//       {/* Hero Section */}
//       <main className="relative z-10 container mx-auto px-4 pt-20 pb-40 text-center">
//         <div className="max-w-3xl mx-auto space-y-8">
//           <div className="flex items-center justify-center gap-8">
//             {/* Left Pepe */}
//             <div className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] relative">
//               <iframe
//                 src="https://tenor.com/embed/16717201"
//                 width="100%"
//                 height="100%"
//                 frameBorder="0"
//                 className="giphy-embed"
//                 allowFullScreen
//                 style={{ 
//                   pointerEvents: 'none',
//                   transform: 'scale(2)',
//                 }}
//               />
//             </div>
            
//             <h1 className="text-[120px] md:text-[150px] font-bold tracking-tight animate-rainbow leading-none"
//                 style={{
//                   WebkitTextStroke: '2px white',
//                   filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))',
//                 }}>
//               DATA.FUN
//             </h1>

//             {/* Right Pepe */}
//             <div className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] relative">
//               <iframe
//                 src="https://tenor.com/embed/16717201"
//                 width="100%"
//                 height="100%"
//                 frameBorder="0"
//                 className="giphy-embed"
//                 allowFullScreen
//                 style={{ 
//                   pointerEvents: 'none',
//                   transform: 'scale(2)',
//                 }}
//               />
//             </div>
//           </div>

//           <p className="text-2xl text-green-400">
//             Decentralized Data Marketplace
//           </p>
//             <button className="px-8 py-2 rounded-md bg-purple-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-purple-500">
//               Launch App
//             </button>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 text-center p-4 text-green-300 text-sm">
//         © 2024 data.fun • Decentralized Data Exchange
//       </footer>
//     </div>
//   )
// }

import { Hero } from '@/components/Hero'
import { CallToAction } from '@/components/Cta'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-950">
        <Hero />
        <CallToAction />
        <Footer />
      </div>
    </>
  )
}

