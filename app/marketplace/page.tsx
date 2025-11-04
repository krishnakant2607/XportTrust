"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Search, Globe, Star, Building2 } from "lucide-react";
import { mockBuyers } from "@/lib/mockData";
import { useState } from "react";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Home Decor", "Handicrafts", "Brassware", "Luxury Goods", "Artisan Goods"];

  const filteredBuyers = mockBuyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buyer.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || buyer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getRiskBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-600">Low Risk</Badge>;
    if (score >= 40) return <Badge className="bg-amber-600">Medium Risk</Badge>;
    return <Badge className="bg-red-600">High Risk</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">XportTrust</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/marketplace" className="text-blue-600 font-medium">
                Marketplace
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verified Buyer Marketplace</h1>
          <p className="text-gray-600">Connect with trusted international buyers for your exports</p>
        </div>

        {/* Search & Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search buyers by name or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? "bg-blue-600" : ""}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Verified Buyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {mockBuyers.filter(b => b.verified).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Across 10+ countries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Low Risk Buyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {mockBuyers.filter(b => b.score >= 70).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Score 70+</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {categories.length - 1}
              </div>
              <p className="text-xs text-gray-500 mt-1">Product categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Buyer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map((buyer) => (
            <Card key={buyer.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{buyer.name}</CardTitle>
                      <div className="flex items-center space-x-1 mt-1">
                        <Globe className="h-3 w-3 text-gray-500" />
                        <span className="text-sm text-gray-600">{buyer.country}</span>
                      </div>
                    </div>
                  </div>
                  {buyer.verified && (
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Category</div>
                  <Badge variant="outline">{buyer.category}</Badge>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Trust Score</div>
                  <div className="flex items-center justify-between">
                    <div className={`text-2xl font-bold ${getRiskColor(buyer.score)}`}>
                      {buyer.score}/100
                    </div>
                    {getRiskBadge(buyer.score)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        buyer.score >= 70 ? 'bg-green-600' : 
                        buyer.score >= 40 ? 'bg-amber-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${buyer.score}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  {buyer.score >= 70 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>No escrow required</span>
                    </div>
                  )}
                  {buyer.score < 40 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">⚠</span>
                      <span>Escrow mandatory</span>
                    </div>
                  )}
                  {buyer.verified && (
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">✓</span>
                      <span>Verified by XportTrust</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                    Request Introduction
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBuyers.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No buyers found matching your search</p>
          </div>
        )}
      </main>
    </div>
  );
}
