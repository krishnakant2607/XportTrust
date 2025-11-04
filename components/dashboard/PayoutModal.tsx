"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

interface PayoutModalProps {
  open: boolean;
  onClose: () => void;
  offer: any;
}

export default function PayoutModal({ open, onClose, offer }: PayoutModalProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"processing" | "verifying" | "funded">("processing");
  const [txid, setTxid] = useState("");

  useEffect(() => {
    if (!open) {
      setProgress(0);
      setStatus("processing");
      return;
    }

    // Simulate funding progress
    const timer1 = setTimeout(() => {
      setProgress(33);
      setStatus("processing");
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(66);
      setStatus("verifying");
    }, 2000);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatus("funded");
      setTxid(`TX${Date.now()}${Math.floor(Math.random() * 1000)}`);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [open]);

  const statusLabels = {
    processing: "Processing your request...",
    verifying: "Verifying buyer details...",
    funded: "Funds transferred successfully!",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payout Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {status === "funded" ? (
            <div className="text-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                ₹{((offer?.advance_amount || 0) - (offer?.fee_amount || 0) - (offer?.insurance_amount || 0)).toLocaleString()} 
                {" "}has been credited to your account
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Transaction ID</div>
                <div className="font-mono font-semibold">{txid}</div>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="flex justify-center mb-6">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              </div>
              <div className="text-center mb-4">
                <p className="font-medium text-gray-900">{statusLabels[status]}</p>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {status === "funded" && (
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                Download Receipt
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
