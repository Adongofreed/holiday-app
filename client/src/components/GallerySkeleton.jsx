import '../styles/components.css'

const GallerySkeleton = () => {
  return (
    <section className="gallery-section">
      <div className="gallery-title">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-subtitle"></div>
      </div>
      
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="skeleton skeleton-item"
          />
        ))}
      </div>
    </section>
  )
}

export default GallerySkeleton