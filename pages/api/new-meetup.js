import { MongoClient } from 'mongodb';

//  /api/new-meetup   will trigger the function that we will define below

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://stepuntik:IPSsiacAzKwf7kaf@cluster0.zdhaxyh.mongodb.net/test'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
};

export default handler;
