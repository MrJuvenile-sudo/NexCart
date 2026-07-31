import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PageLayout({ title, description, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Navbar />
      <main className="page-container" style={{ padding: '2rem 0' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
