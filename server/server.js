import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getOrderById } from '../services/api';

const statusSteps = ['Order Received', 'Drawing in Progress', 'Drawing Completed', 'Shipped', 'Delivered'];

const OrderTracker = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [trackId, setTrackId] = useState(orderId || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrder = async (id) => {
    if (!id) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await getOrderById(id);
      setOrder(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found. Please check the order ID.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedId = trackId.trim();
    if (!cleanedId) {
      setError('Please enter an order ID.');
      return;
    }
    navigate(`/track/${cleanedId}`);
  };

  const currentStepIndex = statusSteps.indexOf(order?.orderStatus || 'Order Received');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-100 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h1 className="text-4xl font-bold text-slate-900">Track your order</h1>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={trackId}
                onChange={(event) => setTrackId(event.target.value)}
                placeholder="Enter order ID, e.g. SKL-20260918-001"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
              <button type="submit" className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">
                Track
              </button>
            </form>

            {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            {loading && <div className="mt-6 text-slate-600">Loading order status...</div>}

            {order && (
              <div className="mt-8 space-y-8">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Order ID</p>
                      <p className="text-2xl font-black text-slate-900">{order.orderId}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">{order.orderStatus}</span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer</p>
                    <p className="font-semibold text-slate-900">{order.customerName}</p>
                    <p className="text-slate-600">{order.email}</p>
                    <p className="text-slate-600">{order.phone}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery</p>
                    <p className="text-slate-700">{order.address}</p>
                    <p className="text-slate-700">{order.city}, {order.state} - {order.pinCode}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Status timeline</p>
                  <div className="grid gap-4 md:grid-cols-5">
                    {statusSteps.map((step, index) => (
                      <div key={step} className="relative flex flex-col items-center">
                        <div
                          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                            index <= currentStepIndex
                              ? 'border-amber-500 bg-amber-500 text-white'
                              : 'border-slate-300 bg-white text-slate-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <p className={`text-center text-xs font-medium ${index <= currentStepIndex ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-semibold text-slate-700 underline underline-offset-4">Return to home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderTracker;
