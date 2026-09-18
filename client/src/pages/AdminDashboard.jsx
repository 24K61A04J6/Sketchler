import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  getArtworks,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  getContacts,
  getAdminOrders,
  updateOrderStatus,
} from '../services/api';

const statusOptions = ['Order Received', 'Drawing in Progress', 'Drawing Completed', 'Shipped', 'Delivered'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');
  const [artworks, setArtworks] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    price: '',
    yearCreated: new Date().getFullYear(),
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
      const [artworksData, contactsData, ordersData] = await Promise.all([
        getArtworks(),
        getContacts(token),
        getAdminOrders(token),
      ]);
      setArtworks(artworksData);
      setContacts(contactsData);
      setOrders(ordersData);
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
        yearCreated: new Date().getFullYear(),
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

  const handleStatusChange = async (orderId, status) => {
    const token = localStorage.getItem('adminToken');
    try {
      await updateOrderStatus(orderId, status, token);
      loadData();
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Unable to update order status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Private access</p>
              <h1 className="mt-2 text-4xl font-black text-slate-900">Admin Dashboard</h1>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setTab('orders')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                tab === 'orders' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setTab('artworks')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                tab === 'artworks' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'
              }`}
            >
              Manage Artworks
            </button>
            <button
              onClick={() => setTab('contacts')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                tab === 'contacts' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>

          {tab === 'orders' && (
            <div className="space-y-6">
              {loading ? (
                <div className="card p-8 text-slate-600">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="card p-8 text-slate-500">No portrait orders yet.</div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="card p-6">
                    <div className="grid gap-5 lg:grid-cols-[240px_1fr_260px]">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        {order.imageDataUrl ? (
                          <img src={order.imageDataUrl} alt="Reference photo" className="h-52 w-full object-cover" />
                        ) : (
                          <div className="flex h-52 items-center justify-center text-sm text-slate-500">No image</div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Order ID</p>
                            <h3 className="text-2xl font-black text-slate-900">{order.orderId}</h3>
                          </div>
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                            {order.orderStatus}
                          </span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-500">Customer</p>
                            <p className="text-lg font-bold text-slate-900">{order.customerName}</p>
                            <p className="text-slate-600">{order.phone}</p>
                            <p className="text-slate-600">{order.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-500">Address</p>
                            <p className="text-slate-700">{order.address}</p>
                            <p className="text-slate-700">{order.city}, {order.state} - {order.pinCode}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-500">Size</p>
                            <p className="font-semibold text-slate-900">{order.portraitSize}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-500">People</p>
                            <p className="font-semibold text-slate-900">{order.numberOfPeople}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-500">Amount</p>
                            <p className="font-semibold text-slate-900">₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}</p>
                          </div>
                        </div>

                        {order.specialInstructions && (
                          <div>
                            <p className="text-sm font-semibold text-slate-500">Special instructions</p>
                            <p className="text-slate-700">{order.specialInstructions}</p>
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">Update status</label>
                        <select
                          value={order.orderStatus}
                          onChange={(event) => handleStatusChange(order._id, event.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>

                        {order.imageDataUrl && (
                          <a
                            href={order.imageDataUrl}
                            download={`${order.orderId}-reference.jpg`}
                            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                          >
                            Download photo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === 'artworks' && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="card p-6">
                <h2 className="mb-6 text-2xl font-black text-slate-900">{editingId ? 'Edit artwork' : 'Add new artwork'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
                    <input name="title" value={formData.title} onChange={handleInputChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="input-field" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Image URL</label>
                    <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                    <input name="category" value={formData.category} onChange={handleInputChange} className="input-field" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Price</label>
                    <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Year Created</label>
                    <input name="yearCreated" type="number" value={formData.yearCreated} onChange={handleInputChange} className="input-field" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn btn-primary flex-1">Save artwork</button>
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
                            yearCreated: new Date().getFullYear(),
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

              <div className="card p-6">
                <h2 className="mb-6 text-2xl font-black text-slate-900">Artwork list</h2>
                {artworks.length === 0 ? (
                  <p className="text-slate-500">No artworks added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {artworks.map((artwork) => (
                      <div key={artwork._id} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{artwork.title}</h3>
                            <p className="text-sm text-slate-600">{artwork.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(artwork)} className="btn btn-outline text-xs">Edit</button>
                            <button onClick={() => handleDelete(artwork._id)} className="btn bg-red-600 text-xs text-white hover:bg-red-700">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'contacts' && (
            <div className="card p-6">
              <h2 className="mb-6 text-2xl font-black text-slate-900">Contact messages</h2>
              {contacts.length === 0 ? (
                <p className="text-slate-500">No contact messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
                          <p className="text-sm text-slate-600">{contact.email}</p>
                        </div>
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{contact.status}</span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-700">Subject: {contact.subject}</p>
                      <p className="mt-2 text-slate-600">{contact.message}</p>
                    </div>
                  ))}
                </div>
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






























































































































































































































































































































































a



















































































































































































































































