import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí manejarías el envío del formulario
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="floating-elements">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        
        <div className="contact-header">
          <h1 className="contact-title">
            <span className="title-line">LET'S</span>
            <span className="title-line highlight">CREATE</span>
            <span className="title-line">TOGETHER</span>
          </h1>
          <p className="contact-subtitle">
            ¿Tienes un proyecto en mente? Hagamos algo increíble juntos.
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-block">
              <h3 className="info-title">CONVERSEMOS</h3>
              <p className="info-text">
                Cada proyecto es único y merece una solución personalizada. 
                Cuéntanos tu visión y la haremos realidad.
              </p>
            </div>

            <div className="info-block">
              <h3 className="info-title">SERVICIOS</h3>
              <ul className="services-list">
                <li>Desarrollo Web</li>
                <li>Diseño UI/UX</li>
                <li>Branding</li>
                <li>Consultoría Digital</li>
              </ul>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">EMAIL:</span>
                <span className="detail-value">hello@tuempresa.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">TELÉFONO:</span>
                <span className="detail-value">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">NOMBRE *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">EMAIL *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="project" className="form-label">TIPO DE PROYECTO</label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="web">Desarrollo Web</option>
                  <option value="design">Diseño UI/UX</option>
                  <option value="branding">Branding</option>
                  <option value="consulting">Consultoría</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">MENSAJE *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="6"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-text">ENVIAR MENSAJE</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <div className="footer-decoration">
          <div className="deco-element deco-1"></div>
          <div className="deco-element deco-2"></div>
          <div className="deco-element deco-3"></div>
        </div>
        <p className="footer-text">
          READY TO START? LET'S MAKE SOMETHING AMAZING TOGETHER!
        </p>
      </div>
    </div>
  );
};

export default Contact;