"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, FileText, AlertCircle, CheckCircle2, Clock, Download, Upload } from "lucide-react";
import { mockGSTRefunds, mockCompliance } from "@/lib/mockData";

export default function CompliancePage() {
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
              <Link href="/compliance" className="text-blue-600 font-medium">
                Compliance
              </Link>
              <Link href="/marketplace" className="text-gray-600 hover:text-blue-600">
                Marketplace
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GST & Compliance Tracker</h1>
          <p className="text-gray-600">Monitor refunds, renewals, and compliance status</p>
        </div>

        {/* GST Refund Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>GST Refund Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockGSTRefunds.map((refund, index) => (
                <div key={refund.month} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-lg">₹{refund.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{refund.month}</div>
                    </div>
                    <Badge className={refund.status === "completed" ? "bg-green-600" : "bg-amber-600"}>
                      {refund.status === "completed" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Processing
                        </>
                      )}
                    </Badge>
                  </div>

                  {refund.status === "processing" && (
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-gray-600">Expected in {refund.expectedDays} days</span>
                        <span className="text-gray-600">60% Complete</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  )}

                  {refund.status === "completed" && (
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    Total Refunds (Last 3 Months)
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{mockGSTRefunds.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Compliance Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCompliance.map((item) => (
                <div
                  key={item.type}
                  className={`border rounded-lg p-4 ${
                    item.urgent ? 'border-amber-300 bg-amber-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {item.status === "active" && !item.urgent ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-amber-600" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{item.type}</div>
                        <div className="text-sm text-gray-600">
                          {item.urgent ? (
                            <span className="text-amber-600 font-medium">
                              ⚠ Expires in {item.expiryDays} days
                            </span>
                          ) : (
                            <span>Valid for {item.expiryDays} days</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {item.urgent && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Renew Now
                        </Button>
                      )}
                    </div>
                  </div>

                  {item.expiryDays <= 30 && (
                    <div className="mt-3">
                      <Progress 
                        value={(item.expiryDays / 90) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Summary */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {mockCompliance.filter(c => !c.urgent).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Active Documents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {mockCompliance.filter(c => c.urgent).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Expiring Soon</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mockGSTRefunds.filter(r => r.status === "processing").length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Pending Refunds</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
