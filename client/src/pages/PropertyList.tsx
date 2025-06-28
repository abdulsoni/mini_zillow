import { useEffect, useState } from 'react';
import { getAllProperties } from '../services/property';
import { Link } from 'react-router-dom';
import { Property } from '../types/property';

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    getAllProperties()
      .then((res) => setProperties(res.data))
      .catch((err) => console.error('Error fetching properties:', err));
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Explore Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
           {p.images && p.images.length > 0 && (
            <img
                src={p.images[0]}
                alt={p.title}
                className="h-48 w-full object-cover"
            />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                <button onClick={() => toggleBookmark(p._id)} className="text-xl text-yellow-500">
                  {bookmarks.includes(p._id) ? '★' : '☆'}
                </button>
              </div>
              <p className="text-gray-600 mt-1">{p.location}</p>
              <p className="text-lg font-semibold text-green-600 mt-2">${p.price}</p>
              <Link
                to={`/properties/${p._id}`}
                className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
