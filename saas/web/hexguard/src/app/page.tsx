import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
        <div className="container mx-auto flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            HexGuard: Debugging Protection at the Core Level
          </h1>
          <p className="max-w-3xl text-lg text-gray-400">
            Harness the power of low-level debugging tools, analysis, and protective measures 
            for all your software. Dive into Hexadecimal code and secure your applications like never before.
          </p>
          <Button size="lg" className="mt-6 bg-blue-600 hover:bg-blue-500">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Real-time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Monitor your software hex code and binary activity in real time for early warning signs of
                bugs or vulnerabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Low-level Debugging</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Dive deep into the core with HexGuard’s advanced debugging capabilities, providing you with a
                comprehensive view of your app’s underpinnings.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Proactive Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Apply state-of-the-art algorithms to detect anomalies in your code and prevent breaches before they happen.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Software?</h2>
          <p className="mb-8 text-lg">
            Join the community of developers securing their applications with HexGuard.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-200">
            Join Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
