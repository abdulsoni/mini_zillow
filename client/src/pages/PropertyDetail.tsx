import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyById } from '../services/property';
import { Property } from '../types/property';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPropertyById(id)
        .then((res) => setProperty(res.data))
        .catch((err) => console.error('Failed to fetch property:', err));
    }
  }, [id]);

  if (!property) return <div className="p-4 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Listings
      </button>

      <h2 className="text-3xl font-bold mb-4">{property.title}</h2>

      {property.images && property.images.length > 0 ? (
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-80 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded mb-4">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="space-y-2">
        <p><span className="font-semibold">Location:</span> {property.location}</p>
        <p><span className="font-semibold">Price:</span> ${property.price}</p>
        <p className="text-gray-700">{property.description}</p>
      </div>
    </div>
  );
}

