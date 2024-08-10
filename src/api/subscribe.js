import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API_KEY }).base(process.env.GATSBY_AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = JSON.parse(req.body);

  try {
    // Check if email already exists
    const existingRecords = await base('Subscriptions').select({
      filterByFormula: `{Email} = '${email}'`
    }).firstPage();

    if (existingRecords.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // If email doesn't exist, create a new record
    const createdRecords = await base('Subscriptions').create([
      {
        fields: {
          Email: email
        }
      }
    ]);

    res.status(200).json({ 
      message: 'Subscription successful', 
      id: createdRecords[0].id 
    });
  } catch (error) {
    console.error('Airtable Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}