import { Button } from "@/components/ui/button"
import { Shield, Zap, Search, FileText, ChevronRight, Upload, BarChart, Users, FileQuestion, Lock, ShieldAlert, } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold">HexGuard</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link className="hover:text-cyan-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="hover:text-cyan-400 transition-colors" href="#about">
            About Us
          </Link>
          <Link className="hover:text-cyan-400 transition-colors" href="#contact">
            Contact
          </Link>
          <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black">
            Get Started
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500">
          HexGuard: Secure AF
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-400">Advanced malware analysis for the Security rResearchers</p>
          <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-green-600 hover:from-cyan-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section id="features" className="bg-gray-800 bg-opacity-70 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-cyan-400" />}
                title="Real-time Analysis"
                description="Get instant insights into potential threats with real-time analysis."
              />
              <FeatureCard
                icon={<Search className="h-12 w-12 text-cyan-400" />}
                title="Threat Detection"
                description="Detect even the most sophisticated security threats."
              />
              {/* <FeatureCard
                icon={<Shield className="h-12 w-12 text-cyan-400" />}
                title="User-friendly Interface"
                description="Simplified and intuitive for all users."
              /> */}
              <FeatureCard
                icon={<FileText className="h-12 w-12 text-cyan-400" />}
                title="Comprehensive Reporting"
                description="Detailed reports provide insights to strengthen security."
              />
              <FeatureCard
                icon={<ShieldAlert className="h-12 w-12 text-cyan-400" />}
                title="Enhanced Security"
                description="Multi-layered security protocols to protect data."
              />
              {/* <FeatureCard
                icon={<ShieldAlert className="h-12 w-12 text-cyan-400" />}
                title="Alert Notifications"
                description="Receive real-time alerts for suspicious activities."
              /> */}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Explore HexGuard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* <ExploreCard
              icon={<Upload className="h-8 w-8 text-cyan-400" />}
              title="File Upload"
              description="Securely upload files for analysis."
              href="/ErrorPage"
            /> */}
            <ExploreCard
              icon={<Upload className="h-8 w-8 text-cyan-400" />}
                title="File Upload"
                 description="Securely upload files for analysis."
                href="/404"  // Change this line
              />

            <ExploreCard
              icon={<BarChart className="h-8 w-8 text-cyan-400" />}
              title="Analysis Dashboard"
              description="View threat analysis results."
              href="/analysis"
            />
            <ExploreCard
              icon={<Users className="h-8 w-8 text-cyan-400" />}
              title="User Dashboard"
              description="Manage account and security."
              href="/dashboard"
            />
            <ExploreCard
              icon={<FileQuestion className="h-8 w-8 text-cyan-400" />}
              title="About Us"
              description="Learn more about HexGuard."
              href="/about"
            />
            <ExploreCard
              icon={<FileText className="h-8 w-8 text-cyan-400" />}
              title="Terms & Privacy"
              description="Review terms and privacy policy."
              href="/terms-privacy"
            />
            <ExploreCard
              icon={<Lock className="h-8 w-8 text-cyan-400" />}
              title="Pricing Plans"
              description="Choose the right package."
              href="/pricing"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Protecting Your Data Today</h2>
          <p className="text-xl mb-12 text-gray-400">Join thousands protecting their digital assets.</p>
          <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-green-600 hover:from-cyan-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 bg-opacity-70 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/documentation">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/support">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400 hover:text-cyan-400 transition-colors" href="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-12 text-gray-400">© 2024 HexGuard. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-800 transition-colors">
      {icon}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  )
}

interface ExploreCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function ExploreCard({ icon, title, description, href }: ExploreCardProps) {
  return (
    <Link href={href} className="group flex flex-col items-center p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-center">
      {icon}
      <h3 className="text-xl font-semibold mt-4 group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </Link>
  )
}
