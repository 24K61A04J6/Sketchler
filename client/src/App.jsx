import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import OrderForm from './pages/OrderForm';
import OrderSuccess from './pages/OrderSuccess';
import OrderTracker from './pages/OrderTracker';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './styles/globals.css';
export default function App() { return <BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/contact" element={<Contact />} /><Route path="/order" element={<OrderForm />} /><Route path="/order/success" element={<OrderSuccess />} /><Route path="/track" element={<OrderTracker />} /><Route path="/track/:orderId" element={<OrderTracker />} /><Route path="/admin" element={<AdminLogin />} /><Route path="/admin/dashboard" element={<AdminDashboard />} /><Route path="*" element={<Navigate to="/" />} /></Routes></BrowserRouter>; }
