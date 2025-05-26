import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

function ContactForm({ brokerEmail, apartmentId, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/contact", {
      ...form, brokerEmail, apartmentId
    });
    setSubmitted(true);
  };

  if (submitted) return <div>Message sent!</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required />
      <button type="submit">Send</button>
      <button onClick={onClose} type="button">Cancel</button>
    </form>
  );
}

function App() {
  const [apartments, setApartments] = useState([]);
  const [showForm, setShowForm] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/apartments")
      .then(res => setApartments(res.data));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Apartment Listings</h1>
        {apartments.map(apartment => (
          <div key={apartment._id} style={{ marginBottom: "30px" }}>
            <h2>{apartment.title}</h2>
            <img src={apartment.img} alt={apartment.title} style={{ width: 300, borderRadius: 8 }} />
            <br />
            <button onClick={() => setShowForm({ ...showForm, [apartment._id]: true })}>
              Contact Broker
            </button>
            {showForm[apartment._id] &&
              <ContactForm
                brokerEmail={apartment.brokerEmail}
                apartmentId={apartment._id}
                onClose={() => setShowForm({ ...showForm, [apartment._id]: false })}
              />}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, height: "100vh" }}>
        <MapContainer center={[40.7178, -74.0035]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {apartments.map(apartment => (
            <Marker key={apartment._id} position={[apartment.lat, apartment.lng]}>
              <Popup>
                <strong>{apartment.title}</strong>
                <br />
                <img src={apartment.img} alt={apartment.title} style={{ width: 100, borderRadius: 5 }} />
                <br />
                <button onClick={() => setShowForm({ ...showForm, [apartment._id]: true })}>
                  Contact Broker
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;