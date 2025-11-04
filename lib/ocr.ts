import { createWorker } from 'tesseract.js';

export interface ParsedInvoiceData {
  invoiceNo?: string;
  buyerName?: string;
  amount?: number;
  date?: string;
}

export async function extractTextFromImage(imageFile: File): Promise<string> {
  try {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(imageFile);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    return '';
  }
}

export function parseInvoiceText(text: string): ParsedInvoiceData {
  const parsed: ParsedInvoiceData = {};

  // Simple regex patterns to extract common invoice fields
  // Invoice number patterns
  const invoiceNoMatch = text.match(/(?:invoice|inv|bill)\s*(?:no|#|number)?[:\s]*([A-Z0-9-]+)/i);
  if (invoiceNoMatch) {
    parsed.invoiceNo = invoiceNoMatch[1].trim();
  }

  // Amount patterns (looking for currency symbols or keywords)
  const amountMatch = text.match(/(?:total|amount|sum)[:\s]*(?:INR|USD|EUR|₹|\$|€)?\s*([\d,]+\.?\d*)/i);
  if (amountMatch) {
    const amountStr = amountMatch[1].replace(/,/g, '');
    parsed.amount = parseFloat(amountStr);
  }

  // Buyer name - this is harder to extract reliably, so we'll look for "To:" or "Bill To:"
  const buyerMatch = text.match(/(?:to|bill\s*to|sold\s*to)[:\s]*([A-Za-z\s&.,]+?)(?:\n|address|$)/i);
  if (buyerMatch) {
    parsed.buyerName = buyerMatch[1].trim().split('\n')[0].substring(0, 50);
  }

  // Date patterns
  const dateMatch = text.match(/(?:date|dated)[:\s]*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i);
  if (dateMatch) {
    parsed.date = dateMatch[1];
  }

  return parsed;
}
