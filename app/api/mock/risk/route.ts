import { NextRequest, NextResponse } from 'next/server';
import { getBuyerRiskScore } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const buyer = searchParams.get('buyer');

  if (!buyer) {
    return NextResponse.json({ error: 'Buyer name is required' }, { status: 400 });
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const score = getBuyerRiskScore(buyer);

  return NextResponse.json({
    buyer,
    score,
    rating: score > 70 ? 'Low Risk' : score > 50 ? 'Medium Risk' : 'High Risk',
    timestamp: new Date().toISOString(),
  });
}
