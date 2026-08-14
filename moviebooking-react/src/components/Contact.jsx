import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [toast, setToast] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast('Message sent successfully!');
    setTimeout(() => setToast(null), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <section id="contact" className="container">
        <h2 className="section-title">📞 Contact Us</h2>
        <div className="contact-section">
          <div className="row">
            <div className="col col-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <i className="material-icons">person</i>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons">email</i>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons">phone</i>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons">subject</i>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons" style={{ top: '20px', transform: 'none' }}>message</i>
                  <textarea
                    className="form-input"
                    placeholder="Message"
                    rows="5"
                    style={{ resize: 'vertical', paddingTop: '15px' }}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>
                <button className="confirm-btn" type="submit">
                  <i className="material-icons">send</i>
                  SEND MESSAGE
                </button>
              </form>
            </div>
            <div className="col col-6">
              <div className="contact-info">
                <h5>📍 Address</h5>
                <p>Book Me Multiplex, Anna Salai, Chennai</p>
                <h5>🕒 Hours</h5>
                <p>Mon-Sun: 9:00 AM - 12:00 AM</p>
                <h5>📞 Phone</h5>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
