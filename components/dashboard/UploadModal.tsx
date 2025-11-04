"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, FileText, Loader2 } from "lucide-react";
import { extractTextFromImage, parseInvoiceText } from "@/lib/ocr";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploadComplete: (data: any) => void;
}

export default function UploadModal({ open, onClose, onUploadComplete }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [manualData, setManualData] = useState({
    invoice_no: "",
    buyer_name: "",
    amount: "",
    currency: "INR",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      // Attempt OCR extraction
      const text = await extractTextFromImage(selectedFile);
      const parsed = parseInvoiceText(text);
      setParsedData(parsed);

      // Pre-fill manual fields with parsed data
      setManualData({
        invoice_no: parsed.invoiceNo || "",
        buyer_name: parsed.buyerName || "",
        amount: parsed.amount?.toString() || "",
        currency: "INR",
      });
    } catch (error) {
      console.error("OCR failed:", error);
    }

    setIsProcessing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoiceData = {
      invoice_no: manualData.invoice_no,
      buyer_name: manualData.buyer_name,
      amount: parseFloat(manualData.amount),
      currency: manualData.currency,
      file: file,
      created_at: new Date().toISOString(),
    };

    onUploadComplete(invoiceData);
    
    // Reset form
    setFile(null);
    setParsedData(null);
    setManualData({ invoice_no: "", buyer_name: "", amount: "", currency: "INR" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition"
            >
              {file ? (
                <div className="flex items-center justify-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Click to upload invoice</p>
                  <p className="text-sm text-gray-500 mt-1">PDF, PNG, or JPG (max 10MB)</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Extracting invoice data...</span>
            </div>
          )}

          {/* Manual Entry Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="invoice_no">Invoice Number</Label>
              <Input
                id="invoice_no"
                placeholder="INV-2024-001"
                value={manualData.invoice_no}
                onChange={(e) => setManualData({ ...manualData, invoice_no: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="buyer_name">Buyer Name</Label>
              <Input
                id="buyer_name"
                placeholder="Maple Home"
                value={manualData.buyer_name}
                onChange={(e) => setManualData({ ...manualData, buyer_name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50000"
                  value={manualData.amount}
                  onChange={(e) => setManualData({ ...manualData, amount: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={manualData.currency}
                  onChange={(e) => setManualData({ ...manualData, currency: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Upload & Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
