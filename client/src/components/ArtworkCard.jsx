import React from 'react';

const ArtworkCard = ({ artwork }) => {
  return (
    <div className="card overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
        <p className="text-gray-600 mb-2">{artwork.category}</p>
        <p className="text-gray-700 mb-4">{artwork.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{artwork.yearCreated}</span>
          {artwork.price && <span className="text-blue-600 font-bold">${artwork.price}</span>}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
