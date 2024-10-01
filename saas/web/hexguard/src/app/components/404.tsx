import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Shield, Home, Search, HelpCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white flex flex-col">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">HexGuard</span>
        </Link>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl mb-8">Oops! This page seems to have vanished into the digital void.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-xl mb-4">Don&apos;t worry, even the best security systems have their blind spots.</p>
          <p className="text-lg">Let&apos;s get you back to safety.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-4 md:grid-cols-2 max-w-md w-full"
        >
          <Link href="/" passHref>
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button variant="outline" className="w-full">
              <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-lg mb-4">Or try one of these helpful links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/features" className="text-blue-400 hover:text-blue-300 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-blue-400 hover:text-blue-300 transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="text-blue-400 hover:text-blue-300 transition-colors">
              FAQ
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} HexGuard. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="text-sm text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}