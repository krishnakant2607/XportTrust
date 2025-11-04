// Mock data for demo purposes

export const mockExporters = [
  { name: "Meera Metals", gst_number: "GST1234567890", email: "meera@demo.com", phone: "+91 9876543210" },
  { name: "Ali Handicrafts", gst_number: "GST5678901234", email: "ali@demo.com", phone: "+91 9876543211" },
  { name: "Sharma Exports", gst_number: "GST9012345678", email: "sharma@demo.com", phone: "+91 9876543212" },
];

export const mockBuyers = [
  { name: "Maple Home", score: 78, country: "USA", category: "Home Decor", verified: true },
  { name: "Casa Decor", score: 54, country: "Spain", category: "Handicrafts", verified: true },
  { name: "UrbanLeaf Imports", score: 39, country: "UK", category: "Artisan Goods", verified: false },
  { name: "Global Artisans LLC", score: 88, country: "Canada", category: "Home Decor", verified: true },
  { name: "European Crafts GmbH", score: 65, country: "Germany", category: "Brassware", verified: true },
  { name: "Tokyo Trading Co", score: 82, country: "Japan", category: "Home Decor", verified: true },
  { name: "Dubai Interiors", score: 71, country: "UAE", category: "Luxury Goods", verified: true },
  { name: "Australian Imports", score: 45, country: "Australia", category: "Handicrafts", verified: true },
  { name: "Nordic Designs", score: 90, country: "Sweden", category: "Modern Decor", verified: true },
  { name: "African Arts Ltd", score: 38, country: "South Africa", category: "Ethnic Crafts", verified: false },
];

export const mockGSTRefunds = [
  { month: "Oct 2024", amount: 54000, status: "processing", expectedDays: 5 },
  { month: "Sep 2024", amount: 48000, status: "completed", expectedDays: 0 },
  { month: "Aug 2024", amount: 62000, status: "completed", expectedDays: 0 },
];

export const mockCompliance = [
  { type: "LUT", status: "active", expiryDays: 45, urgent: false },
  { type: "IEC Code", status: "active", expiryDays: 180, urgent: false },
  { type: "Bank Certificate", status: "expiring", expiryDays: 15, urgent: true },
  { type: "RCMC", status: "active", expiryDays: 90, urgent: false },
];

export const getBuyerRiskScore = (buyerName: string): number => {
  const buyer = mockBuyers.find(
    b => b.name.toLowerCase() === buyerName.toLowerCase()
  );
  return buyer?.score || Math.floor(Math.random() * 40) + 20; // Random low score for unknown buyers
};

export const generateOffer = (amount: number, buyerRiskScore: number) => {
  const advancePct = buyerRiskScore > 70 ? 85 : buyerRiskScore > 50 ? 80 : 75;
  const feePct = 2;
  const insurancePct = 0.75;
  const escrowRequired = buyerRiskScore < 50;

  return {
    advance_pct: advancePct,
    fee_pct: feePct,
    insurance_pct: insurancePct,
    escrow_required: escrowRequired,
    advance_amount: (amount * advancePct) / 100,
    fee_amount: (amount * feePct) / 100,
    insurance_amount: (amount * insurancePct) / 100,
  };
};
