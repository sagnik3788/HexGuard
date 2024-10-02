// "use client"

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Shield, Check, X } from "lucide-react"
// import Link from "next/link"

// const plans = [
//   {
//     name: 'Basic',
//     price: { monthly: 28, annually: 256 },
//     description: 'Essential protection for small businesses',
//     features: [
//       'Up to 100 file scans per month',
//       'Basic threat detection',
//       'Email support',
//       '24/7 system monitoring',
//     ],
//   },
//   {
//     name: 'Pro',
//     price: { monthly: 79, annually: 790 },
//     description: 'Advanced security for growing companies',
//     features: [
//       'Unlimited file scans',
//       'Advanced threat detection & prevention',
//       'Priority email & chat support',
//       'API access',
//       'Detailed analytics dashboard',
//     ],
//     popular: true,
//   },
//   {
//     name: 'Enterprise',
//     price: { monthly: 199, annually: 1990 },
//     description: 'Comprehensive solution for large organizations',
//     features: [
//       'Everything in Pro',
//       'Dedicated account manager',
//       'Custom integration support',
//       'On-premise deployment option',
//       'Advanced API with higher rate limits',
//       '24/7 phone support',
//     ],
//   },
// ]

// const comparisonFeatures = [
//   'File scans per month',
//   'Threat detection',
//   'Email support',
//   'System monitoring',
//   'Chat support',
//   'API access',
//   'Analytics dashboard',
//   'Dedicated account manager',
//   'Custom integration',
//   'On-premise deployment',
//   'Phone support',
// ]

// const testimonials = [
//   {
//     name: 'Sarah Thompson',
//     role: 'CTO, TechCorp',
//     content: 'HexGuard has been a game-changer for our security infrastructure. The advanced threat detection has saved us countless times.',
//   },
//   {
//     name: 'Michael Chen',
//     role: 'IT Director, GlobalHealth',
//     content: 'The ease of use and comprehensive protection offered by HexGuard is unmatched. It\'s an essential tool for any serious business.',
//   },
//   {
//     name: 'Emily Rodriguez',
//     role: 'Cybersecurity Analyst, SecureBank',
//     content: 'I\'ve worked with many security solutions, but HexGuard stands out with its intuitive interface and powerful features.',
//   },
// ]

// export default function PricingPage() {
//   const [isAnnual, setIsAnnual] = useState(false)

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white">
//       <header className="container mx-auto px-4 py-6 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Shield className="h-8 w-8 text-blue-500" />
//           <span className="text-2xl font-bold">HexGuard</span>
//         </div>
//         <nav className="hidden md:flex space-x-6">
//           <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
//             Features
//           </Button>
//           <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
//             About
//           </Button>
//           <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
//             Contact
//           </Button>
//         </nav>
//       </header>

//       <main className="container mx-auto px-4 py-12">
//         <motion.h1 
//           className="text-4xl md:text-5xl font-bold text-center mb-4"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Choose Your Protection Plan
//         </motion.h1>
//         <p className="text-xl text-center mb-8">Secure your digital assets with our flexible pricing options</p>

//         <div className="flex items-center justify-center mb-12">
//           <span className="mr-2">Monthly</span>
//           <Switch
//             checked={isAnnual}
//             onCheckedChange={setIsAnnual}
//             aria-label="Toggle annual billing"
//           />
//           <span className="ml-2">Annual <Badge variant="secondary">Save 20%</Badge></span>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           {plans.map((plan) => (
//             <motion.div
//               key={plan.name}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Card className={`relative ${plan.popular ? 'border-blue-500' : ''}`}>
//                 {plan.popular && (
//                   <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
//                     Most Popular
//                   </Badge>
//                 )}
//                 <CardHeader>
//                   <CardTitle>{plan.name}</CardTitle>
//                   <CardDescription>{plan.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-4xl font-bold mb-4">
//                     ${isAnnual ? plan.price.annually : plan.price.monthly}
//                     <span className="text-lg font-normal">/{isAnnual ? 'year' : 'month'}</span>
//                   </div>
//                   <ul className="space-y-2">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-center">
//                         <Check className="h-5 w-5 text-green-500 mr-2" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full">
//                     {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-800">
//                   <th className="p-4 text-left">Feature</th>
//                   {plans.map((plan) => (
//                     <th key={plan.name} className="p-4 text-center">{plan.name}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {comparisonFeatures.map((feature, index) => (
//                   <tr key={feature} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
//                     <td className="p-4">{feature}</td>
//                     {plans.map((plan) => (
//                       <td key={`${plan.name}-${feature}`} className="p-4 text-center">
//                         {plan.features.includes(feature) || feature === 'File scans per month' ? (
//                           feature === 'File scans per month' ? (
//                             plan.name === 'Basic' ? '100' : 'Unlimited'
//                           ) : (
//                             <Check className="h-5 w-5 text-green-500 mx-auto" />
//                           )
//                         ) : (
//                           <X className="h-5 w-5 text-red-500 mx-auto" />
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Card>
//                   <CardContent className="pt-6">
//                     <p className="mb-4">&ldquo;{testimonial.content}&rdquo;</p>
//                     <div className="font-semibold">{testimonial.name}</div>
//                     <div className="text-sm text-gray-400">{testimonial.role}</div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         <div className="text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Digital World?</h2>
//           <p className="mb-8">Start your free trial today. No credit card required.</p>
//           <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
//             Get Started Now
//           </Button>
//         </div>
//       </main>

