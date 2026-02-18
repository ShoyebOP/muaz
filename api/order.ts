import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, address, email, bookName, totalAmount } = request.body;

  if (!name || !phone || !address) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram configuration missing');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  const message = `
📚 *New Order Received!*
-----------------------
*Book:* ${bookName}
*Customer:* ${name}
*Phone:* ${phone}
*Address:* ${address}
*Email:* ${email || 'Not provided'}
*Total Amount:* ${totalAmount} TK
-----------------------
  `;

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (telegramResponse.ok) {
      return response.status(200).json({ success: true });
    } else {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return response.status(502).json({ error: 'Failed to send message to Telegram' });
    }
  } catch (error) {
    console.error('Error in serverless function:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
