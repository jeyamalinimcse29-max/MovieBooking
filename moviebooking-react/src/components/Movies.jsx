import { useState } from 'react';
import { movies, theaters } from '../data/movies';

function TrailerModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h4>{movie.title} - Official Trailer</h4>
        <div className="modal-body">
          {movie.trailerId ? (
            <div className="video-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${movie.trailerId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="video-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e2438', padding: '0' }}>
              <p style={{ color: '#e50914', textAlign: 'center' }}>Trailer coming soon</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Cast:</strong> {movie.cast}</p>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p><strong>Music:</strong> {movie.music}</p>
              <p><strong>Release:</strong> {movie.releaseDate}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-small" style={{ background: 'transparent', border: '2px solid #e50914', color: 'white' }} onClick={onClose}>CLOSE</button>
          <a href="#book" className="btn-small book-btn" onClick={(e) => { e.preventDefault(); onClose(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }); }}>BOOK NOW</a>
        </div>
      </div>
    </div>
  );
}

function MovieDetailModal({ movie, onClose, onWatchTrailer }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h4>{movie.title} (Tamil)</h4>
        <div className="modal-body">
          <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 200px' }}>
              <img src={movie.image} alt={movie.title} style={{ width: '100%', borderRadius: '10px' }} />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Cast:</strong> {movie.cast}</p>
              <p><strong>Music:</strong> {movie.music}</p>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Release:</strong> {movie.releaseDate}</p>
              <p><strong>Duration:</strong> {movie.duration}</p>
              <p><strong>Synopsis:</strong> {movie.synopsis}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-small" style={{ background: 'transparent', border: '2px solid #e50914', color: 'white' }} onClick={onClose}>CLOSE</button>
          <button className="btn-small" style={{ background: '#424242', color: 'white' }} onClick={() => { onClose(); onWatchTrailer(); }}>WATCH TRAILER</button>
          <a href="#book" className="btn-small book-btn" onClick={(e) => { e.preventDefault(); onClose(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }); }}>BOOK NOW</a>
        </div>
      </div>
    </div>
  );
}

export default function Movies() {
  const [trailerModal, setTrailerModal] = useState(null);
  const [detailModal, setDetailModal] = useState(null);

  const openTrailer = (movie) => { setTrailerModal(movie); setDetailModal(null); };
  const openDetail = (movie) => setDetailModal(movie);
  const closeModals = () => { setTrailerModal(null); setDetailModal(null); };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Now Showing */}
      <section id="now-showing" className="container">
        <h2 className="section-title">🎟️ Now Showing</h2>
        <div className="row">
          {movies.map((movie) => (
            <div className="col col-3" key={movie.id}>
              <div className="card movie-card">
                <div className="card-image">
                  <img src={movie.image} alt={movie.title} />
                  <span className="card-title">{movie.title}</span>
                  <button
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    onClick={() => openDetail(movie)}
                  >
                    <i className="material-icons">info_outline</i>
                  </button>
                </div>
                <div className="card-content">
                  <div className="rating-container">
                    <span className="rating-badge">⭐ {movie.rating}</span>
                    <span className="language-chip">{movie.language}</span>
                  </div>
                  <div className="movie-meta">
                    <i className="material-icons tiny">access_time</i>
                    <span>{movie.duration}</span>
                    <i className="material-icons tiny" style={{ marginLeft: '10px' }}>calendar_today</i>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <p className="movie-description">{movie.description}</p>
                </div>
                <div className="card-action">
                  <button className="btn-small trailer-btn" onClick={() => openTrailer(movie)}>
                    <i className="material-icons left">play_arrow</i>TRAILER
                  </button>
                  <button className="btn-small book-btn" onClick={() => scrollTo('book')}>
                    <i className="material-icons left">confirmation_number</i>BOOK
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center mt-40">
          <button className="btn-large waves-effect waves-light" style={{ width: '300px' }}>
            <i className="material-icons left">expand_more</i>View All Movies
          </button>
        </div>
      </section>

      {/* Theater Locations */}
      <section id="theaters" className="container">
        <h2 className="section-title">🎬 Our Theaters</h2>
        <div className="row">
          {theaters.map((theater) => (
            <div className="col col-4" key={theater.id}>
              <div className="card theater-card">
                <div className="card-image">
                  <img src={theater.image} alt={theater.name} />
                </div>
                <div className="card-content">
                  <span className="card-title" style={{ position: 'relative', background: 'none', padding: '0 0 10px 0' }}>{theater.name}</span>
                  <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    <i className="material-icons tiny" style={{ color: '#e50914' }}>place</i> {theater.address}
                  </p>
                  <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    <i className="material-icons tiny" style={{ color: '#e50914' }}>stars</i> {theater.features}
                  </p>
                  <div className="location-badge">
                    <i className="material-icons tiny">location_on</i> {theater.location}
                  </div>
                </div>
                <div className="card-action">
                  <button className="btn-small book-btn" style={{ width: '100%' }} onClick={() => scrollTo('book')}>
                    SELECT THEATER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="container">
        <h2 className="section-title">🎁 Exclusive Offers</h2>
        <div className="row">
          <div className="col col-4">
            <div className="offer-card">
              <i className="material-icons">weekend</i>
              <h5>Weekend Special</h5>
              <p>Buy 2 tickets, get 1 free</p>
              <span className="rating-badge" style={{ background: 'transparent', border: '1px solid #e50914' }}>Code: WEEKEND50</span>
            </div>
          </div>
          <div className="col col-4">
            <div className="offer-card">
              <i className="material-icons">school</i>
              <h5>Student Offer</h5>
              <p>20% off on all shows</p>
              <span className="rating-badge" style={{ background: 'transparent', border: '1px solid #e50914' }}>Code: STUDENT20</span>
            </div>
          </div>
          <div className="col col-4">
            <div className="offer-card">
              <i className="material-icons">family_restroom</i>
              <h5>Family Combo</h5>
              <p>4 tickets + snacks @ ₹999</p>
              <span className="rating-badge" style={{ background: 'transparent', border: '1px solid #e50914' }}>Code: FAMILY4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Gallery */}
      <section className="container">
        <h2 className="section-title">📽️ Movies Available</h2>
        <div className="gallery-grid">
          {movies.map((movie) => (
            <div className="gallery-item" key={`gallery-${movie.id}`}>
              <img src={movie.image} alt={movie.title} />
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <TrailerModal movie={trailerModal} onClose={closeModals} />
      <MovieDetailModal
        movie={detailModal}
        onClose={closeModals}
        onWatchTrailer={() => openTrailer(detailModal)}
      />
    </>
  );
}
