import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { amount, account_number, ifsc_code } = body;

  if (!amount || !account_number) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const txid = `TX${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return NextResponse.json({
    status: 'success',
    txid,
    amount,
    message: 'Payout initiated successfully',
    timestamp: new Date().toISOString(),
  });
}
