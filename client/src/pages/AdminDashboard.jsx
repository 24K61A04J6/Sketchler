import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getArtworks, createArtwork, updateArtwork, deleteArtwork, getContacts } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('artworks');
  const [artworks, setArtworks] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    price: '',
    yearCreated: new Date().getFullYear()
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const [artworksData, contactsData] = await Promise.all([
        getArtworks(),
        getContacts(token)
      ]);
      setArtworks(artworksData);
      setContacts(contactsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingId) {
        await updateArtwork(editingId, formData, token);
      } else {
        await createArtwork(formData, token);
      }
      loadData();
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        price: '',
        yearCreated: new Date().getFullYear()
      });
      setEditingId(null);
    } catch (err) {
      console.error('Error saving artwork:', err);
      alert('Error saving artwork');
    }
  };

  const handleEdit = (artwork) => {
    setFormData(artwork);
    setEditingId(artwork._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await deleteArtwork(id, token);
        loadData();
      } catch (err) {
        console.error('Error deleting artwork:', err);
        alert('Error deleting artwork');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setTab('artworks')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                tab === 'artworks' ? 'btn-primary' : 'btn-outline'
              }`}
            >
              Manage Artworks
            </button>
            <button
              onClick={() => setTab('contacts')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                tab === 'contacts' ? 'btn-primary' : 'btn-outline'
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>

          {/* Artworks Tab */}
          {tab === 'artworks' && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add New'} Artwork</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input-field"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Image URL</label>
                    <input
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Category</label>
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Price (optional)</label>
                    <input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Year Created</label>
                    <input
                      name="yearCreated"
                      type="number"
                      value={formData.yearCreated}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="btn btn-primary flex-1">Save Artwork</button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({
                            title: '',
                            description: '',
                            imageUrl: '',
                            category: '',
                            price: '',
                            yearCreated: new Date().getFullYear()
                          });
                        }}
                        className="btn btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Artworks List */}
              <div>
                <h2 className="text-2xl font-bold mb-6">All Artworks</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {artworks.map((artwork) => (
                      <div key={artwork._id} className="card p-4">
                        <h3 className="font-bold">{artwork.title}</h3>
                        <p className="text-gray-600 text-sm">{artwork.category}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEdit(artwork)}
                            className="btn btn-outline text-xs flex-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(artwork._id)}
                            className="btn bg-red-600 text-white text-xs flex-1 hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {tab === 'contacts' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
              {loading ? (
                <p>Loading...</p>
              ) : contacts.length > 0 ? (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="border-l-4 border-blue-600 pl-4 py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{contact.name}</h3>
                          <p className="text-gray-600 text-sm">{contact.email}</p>
                          <p className="text-gray-600 text-sm">Subject: {contact.subject}</p>
                          <p className="mt-2 text-gray-700">{contact.message}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          contact.status === 'new'
                            ? 'bg-yellow-100 text-yellow-800'
                            : contact.status === 'read'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No contact messages yet</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
