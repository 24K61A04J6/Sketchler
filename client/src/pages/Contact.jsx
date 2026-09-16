import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitContactForm(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-8">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block font-semibold mb-2">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                id="name"
                type="text"
                placeholder="Your name"
                className="input-field"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block font-semibold mb-2">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email' }
                })}
                id="email"
                type="email"
                placeholder="your@email.com"
                className="input-field"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label htmlFor="subject" className="block font-semibold mb-2">Subject</label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                id="subject"
                type="text"
                placeholder="Message subject"
                className="input-field"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block font-semibold mb-2">Message</label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                id="message"
                placeholder="Your message"
                rows="6"
                className="input-field"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
