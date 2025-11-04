"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Lock } from "lucide-react";

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
  offer: any;
  onAccept: () => void;
}

export default function OfferModal({ open, onClose, invoice, offer, onAccept }: OfferModalProps) {
  if (!offer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Financing Offer</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Invoice Details</div>
            <div className="font-semibold text-lg">{invoice?.invoice_no}</div>
            <div className="text-sm text-gray-600">Buyer: {invoice?.buyer_name}</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">
              ₹{invoice?.amount?.toLocaleString()}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium text-sm">Buyer Risk Score</div>
              <div className="text-lg font-bold text-blue-600">{offer.buyer_risk_score}/100</div>
            </div>
          </div>

          {/* Offer Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Advance Amount ({offer.advance_pct}%)</span>
              <span className="font-bold text-lg">₹{offer.advance_amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Factoring Fee ({offer.fee_pct}%)</span>
              <span className="text-red-600">- ₹{offer.fee_amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Insurance ({offer.insurance_pct}%)</span>
              <span className="text-red-600">- ₹{offer.insurance_amount.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-semibold">Net Amount</span>
              <span className="font-bold text-xl text-green-600">
                ₹{(offer.advance_amount - offer.fee_amount - offer.insurance_amount).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Escrow Notice */}
          {offer.escrow_required && (
            <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-amber-900">Escrow Required</div>
                <div className="text-amber-700">
                  Due to buyer risk score, funds will be held in escrow until payment confirmation.
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Decline
            </Button>
            <Button onClick={onAccept} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Accept Offer
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By accepting, you agree to our factoring terms and conditions
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
