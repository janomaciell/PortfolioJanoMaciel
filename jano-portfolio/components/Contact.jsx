import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Reemplaza estos valores con tus credenciales de EmailJS
      const serviceID = 'service_7a52up1';
      const templateID = 'template_afshotn';
      const publicKey = 'njKaLQvBNkUWF0QtR';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.project,
        message: formData.message,
        to_name: 'Jano Maciel',
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        project: '',
        message: ''
      });
    } catch (error) {
      console.error('Error al enviar el email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="title-line">VAMOS A</span>
            <span className="title-line highlight">CREAR</span>
            <span className="title-line">JUNTOS</span>
          </h1>
          <p className="contact-subtitle">
            ¿Tenés un proyecto en mente? 
          </p>
          <p className="contact-subtitle">
          Llevemos tu proyecto al siguiente nivel.
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
                Contame tu visión y la haremos realidad.
              </p>
            </div>

            <div className="info-block">
              <h3 className="info-title">SERVICIOS</h3>
              <ul className="services-list">
                <li>Desarrollo Web Full Stack</li>
                <li>Diseño UI/UX</li>
                <li>Branding e Identidad Visual</li>
                <li>Sistemas de Gestión</li>
                <li>Automatizaciones</li>
                <li>E-commerce</li>
                <li>Marketing Digital</li>
                <li>Consultoría Digital</li>
              </ul>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">EMAIL:</span>
                <span className="detail-value">janomaciel1@gmail.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">TELÉFONO:</span>
                <span className="detail-value">+54 (2267) 40-5599</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">UBICACIÓN:</span>
                <span className="detail-value">Argentina</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitStatus === 'success' && (
              <div className="status-message success">
                ¡Mensaje enviado exitosamente! Te responderé pronto.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="status-message error">
                Hubo un error al enviar el mensaje. Intentá nuevamente.
              </div>
            )}

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
                  placeholder="Tu nombre completo"
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
                  placeholder="tu@email.com"
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
                  <option value="">Seleccioná una opción</option>
                  <option value="web">Desarrollo Web</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="design">Diseño UI/UX</option>
                  <option value="branding">Branding</option>
                  <option value="sistema">Sistema de Gestión</option>
                  <option value="automatizacion">Automatizaciones</option>
                  <option value="marketing">Marketing Digital</option>
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
                  placeholder="Contame sobre tu proyecto, objetivos, timeline, presupuesto aproximado..."
                  required
                />
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                <span className="btn-text">
                  {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                </span>
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
          ¿LISTO PARA EMPEZAR? ¡IMPULSÁ TU VISIÓN HACIA EL ÉXITO!
        </p>
      </div>
    </div>
  );
};

export default Contact;