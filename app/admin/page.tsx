"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Users, TrendingUp, IndianRupee, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboardPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalExporters: 0,
    avgAdvancePct: 0,
    totalFunded: 0,
  });

  useEffect(() => {
    // Load data from localStorage
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      const invoicesData = JSON.parse(savedInvoices);
      setInvoices(invoicesData);

      // Calculate stats
      const uniqueExporters = new Set(invoicesData.map((inv: any) => inv.exporter_id));
      const fundedInvoices = invoicesData.filter((inv: any) => inv.status === 'funded');
      const avgAdvance = invoicesData.reduce((sum: number, inv: any) => sum + (inv.offer?.advance_pct || 0), 0) / (invoicesData.length || 1);
      const totalFunded = fundedInvoices.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);

      setStats({
        totalInvoices: invoicesData.length,
        totalExporters: uniqueExporters.size,
        avgAdvancePct: Math.round(avgAdvance),
        totalFunded,
      });
    }
  }, []);

  // Prepare chart data
  const statusData = [
    { name: 'Uploaded', value: invoices.filter(inv => inv.status === 'uploaded').length, fill: '#3b82f6' },
    { name: 'Offer Ready', value: invoices.filter(inv => inv.status === 'offer_generated').length, fill: '#10b981' },
    { name: 'Accepted', value: invoices.filter(inv => inv.status === 'offer_accepted').length, fill: '#f59e0b' },
    { name: 'Funded', value: invoices.filter(inv => inv.status === 'funded').length, fill: '#8b5cf6' },
  ];

  const riskData = invoices.map(inv => ({
    buyer: inv.buyer_name?.substring(0, 15) || 'Unknown',
    risk: inv.offer?.buyer_risk_score || 0,
    amount: inv.amount || 0,
  })).slice(0, 10);

  const insuranceData = [
    { name: 'Covered', value: invoices.filter(inv => inv.offer).length, fill: '#10b981' },
    { name: 'Pending', value: invoices.filter(inv => !inv.offer).length, fill: '#f59e0b' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">XportTrust Admin</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                Exporter View
              </Link>
              <Link href="/admin" className="text-blue-600 font-medium">
                Admin Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor platform activity and performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Total Invoices</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalInvoices}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Active Exporters</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalExporters}</div>
              <p className="text-xs text-gray-500 mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Avg Advance %</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.avgAdvancePct}%</div>
              <p className="text-xs text-gray-500 mt-1">Average offer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4" />
                  <span>Total Funded</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ₹{(stats.totalFunded / 100000).toFixed(1)}L
              </div>
              <p className="text-xs text-gray-500 mt-1">Disbursed amount</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Invoice Status Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insurance Coverage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Insurance Coverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insuranceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {insuranceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">Total Insured Value</div>
                <div className="text-2xl font-bold text-green-600">
                  ₹{(stats.totalFunded * 0.95 / 100000).toFixed(1)}L
                </div>
              </div>
            </CardContent>
          </Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Buyer Risk Scores</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="buyer" angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="risk" fill="#3b82f6" name="Risk Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No invoices yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Advance %</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 10).map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoice_no}</TableCell>
                      <TableCell>{invoice.buyer_name}</TableCell>
                      <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{invoice.offer?.buyer_risk_score || 'N/A'}</span>
                          {invoice.offer?.buyer_risk_score && (
                            <span className={`text-xs ${
                              invoice.offer.buyer_risk_score > 70 ? 'text-green-600' :
                              invoice.offer.buyer_risk_score > 50 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {invoice.offer.buyer_risk_score > 70 ? '●' : 
                               invoice.offer.buyer_risk_score > 50 ? '●' : '●'}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.offer?.advance_pct || 'N/A'}%</TableCell>
                      <TableCell>
                        {invoice.status === 'uploaded' && <Badge variant="secondary">Uploaded</Badge>}
                        {invoice.status === 'offer_generated' && <Badge className="bg-blue-600">Offer Ready</Badge>}
                        {invoice.status === 'offer_accepted' && <Badge className="bg-amber-600">Processing</Badge>}
                        {invoice.status === 'funded' && <Badge className="bg-green-600">Funded</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
