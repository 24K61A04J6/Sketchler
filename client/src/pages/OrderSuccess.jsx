import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createOrder } from '../services/api';

const portraitSizes = [
  { value: 'A5', label: 'A5', price: '₹1,499', amount: 1499 },
  { value: 'A4', label: 'A4', price: '₹2,499', amount: 2499 },
  { value: 'A3', label: 'A3', price: '₹3,499', amount: 3499 },
  { value: 'A2', label: 'A2', price: '₹4,999', amount: 4999 },
];

const initialState = {
  customerName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  portraitSize: 'A4',
  numberOfPeople: 1,
  portraitStyle: '',
  specialInstructions: '',
  imageDataUrl: '',
  imageName: '',
  paymentMethod: 'UPI',
};

const OrderForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedSize = portraitSizes.find((size) => size.value === formData.portraitSize) || portraitSizes[1];
  const deliveryCharge = ['A3', 'A2'].includes(formData.portraitSize) ? 199 : 0;
  const totalAmount = selectedSize.amount + deliveryCharge;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        imageDataUrl: reader.result,
        imageName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.imageDataUrl) {
      setError('Please upload a high-quality reference photo before placing the order.');
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder({
        ...formData,
        price: selectedSize.amount,
        deliveryCharge,
        totalAmount,
      });

      localStorage.setItem('lastSketchlerOrder', JSON.stringify(order));
      navigate('/order/success', { state: { order } });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-100 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Custom Portraits</p>
            <h1 className="text-4xl font-bold text-slate-900">Order Your Portrait</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">1. Choose portrait</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {portraitSizes.map((size) => (
                    <label
                      key={size.value}
                      className={`cursor-pointer rounded-2xl border p-4 transition ${
                        formData.portraitSize === size.value
                          ? 'border-amber-500 bg-amber-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="portraitSize"
                        value={size.value}
                        checked={formData.portraitSize === size.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-slate-900">{size.label}</div>
                          <div className="text-sm text-slate-600">Best for {size.label === 'A5' ? 'small keepsakes' : size.label === 'A4' ? 'classic portraits' : size.label === 'A3' ? 'statement wall prints' : 'premium gallery pieces'}</div>
                        </div>
                        <span className="text-lg font-bold text-amber-700">{size.price}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">2. Upload reference photo</h2>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-amber-500 hover:bg-amber-50">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <span className="mb-2 text-4xl">📷</span>
                  <span className="text-lg font-semibold text-slate-700">Upload a high-quality reference photo</span>
                  <span className="mt-1 text-sm text-slate-500">JPG, PNG, or WEBP</span>
                </label>

                {formData.imageDataUrl && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                      <span>Preview</span>
                      <span>{formData.imageName}</span>
                    </div>
                    <img src={formData.imageDataUrl} alt="Reference preview" className="max-h-72 w-full rounded-xl object-cover" />
                  </div>
                )}
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">3. Add details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Number of people</label>
                    <input
                      type="number"
                      name="numberOfPeople"
                      min="1"
                      max="10"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Portrait style</label>
                    <input
                      type="text"
                      name="portraitStyle"
                      value={formData.portraitStyle}
                      onChange={handleChange}
                      placeholder="e.g. Pencil sketch, realistic, vintage"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Payment method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Card">Debit/Credit Card</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Special instructions</label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Add any notes for expression, clothing, background, or framing preferences"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">4. Customer details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                    <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">PIN code</label>
                    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Complete delivery address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" required />
                  </div>
                </div>
              </section>
            </div>

            <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
              <h2 className="mb-5 text-2xl font-bold">Order summary</h2>

              {formData.imageDataUrl && (
                <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
                  <img src={formData.imageDataUrl} alt="Selected reference" className="h-40 w-full rounded-xl object-cover" />
                </div>
              )}

              <div className="space-y-3 rounded-2xl bg-white/5 p-4 text-sm">
                <div className="flex justify-between">
                  <span>Selected size</span>
                  <span className="font-semibold">{selectedSize.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Portrait price</span>
                  <span className="font-semibold">₹{selectedSize.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold">₹{deliveryCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total amount</span>
                  <span className="text-lg font-bold text-amber-300">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-400 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-amber-400 px-4 py-3 text-base font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Processing payment...' : 'Pay and place order'}
              </button>

              <p className="mt-4 text-center text-xs text-slate-300">Secure checkout • UPI / Card / COD supported</p>
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderForm;
