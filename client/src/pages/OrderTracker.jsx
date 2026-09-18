import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order || JSON.parse(localStorage.getItem('lastSketchlerOrder') || 'null');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-100 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">✓</div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Payment successful</p>
            <h1 className="text-4xl font-bold text-slate-900">Your portrait order has been received!</h1>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Order ID</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{order?.orderId || 'SKL-000000-000'}</p>
              <p className="mt-3 text-slate-600">Estimated completion/delivery time: 7–12 days</p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to={order ? `/track/${order.orderId}` : '/track'} className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">
                Track order
              </Link>
              <Link to="/" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderSuccess;
