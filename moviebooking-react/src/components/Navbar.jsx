import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Now Showing', id: 'now-showing' },
    { label: 'Theaters', id: 'theaters' },
    { label: 'Offers', id: 'offers' },
    { label: 'Book Tickets', id: 'book' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="nav-container">
          <a href="#home" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
            <i className="material-icons brand-icon">theaters</i>
            BOOK<span>ME</span>
          </a>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button className="sidenav-trigger" onClick={() => setMobileOpen(!mobileOpen)}>
            <i className="material-icons">menu</i>
          </button>
        </div>
      </header>

      {/* Mobile sidenav */}
      <div className={`sidenav ${mobileOpen ? 'open' : ''}`}>
        <div className="sidenav-header">
          <i className="material-icons">theaters</i>
          <span>BOOK<span style={{ color: '#e50914' }}>ME</span></span>
        </div>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="sidenav-link"
            onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
          >
            <i className="material-icons">
              {link.id === 'home' ? 'home' : link.id === 'now-showing' ? 'movie' : link.id === 'theaters' ? 'theaters' : link.id === 'offers' ? 'local_offer' : link.id === 'book' ? 'confirmation_number' : 'contact_mail'}
            </i>
            {link.label}
          </a>
        ))}
      </div>

      {mobileOpen && (
        <div className="sidenav-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
