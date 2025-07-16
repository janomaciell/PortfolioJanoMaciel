import React, { useEffect } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  useEffect(() => {
    // Actualiza el año dinámicamente
    const currentYear = new Date().getFullYear();
    const currentYearElements = document.querySelectorAll('[data-current-year]');
    currentYearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }, []);

  return (
    <>
      <section className="cloneable">
        <p className="paragraph">
          <span className="is--orange">©</span> <span data-current-year="">20??</span> Jm
        </p>
      </section>

    </>
  );
};

export default Footer; 