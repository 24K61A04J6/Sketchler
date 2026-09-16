import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtworkCard from '../components/ArtworkCard';
import { getArtworks } from '../services/api';

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artworksData = await getArtworks({ featured: true });
        setArtworks(artworksData);
      } catch (err) {
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Sketchler</h1>
            <p className="text-xl mb-8">Discover extraordinary artwork and creative talent</p>
            <a href="/portfolio" className="btn btn-primary">Explore Portfolio</a>
          </div>
        </section>

        {/* Featured Artworks */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Works</h2>
            {loading ? (
              <div className="text-center text-gray-500">Loading artworks...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork._id} artwork={artwork} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
            <a href="/contact" className="btn btn-primary">Contact Me</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
