import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, category, message } = req.body;

  try {
    const response = await axios.post(
      'https://snappi-bank.atlassian.net/rest/api/2/issue',
      {
        fields: {
          project: {
            key: 'PSB'
          },
          summary: `New request from ${firstName} ${lastName}`,
          issuetype: {
            name: 'PS PSD2 Developer Banking Solution Incident'
          },
          description: `
            Email: ${email}
            Category: ${category}
            Message: ${message}
          `
        }
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `i.lignos@snappibank.com:${process.env.JIRA_API_TOKEN}`
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ message: 'Ticket created successfully', ticketId: response.data.id });
} catch (error) {
  console.error('Error creating Jira ticket:', error.response ? error.response.data : error.message);
  res.status(500).json({ message: 'Error creating ticket', error: error.response ? error.response.data : error.message });
}
}