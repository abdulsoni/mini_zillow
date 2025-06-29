import { useEffect, useState } from 'react';
import { getAllProperties, deleteProperty } from '../services/property';
import { Link } from 'react-router-dom';

// Define the property type
interface Property {
  _id: string;
  title: string;
  price: number;
 images?: string; 
}

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchData = () => {
    getAllProperties()
      .then((res) => setProperties(res.data.properties))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this property?')) {
      try {
        await deleteProperty(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete property', error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Link
          to="/admin/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium shadow"
        >
          + Create Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-600">No properties found.</p>
      ) : (
        <div className="grid gap-4">
         {properties.map((p) => (
  <div
    key={p._id}
    className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition gap-4"
  >
   {p.images && p.images.length > 0 && (
    <img
        src={p.images[0]}
        alt={p.title}
        className="w-28 h-20 object-cover rounded-md border"
    />
    )}
    <div className="flex justify-between items-center w-full">
      <div>
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="text-gray-600">${p.price}</p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to={`/admin/edit/${p._id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(p._id)}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}
