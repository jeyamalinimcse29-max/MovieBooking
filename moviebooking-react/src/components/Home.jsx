import { useEffect, useRef } from 'react';
import { movies } from '../data/movies';

export default function Home() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollAmount = 340;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const featuredMovies = movies.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1>Experience Tamil Cinema</h1>
          <h4>4K Dolby Atmos | Luxury Recliners | Latest Tamil Movies</h4>
          <div className="hero-buttons">
            <a
              className="hero-btn hero-btn-primary"
              href="#book"
              onClick={(e) => { e.preventDefault(); scrollTo('book'); }}
            >
              <i className="material-icons">confirmation_number</i>
              <span>Book Tickets</span>
            </a>
            <a
              className="hero-btn hero-btn-primary"
              href="#featured"
              onClick={(e) => { e.preventDefault(); scrollTo('featured'); }}
            >
              <i className="material-icons">play_circle</i>
              <span>Watch Trailers</span>
            </a>
          </div>
          <div className="hero-badges">
            <span className="rating-badge">⭐ 8.4 With Love</span>
            <span className="rating-badge">⭐ 8.7 Kudumbasthan</span>
            <span className="rating-badge">⭐ 9.1 Parasakthi</span>
          </div>
        </div>
      </section>

      {/* Featured Movies Carousel */}
      <section id="featured" className="container carousel-section">
        <h2 className="section-title">🔥 Featured Tamil Movies</h2>
        <div className="carousel" ref={carouselRef}>
          {featuredMovies.map((movie) => (
            <a
              key={movie.id}
              className="carousel-item"
              href={`#movie-${movie.id}`}
              onClick={(e) => e.preventDefault()}
            >
              <img src={movie.image} alt={movie.title} />
              <div className="carousel-info">
                <span className="rating-badge">⭐ {movie.rating}</span>
                <h5 style={{ margin: '5px 0' }}>{movie.title}</h5>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{movie.cast}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
