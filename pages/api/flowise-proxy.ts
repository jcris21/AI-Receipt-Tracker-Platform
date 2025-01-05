import type { NextApiRequest, NextApiResponse } from 'next';

const FLOWISE_WEBHOOK_URL = 'https://7c23-8-243-126-25.ngrok-free.app/webhook-test/43b2a7db-f392-4172-bed4-19515ef2bc33';

// pages/api/flowise-proxy.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_FLOWISE_API_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    if (!response.ok) {
      throw new Error(`Flowise responded with status: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding to Flowise:', error);
    return res.status(500).json({ 
      message: 'Error processing request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}