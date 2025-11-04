import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { invoice_amount, buyer_name } = body;

  if (!invoice_amount || !buyer_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const policyId = `ECGC${Date.now().toString().slice(-6)}`;
  const coverPct = 95;

  return NextResponse.json({
    policy_id: policyId,
    cover_pct: coverPct,
    premium: invoice_amount * 0.0075, // 0.75%
    status: 'active',
    message: 'Insurance cover issued successfully',
    timestamp: new Date().toISOString(),
  });
}
