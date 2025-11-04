'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Globe, TrendingUp, Users, FileText, Bell, ArrowRight, CheckCircle, Lock, Clock, Award, ChevronRight, Star, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-9 w-9 text-blue-600" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  XportTrust
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-normal">Trusted by 200+ exporters</Badge>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition font-medium">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Success Stories
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition font-medium">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Trusted by India's Leading Exporters</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight pb-12 mb-4">
                Export Finance,
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pb-2">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Get up to <span className="font-bold text-blue-600">85% advance</span> on your export invoices in just <span className="font-bold text-blue-600">24 hours</span>. 
                No collateral. No paperwork hassles. Just growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 h-14 shadow-xl shadow-blue-600/30 group">
                    Start Your Application
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 h-14 border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-all group shadow-lg"
                  >
                    View Live Demo
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">ECGC Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">24hr Payout</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Live Platform Stats</h3>
                  <Badge className="bg-green-500">
                    <span className="animate-pulse mr-1">●</span> Live
                  </Badge>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Financed</p>
                      <p className="text-3xl font-bold text-gray-900">₹52.4 Cr</p>
                      <p className="text-xs text-green-600 mt-1">↑ 23% this month</p>
                    </div>
                    <BarChart3 className="h-12 w-12 text-blue-600 opacity-50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Active Exporters</p>
                      <p className="text-2xl font-bold text-gray-900">247</p>
                      <div className="flex gap-1 mt-2">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Avg. Payout Time</p>
                      <p className="text-2xl font-bold text-gray-900">18hrs</p>
                      <p className="text-xs text-green-600 mt-2">6hrs faster</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium text-gray-900">Success Rate</p>
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold text-gray-900">98.5%</p>
                      <p className="text-sm text-gray-600 mb-1">approval rate</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full p-4 shadow-xl animate-bounce">
                <p className="text-xs font-bold">NEW</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to scale exports
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for Indian SME exporters with tools that actually work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload invoice, get offer in <span className="font-semibold text-blue-600">5 minutes</span>. 
                  Funds in your account within 24 hours. No delays.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">100% Secure</h3>
                <p className="text-gray-600 leading-relaxed">
                  ECGC insurance + escrow protection. Bank-grade encryption. Your money is always safe.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Global Buyers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time risk assessment on <span className="font-semibold text-purple-600">50,000+</span> international buyers across 100+ countries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Transparent Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Just <span className="font-semibold text-orange-600">2% factoring fee + 0.75% insurance</span>. 
                  No hidden charges. No surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Local Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dedicated agents in Moradabad, Delhi, Mumbai. We speak your language and understand your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">GST Refund Tracker</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your GST refunds in real-time. Get alerts for LUT expiry and compliance deadlines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              From Invoice to Cash in 4 Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No paperwork. No waiting. Just fast, reliable financing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines - Hidden on mobile */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
            
            {/* Step 1 */}
            <div className="relative flex">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 flex flex-col w-full h-full min-h-[280px]">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 shadow-lg flex-shrink-0">
                  <span className="text-3xl font-bold text-white">01</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 flex-shrink-0">Sign Up</h3>
                <p className="text-gray-600 text-center leading-relaxed flex-grow">Create account with GST & bank details in 2 minutes</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 flex flex-col w-full h-full min-h-[280px]">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 shadow-lg flex-shrink-0">
                  <span className="text-3xl font-bold text-white">02</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 flex-shrink-0">Upload Invoice</h3>
                <p className="text-gray-600 text-center leading-relaxed flex-grow">Drag & drop your export invoice PDF. Our AI extracts details</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 flex flex-col w-full h-full min-h-[280px]">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 shadow-lg flex-shrink-0">
                  <span className="text-3xl font-bold text-white">03</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 flex-shrink-0">Get Instant Offer</h3>
                <p className="text-gray-600 text-center leading-relaxed flex-grow">Receive financing offer based on real-time buyer risk assessment</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 flex flex-col w-full h-full min-h-[280px]">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto relative z-10 shadow-lg flex-shrink-0">
                  <span className="text-3xl font-bold text-white">04</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 flex-shrink-0">Receive Funds</h3>
                <p className="text-gray-600 text-center leading-relaxed flex-grow">Accept offer and get money in your account within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-10 h-14 shadow-lg">
                Start Now - It's Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by exporters like you
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh Kumar", company: "Kumar Brass Exports", city: "Moradabad", quote: "XportTrust gave us ₹15 lakh in 18 hours. Now we can fulfill orders 3x faster!", rating: 5 },
              { name: "Priya Sharma", company: "Artisan Handicrafts", city: "Jaipur", quote: "The GST refund tracker alone saved us ₹2 lakhs in penalties. Amazing platform!", rating: 5 },
              { name: "Mohammed Ali", company: "Global Textiles", city: "Surat", quote: "No more begging banks. Professional service, fair rates, instant approval.", rating: 5 }
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-2 hover:shadow-2xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.company}, {testimonial.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to 10x your export business?
          </h2>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            Join 247+ exporters who've unlocked ₹52.4 Cr in working capital. 
            <span className="block mt-2 font-semibold">First 3 transactions: ZERO platform fees! 🎉</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-10 h-14 bg-white text-blue-700 hover:bg-gray-100 shadow-xl group font-semibold">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="text-lg px-10 h-14 border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-700 transition-all shadow-lg font-semibold"
              >
                Try Live Demo
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="text-white font-bold text-2xl">XportTrust</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
                Empowering India's small exporters with instant, trust-based financing. 
                Making global trade accessible for everyone.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#features" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Features
                </Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> How It Works
                </Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Dashboard
                </Link></li>
                <li><Link href="/marketplace" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Marketplace
                </Link></li>
                <li><Link href="/compliance" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Compliance
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#about" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> About Us
                </Link></li>
                <li><Link href="#contact" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Contact
                </Link></li>
                <li><Link href="#careers" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Careers
                </Link></li>
                <li><Link href="#blog" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Blog
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#privacy" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Privacy Policy
                </Link></li>
                <li><Link href="#terms" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Terms of Service
                </Link></li>
                <li><Link href="#security" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" /> Security
                </Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2024 XportTrust. All rights reserved. 
              <span className="text-xs ml-2 text-gray-600">Prototype for demonstration purposes.</span>
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                <span className="animate-pulse mr-1">●</span> All systems operational
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
