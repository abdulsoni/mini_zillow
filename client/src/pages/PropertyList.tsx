import { useEffect, useState } from 'react';
import { getAllProperties, toggleBookmark, rateProperty } from '../services/property';
import { Link, useNavigate } from 'react-router-dom';
import { Property, PropertyListResponse } from '../types/property';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState('');
  const [loadingRating, setLoadingRating] = useState('');
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [userId, setUserId] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const userId = localStorage.getItem('userId') || '';
    setUserId(userId);

    if (!token) {
      navigate('/login');
      return;
    }

    getAllProperties()
    .then((res: { data: PropertyListResponse }) => {
      setProperties(res.data.properties);
      setBookmarks(res.data.userBookmarks || []);
    })
    .catch((err) => {
      toast.error('Failed to fetch properties');
      console.error(err);
    })
    .then(() => {
      setLoadingProperties(false); // executed in both success and error
    });

  }, [navigate]);

  const handleBookmark = async (id: string) => {
    if (!isAuthenticated) return;

    try {
      setLoadingBookmark(id);
      const res = await toggleBookmark(id);
      setBookmarks(res.data.bookmarks);
      toast.success('Bookmark updated!');
    } catch (err) {
      toast.error('Failed to toggle bookmark');
    } finally {
      setLoadingBookmark('');
    }
  };

  const handleRate = async (id: string, value: number) => {
    if (!isAuthenticated) return;

    try {
      setLoadingRating(id + value);
      const res = await rateProperty(id, value);

      const updated = res.data.property;

      setProperties((prev) =>
        prev.map((p) =>
          p._id === id
            ? {
                ...p,
                averageRating: updated.averageRating,
                totalRatings: updated.totalRatings,
              }
            : p
        )
      );
      toast.success('Thanks for rating!');
    } catch (err) {
      toast.error('Failed to submit rating');
    } finally {
      setLoadingRating('');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center">Explore Properties</h2>

      {loadingProperties ? (
        <div className="text-center text-lg text-gray-600">Loading properties...</div>
      ) : properties.length === 0 ? (
        <div className="text-center text-lg text-gray-600 italic">No property has been added.</div>
      ) : (
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
                  <button
                    onClick={() => handleBookmark(p._id)}
                    className={`text-xl ${
                      bookmarks.includes(p._id) ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                    disabled={loadingBookmark === p._id}
                    title={!isAuthenticated ? 'Login required' : 'Toggle bookmark'}
                  >
                    {loadingBookmark === p._id ? '⏳' : bookmarks.includes(p._id) ? '★' : '☆'}
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{p.location}</p>
                <p className="text-lg font-semibold text-green-600 mt-2">${p.price}</p>

                {isAuthenticated && (
                  <>
                    <Link
                      to={`/properties/${p._id}`}
                      className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      View Details
                    </Link>

                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Rate:</span>
                        {[1, 2, 3, 4, 5].map((val) => {
                          const userRating =
                            p.ratings?.find((r) => r.user === userId)?.value || 0;

                          const isLoading = loadingRating === p._id + val;
                          const isRated = val <= userRating;

                          return (
                            <button
                              key={val}
                              className={`text-lg transition ${
                                isLoading
                                  ? 'text-gray-400'
                                  : isRated
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                              onClick={() => handleRate(p._id, val)}
                              disabled={isLoading}
                              title={`Rate ${val} star${val > 1 ? 's' : ''}`}
                            >
                              {isLoading ? '⏳' : '★'}
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-sm mt-1 text-gray-700">
                        {p.totalRatings && p.averageRating ? (
                          <span>
                            Average: <strong>{p.averageRating.toFixed(1)}</strong> ({p.totalRatings}{' '}
                            vote{p.totalRatings > 1 ? 's' : ''})
                          </span>
                        ) : (
                          <span className="italic text-gray-500">No rating given</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
