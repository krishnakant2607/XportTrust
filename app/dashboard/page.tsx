"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Upload, FileText, TrendingUp, IndianRupee, LogOut, AlertCircle, CheckCircle2, Clock, ShoppingBag } from "lucide-react";
import UploadModal from "@/components/dashboard/UploadModal";
import OfferModal from "@/components/dashboard/OfferModal";
import PayoutModal from "@/components/dashboard/PayoutModal";
import { getBuyerRiskScore, generateOffer, mockGSTRefunds, mockCompliance } from "@/lib/mockData";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
      return;
    }
    setUser(JSON.parse(userData));

    // Load invoices from localStorage
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
  }, [router]);

  const handleUploadComplete = async (invoiceData: any) => {
    const newInvoice = {
      id: Date.now().toString(),
      ...invoiceData,
      status: 'uploaded',
      exporter_id: user?.id,
    };

    // Get buyer risk score
    const riskScore = getBuyerRiskScore(invoiceData.buyer_name);
    
    // Generate offer
    const offer = generateOffer(invoiceData.amount, riskScore);
    const fullOffer = {
      id: `OFF-${Date.now()}`,
      invoice_id: newInvoice.id,
      ...offer,
      buyer_risk_score: riskScore,
      status: 'pending',
    };

    newInvoice.offer = fullOffer;
    newInvoice.status = 'offer_generated';

    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));

    // Show offer modal
    setSelectedInvoice(newInvoice);
    setSelectedOffer(fullOffer);
    setOfferModalOpen(true);
  };

  const handleAcceptOffer = () => {
    // Update invoice status
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        return {
          ...inv,
          status: 'offer_accepted',
          offer: { ...inv.offer, status: 'accepted' }
        };
      }
      return inv;
    });
    
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    
    setOfferModalOpen(false);
    
    // Show payout modal
    setTimeout(() => {
      setPayoutModalOpen(true);
    }, 300);
  };

  const handlePayoutComplete = () => {
    // Update invoice status to funded
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        return {
          ...inv,
          status: 'funded',
        };
      }
      return inv;
    });
    
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    setPayoutModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const stats = {
    totalInvoices: invoices.length,
    offersAccepted: invoices.filter(inv => inv.status === 'offer_accepted' || inv.status === 'funded').length,
    fundsReceived: invoices
      .filter(inv => inv.status === 'funded')
      .reduce((sum, inv) => sum + ((inv.offer?.advance_amount || 0) - (inv.offer?.fee_amount || 0) - (inv.offer?.insurance_amount || 0)), 0),
  };

  if (!user) return null;

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
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <div className="flex space-x-2">
                <Link href="/marketplace">
                  <Button variant="outline" size="sm">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Marketplace
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GST Refund Tracker */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5 text-green-600" />
              <span>GST Refund Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockGSTRefunds.slice(0, 1).map((refund) => (
                <div key={refund.month}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-lg text-gray-900">
                        ₹{refund.amount.toLocaleString()} refund due
                      </div>
                      <div className="text-sm text-gray-600">
                        {refund.month} • Expected in {refund.expectedDays} days
                      </div>
                    </div>
                    <Badge className="bg-amber-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Processing
                    </Badge>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              ))}
              <div className="flex space-x-4 text-sm">
                {mockGSTRefunds.slice(1, 3).map((refund) => (
                  <div key={refund.month} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">
                      {refund.month}: ₹{refund.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        {mockCompliance.some(c => c.urgent) && (
          <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span>Compliance Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCompliance.filter(c => c.urgent).map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <div>
                        <div className="font-medium text-gray-900">{item.type} expiring soon</div>
                        <div className="text-sm text-gray-600">
                          {item.expiryDays} days remaining
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Renew Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Invoices Uploaded</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalInvoices}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Offers Accepted</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.offersAccepted}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4" />
                  <span>Funds Received</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ₹{stats.fundsReceived.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Upload New Invoice</h3>
                <p className="text-blue-100">Get funded in 24 hours</p>
              </div>
              <Button
                size="lg"
                onClick={() => setUploadModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No invoices uploaded yet</p>
                <Button onClick={() => setUploadModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  Upload Your First Invoice
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoice_no}</TableCell>
                      <TableCell>{invoice.buyer_name}</TableCell>
                      <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {invoice.status === 'uploaded' && <Badge variant="secondary">Uploaded</Badge>}
                        {invoice.status === 'offer_generated' && <Badge className="bg-blue-600">Offer Ready</Badge>}
                        {invoice.status === 'offer_accepted' && <Badge className="bg-amber-600">Processing</Badge>}
                        {invoice.status === 'funded' && <Badge className="bg-green-600">Funded</Badge>}
                      </TableCell>
                      <TableCell>
                        {invoice.status === 'offer_generated' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setSelectedOffer(invoice.offer);
                              setOfferModalOpen(true);
                            }}
                          >
                            View Offer
                          </Button>
                        )}
                        {invoice.status === 'funded' && (
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
      <OfferModal
        open={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        invoice={selectedInvoice}
        offer={selectedOffer}
        onAccept={handleAcceptOffer}
      />
      <PayoutModal
        open={payoutModalOpen}
        onClose={handlePayoutComplete}
        offer={selectedOffer}
      />
    </div>
  );
}
