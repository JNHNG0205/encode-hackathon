import { Button } from '@/components/ui/Button'

export function CallToAction() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Bidding Strategy?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Join DATA.AUC today and start making smarter, data-driven decisions for your business.
        </p>
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
          Get Started Now
        </Button>
      </div>
    </div>
  )
}