import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Exporter {
  id: string;
  name: string;
  gst_number: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  exporter_id: string;
  invoice_no: string;
  buyer_name: string;
  amount: number;
  currency: string;
  status: string;
  file_url?: string;
  created_at: string;
}

export interface Offer {
  id: string;
  invoice_id: string;
  advance_pct: number;
  fee_pct: number;
  insurance_pct: number;
  escrow_required: boolean;
  status: string;
  created_at: string;
}

export interface Funding {
  id: string;
  offer_id: string;
  status: string;
  payout_txid?: string;
  updated_at: string;
}
