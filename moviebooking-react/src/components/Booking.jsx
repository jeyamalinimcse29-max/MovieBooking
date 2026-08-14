import { useState } from 'react';
import { movies, theaters, seatLayout } from '../data/movies';

export default function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    movie: '',
    theater: '',
    date: '',
    showtime: '',
    tickets: 2,
    seatType: '',
  });
  const [toast, setToast] = useState(null);

  const toggleSeat = (seatId) => {
    if (seatLayout.booked.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast('Booking confirmed!');
    setTimeout(() => setToast(null), 3000);
  };

  const rows = seatLayout.rows;
  const seatsPerRow = seatLayout.seatsPerRow;

  return (
    <>
      <section id="book" className="container">
        <h2 className="section-title">🎟️ Book Your Tickets</h2>
        <div className="row">
          {/* Booking Form */}
          <div className="col col-6">
            <div className="glass-card booking-form-card">
              <h4 className="booking-form-title">
                <i className="material-icons">edit_calendar</i>
                Booking Details
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <i className="material-icons">account_circle</i>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
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
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons">movie</i>
                  <select
                    className="form-select"
                    value={formData.movie}
                    onChange={(e) => handleInputChange('movie', e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Movie</option>
                    {movies.map((m) => (
                      <option key={m.id} value={m.id}>{m.title} ({m.language}) - {m.duration}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <i className="material-icons">theaters</i>
                  <select
                    className="form-select"
                    value={formData.theater}
                    onChange={(e) => handleInputChange('theater', e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Theater</option>
                    {theaters.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} - {t.location}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <i className="material-icons">date_range</i>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons">schedule</i>
                  <select
                    className="form-select"
                    value={formData.showtime}
                    onChange={(e) => handleInputChange('showtime', e.target.value)}
                    required
                  >
                    <option value="" disabled>Showtime</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="21:45">9:45 PM</option>
                  </select>
                </div>
                <div className="form-group">
                  <i className="material-icons">confirmation_number</i>
                  <input
                    type="number"
                    className="form-input"
                    min="1"
                    max="10"
                    value={formData.tickets}
                    onChange={(e) => handleInputChange('tickets', parseInt(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <i className="material-icons">chair</i>
                  <select
                    className="form-select"
                    value={formData.seatType}
                    onChange={(e) => handleInputChange('seatType', e.target.value)}
                    required
                  >
                    <option value="" disabled>Seat Type</option>
                    <option value="standard">Standard - ₹150</option>
                    <option value="premium">Premium - ₹250</option>
                    <option value="recliner">Recliner - ₹400</option>
                  </select>
                </div>
                <label className="terms-check">
                  <input type="checkbox" defaultChecked />
                  <span>I accept the terms and conditions</span>
                </label>
                <button className="confirm-btn" type="submit">
                  <i className="material-icons">lock</i>
                  CONFIRM BOOKING
                </button>
              </form>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="col col-6">
            <div className="glass-card seat-layout-container">
              <h4 className="seat-layout-title">
                <i className="material-icons">event_seat</i>
                Select Your Seats
              </h4>
              <div className="screen">SCREEN</div>
              <div className="seat-grid">
                {rows.map((row) =>
                  Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isBooked = seatLayout.booked.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const className = `seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`;
                    return (
                      <div
                        key={seatId}
                        className={className}
                        onClick={() => toggleSeat(seatId)}
                      >
                        {seatId}
                      </div>
                    );
                  })
                )}
              </div>
              <div className="seat-legend">
                <div className="legend-item"><span className="legend-box available"></span> Available</div>
                <div className="legend-item"><span className="legend-box selected"></span> Selected</div>
                <div className="legend-item"><span className="legend-box booked"></span> Booked</div>
              </div>
              {selectedSeats.length > 0 && (
                <div className="selected-info">
                  <i className="material-icons">check_circle</i>
                  Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seats)
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
