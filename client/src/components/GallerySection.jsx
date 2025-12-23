import { useState, useEffect } from 'react';
import GallerySkeleton from './GallerySkeleton';

const images = [
  {
    id: 1,
    title: "Winter Wonderland",
    description: "Festive decorations lighting up the night",
    icon: "🎄",
    gradient: "linear-gradient(135deg, #dbeafe, #e0e7ff)"
  },
  {
    id: 2,
    title: "Holiday Cheer",
    description: "Moments of joy and celebration",
    icon: "🎁",
    gradient: "linear-gradient(135deg, #fee2e2, #fef3c7)"
  },
  {
    id: 3,
    title: "Season's Greetings",
    description: "Warm wishes and happy memories",
    icon: "⛄",
    gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0)"
  },
  {
    id: 4,
    title: "Festive Lights",
    description: "Sparkling decorations everywhere",
    icon: "🌟",
    gradient: "linear-gradient(135deg, #fef3c7, #fde68a)"
  },
  {
    id: 5,
    title: "Cozy Moments",
    description: "Warm gatherings with loved ones",
    icon: "🕯️",
    gradient: "linear-gradient(135deg, #fce7f3, #fbcfe8)"
  },
  {
    id: 6,
    title: "New Beginnings",
    description: "Looking forward to the year ahead",
    icon: "🎉",
    gradient: "linear-gradient(135deg, #e0e7ff, #c7d2fe)"
  }
];

const GallerySection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <GallerySkeleton />;
  }

  return (
    <section className="gallery-section">
      <div className="gallery-title">
        <h2>Year in Review</h2>
        <p>Memorable moments from the festive season</p>
      </div>
      
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item fade-in"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              background: image.gradient 
            }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="gallery-icon">
              <span style={{ fontSize: '4rem' }}>{image.icon}</span>
            </div>
            
            <div className="gallery-content">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedImage.title}</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
            <div style={{ 
              background: selectedImage.gradient,
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-xl)',
              textAlign: 'center',
              marginBottom: 'var(--space-lg)'
            }}>
              <span style={{ fontSize: '3rem' }}>{selectedImage.icon}</span>
            </div>
            <p className="text-gray-600">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;