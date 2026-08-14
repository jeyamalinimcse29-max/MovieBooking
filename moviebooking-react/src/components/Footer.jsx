import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);

  const handleSubscribe = () => {
    if (email) {
      setToast('Subscribed successfully!');
      setTimeout(() => setToast(null), 3000);
      setEmail('');
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="page-footer">
        <div className="footer-content">
          <div className="row">
            <div className="col col-4">
              <h5 className="footer-title">BOOK<span style={{ color: 'white' }}>ME</span></h5>
              <p className="footer-text">Your premier destination for Tamil cinema. Experience the magic of movies with cutting-edge technology and unmatched comfort.</p>
              <div className="social-links">
                <a href="#!"><i className="material-icons">facebook</i></a>
                <a href="#!"><i className="material-icons">language</i></a>
                <a href="#!"><i className="material-icons">smart_display</i></a>
                <a href="#!"><i className="material-icons">camera_alt</i></a>
              </div>
            </div>
            <div className="col col-4 footer-links">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#now-showing" onClick={(e) => { e.preventDefault(); scrollTo('now-showing'); }}>Now Showing</a></li>
                <li><a href="#theaters" onClick={(e) => { e.preventDefault(); scrollTo('theaters'); }}>Theaters</a></li>
                <li><a href="#offers" onClick={(e) => { e.preventDefault(); scrollTo('offers'); }}>Offers</a></li>
                <li><a href="#book" onClick={(e) => { e.preventDefault(); scrollTo('book'); }}>Book Tickets</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
              </ul>
            </div>
            <div className="col col-4">
              <h5>Newsletter</h5>
              <input
                type="email"
                placeholder="Your Email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn-small" onClick={handleSubscribe} style={{ cursor: 'pointer' }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">© 2025 BOOK ME. All rights reserved.</div>
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
