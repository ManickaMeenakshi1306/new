import { client } from '../config/mongodb.js';

const db = client.db('RentMachi');
const listings = db.collection('listings');

export async function getNearbyListings(lat, lng, radiusKm = 10) {
  const radiusInMeters = radiusKm * 1000;

  const pipeline = [
    {
      $geoNear: {
        near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
        distanceField: "distance",
        maxDistance: radiusInMeters,
        query: { available: true },
        spherical: true
      }
    },
    {
      $group: {
        _id: "$category",
        listings: { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        listings: 1
      }
    }
  ];

  const result = await listings.aggregate(pipeline).toArray();
  return result;
}
