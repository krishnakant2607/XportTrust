// Mock API Testing Script
// Run this in browser console or create as a separate test file

// Test Risk API
async function testRiskAPI() {
  const buyers = ['Maple Home', 'Casa Decor', 'Unknown Importer'];
  
  for (const buyer of buyers) {
    const response = await fetch(`/api/mock/risk?buyer=${encodeURIComponent(buyer)}`);
    const data = await response.json();
    console.log(`${buyer}:`, data);
  }
}

// Test Bank API
async function testBankAPI() {
  const response = await fetch('/api/mock/bank', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 50000,
      account_number: 'ACC123456',
      ifsc_code: 'SBIN0001234'
    })
  });
  const data = await response.json();
  console.log('Bank Payout:', data);
}

// Test Insurance API
async function testInsuranceAPI() {
  const response = await fetch('/api/mock/insurance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      invoice_amount: 50000,
      buyer_name: 'Maple Home'
    })
  });
  const data = await response.json();
  console.log('Insurance Cover:', data);
}

// Run all tests
async function runAllTests() {
  console.log('=== Testing Mock APIs ===');
  await testRiskAPI();
  await testBankAPI();
  await testInsuranceAPI();
  console.log('=== All Tests Complete ===');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testRiskAPI, testBankAPI, testInsuranceAPI, runAllTests };
}
