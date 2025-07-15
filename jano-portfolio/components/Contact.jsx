import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(form.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="container">
        <div className="contact-content" ref={formRef}>
          <h2>Contacto</h2>
          <p>¿Tienes un proyecto en mente? ¡Hablemos!</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>jano.maciel@email.com</p>
            </div>
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/jano-maciel</p>
            </div>
            <div className="contact-item">
              <h3>GitHub</h3>
              <p>github.com/jano-maciel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;