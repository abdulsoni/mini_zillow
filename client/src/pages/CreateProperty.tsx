import { useState, ChangeEvent, FormEvent } from 'react';
import { createProperty } from '../services/property';
import { useNavigate, Link } from 'react-router-dom';

type FormState = {
  title: string;
  location: string;
  price: string;
  description: string;
  image: File | null;
};

export default function CreateProperty() {
  const [form, setForm] = useState<FormState>({
    title: '',
    location: '',
    price: '',
    description: '',
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      await createProperty(formData);
      alert('Property created successfully!');
      navigate('/admin');
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Something went wrong';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Create Property</h2>
        <Link
          to="/admin"
          className="text-sm text-blue-600 hover:underline border border-blue-500 px-3 py-1 rounded-md"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border border-gray-300"
          />
        )}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Property'
          )}
        </button>
      </form>
    </div>
  );
}
