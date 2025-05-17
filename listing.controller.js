import { getNearbyListings } from '../services/listing.service.js';

export async function getNearbyListingsController(req, res) {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: 'lat and lng are required and must be valid numbers.' });
    }

    const data = await getNearbyListings(parseFloat(lat), parseFloat(lng), parseFloat(radius) || 10);
    res.status(200).json({ data });
  } catch (error) {
    console.error('[getNearbyListingsController]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