//       <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-800">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <p>&copy; {new Date().getFullYear()} HexGuard. All rights reserved.</p>
//           </div>
//           <div className="flex space-x-4">
//             <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
//             <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
//             <Link href="/support" className="text-sm text-gray-400 hover:text-white">Support</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }


"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Check, X } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: 'Basic',
    price: { monthly: 28, annually: 256 },
    description: 'Essential protection for small businesses',
    features: [
      'Up to 100 file scans per month',
      'Basic threat detection',
      'Email support',
      '24/7 system monitoring',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 79, annually: 790 },
    description: 'Advanced security for growing companies',
    features: [
      'Unlimited file scans',
      'Advanced threat detection & prevention',
      'Priority email & chat support',
      'API access',
      'Detailed analytics dashboard',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, annually: 1990 },
    description: 'Comprehensive solution for large organizations',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integration support',
      'On-premise deployment option',
      'Advanced API with higher rate limits',
      '24/7 phone support',
    ],
  },
]

const comparisonFeatures = [
  'File scans per month',
  'Threat detection',
  'Email support',
  'System monitoring',
  'Chat support',
  'API access',
  'Analytics dashboard',
  'Dedicated account manager',
  'Custom integration',
  'On-premise deployment',
  'Phone support',
]

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'CTO, TechCorp',
    content: 'HexGuard has been a game-changer for our security infrastructure. The advanced threat detection has saved us countless times.',
  },
  {
    name: 'Michael Chen',
    role: 'IT Director, GlobalHealth',
    content: 'The ease of use and comprehensive protection offered by HexGuard is unmatched. It\'s an essential tool for any serious business.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Cybersecurity Analyst, SecureBank',
    content: 'I\'ve worked with many security solutions, but HexGuard stands out with its intuitive interface and powerful features.',
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">HexGuard</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
            Features
          </Button>
          <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
            About
          </Button>
          <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
            Contact
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Protection Plan
        </motion.h1>
        <p className="text-xl text-center mb-8">Secure your digital assets with our flexible pricing options</p>

        <div className="flex items-center justify-center mb-12">
          <span className="mr-2">Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle annual billing"
          />
          <span className="ml-2">Annual <Badge variant="secondary">Save 20%</Badge></span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`relative ${plan.popular ? 'border-blue-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">
                    ${isAnnual ? plan.price.annually : plan.price.monthly}
                    <span className="text-lg font-normal">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-4 text-left">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="p-4 text-center">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={feature} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    <td className="p-4">{feature}</td>
                    {plans.map((plan) => (
                      <td key={`${plan.name}-${feature}`} className="p-4 text-center">
                        {plan.features.includes(feature) || feature === 'File scans per month' ? (
                          feature === 'File scans per month' ? (
                            plan.name === 'Basic' ? '100' : 'Unlimited'
                          ) : (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          )
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <p className="mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Digital World?</h2>
          <p className="mb-8">Start your free trial today. No credit card required.</p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 transition-colors">
            Start Free Trial
          </Button>
        </div>
      </main>

      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} HexGuard. All rights reserved. | 
          <Link href="/privacy-policy" className="text-blue-400 hover:underline"> Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}

