import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = (context) => {
//   const req = context.req;
//   const res = context.res;

//   // runs for every incoming request
//   // fetch data from API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // fetch data from an API

  const client = await MongoClient.connect(
    'mongodb+srv://stepuntik:IPSsiacAzKwf7kaf@cluster0.zdhaxyh.mongodb.net/test'
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    }, // will be sent to HomePage as an argument
    revalidate: 1, //page is re-pregenerated on the sever after deployment every 1 second
  };
};

export default HomePage;
