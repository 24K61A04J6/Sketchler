import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtworkCard from '../components/ArtworkCard';
import { getArtworks } from '../services/api';

const Portfolio = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getArtworks();
        setArtworks(data);
        setFilteredArtworks(data);
        
        // Extract unique categories
        const cats = ['all', ...new Set(data.map(a => a.category))];
        setCategories(cats);
      } catch (err) {
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredArtworks(artworks);
    } else {
      setFilteredArtworks(artworks.filter(a => a.category === category));
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12 text-center">My Portfolio</h1>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Artworks Grid */}
          {loading ? (
            <div className="text-center text-gray-500">Loading portfolio...</div>
          ) : filteredArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No artworks found in this category</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
