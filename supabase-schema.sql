-- XportTrust Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Exporters table
CREATE TABLE exporters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    gst_number TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exporter_id UUID REFERENCES exporters(id) ON DELETE CASCADE,
    invoice_no TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'pending',
    file_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Offers table
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    advance_pct NUMERIC NOT NULL,
    fee_pct NUMERIC NOT NULL,
    insurance_pct NUMERIC NOT NULL,
    escrow_required BOOLEAN DEFAULT false,
    buyer_risk_score INTEGER,
    status TEXT DEFAULT 'offered',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Fundings table
CREATE TABLE fundings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'processing',
    payout_txid TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_invoices_exporter ON invoices(exporter_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_offers_invoice ON offers(invoice_id);
CREATE INDEX idx_fundings_offer ON fundings(offer_id);

-- Enable Row Level Security (RLS)
ALTER TABLE exporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fundings ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow all for demo - adjust for production)
CREATE POLICY "Enable read access for all users" ON exporters FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON exporters FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON invoices FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON invoices FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON invoices FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON offers FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON offers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON offers FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON fundings FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON fundings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON fundings FOR UPDATE USING (true);

-- Sample seed data
INSERT INTO exporters (name, gst_number, email, phone) VALUES
('Meera Metals', 'GST1234567890', 'meera@demo.com', '+91 9876543210'),
('Ali Handicrafts', 'GST5678901234', 'ali@demo.com', '+91 9876543211'),
('Sharma Exports', 'GST9012345678', 'sharma@demo.com', '+91 9876543212');
