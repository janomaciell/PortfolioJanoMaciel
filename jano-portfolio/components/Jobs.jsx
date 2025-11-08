import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import '../styles/Jobs.css';
import CRIPTOMIX from '../img/CRIPTOMIX.png';
import SHALOM from '../img/SHALOM.png';
import CM from '../img/CM.png';
import CARDQR from '../img/CARD-QR.png';
import MENUAR from '../img/MENUAR.png';
import VIRA from '../img/VIRA.png';

const projects = [
  {
    title: 'CRIPTOMIX',
    left: ['PLATAFORMA DE INVERSIONES', 'INNOVACIÓN BLOCKCHAIN', 'AUTOMATIZACIÓN DE CRIPTOMONEDAS'],
    right: ['TRADING INTELIGENTE', 'GESTIÓN DE CARTERAS', 'DISEÑO MODERNO'],
    img: CRIPTOMIX,
    alt: 'Criptomix plataforma de criptomonedas',
    url: 'https://criptomix.com' // Agrega la URL aquí
  },
  {
    title: 'ENCUÉNTRAME',
    left: ['COLLARES INTELIGENTES', 'QR PARA MASCOTAS', 'NOTIFICACIONES EN TIEMPO REAL'],
    right: ['GEOLOCALIZACIÓN', 'MAPA DE ESCANEOS', 'REUNIÓN FAMILIAR ASEGURADA'],
    img: CARDQR,
    alt: 'Encuéntrame QR para mascotas',
    url: 'https://encuentrameqr.com' // Agrega la URL aquí
  },
  {
    title: 'PORTFOLIO COMMUNITY MANAGER',
    left: ['ESTRATEGIA DIGITAL', 'PRESENTACIÓN VISUAL', 'GESTIÓN DE MARCA'],
    right: ['REDES SOCIALES', 'CASOS DE ÉXITO', 'OPTIMIZACIÓN DE CONTENIDO'],
    img: CM,
    alt: 'Portfolio community manager',
    url: 'https://community-manager-lola.vercel.app/' // Agrega la URL aquí
  },
  {
    title: 'AGENCIA DE MARKETING SHALOM',
    left: ['BRANDING', 'CAMPAÑAS DIGITALES', 'MARKETING DE CONTENIDO'],
    right: ['FOTOGRAFÍA Y DISEÑO', 'GESTIÓN DE REDES', 'WEB & LANDING PAGES'],
    img: SHALOM,
    alt: 'Agencia Shalom marketing',
    url: 'https://shalom-omega.vercel.app/' // Agrega la URL aquí
  },
  {
    title: 'MENÚ AR PARA RESTAURANTES',
    left: ['REALIDAD AUMENTADA', 'INTERACCIÓN 3D', 'NAVEGACIÓN INMERSIVA'],
    right: ['EXPERIENCIA DEL USUARIO', 'MENÚ INTERACTIVO', 'INNOVACIÓN GASTRONÓMICA'],
    img: MENUAR,
    alt: 'Menú de restaurantes con AR',
    url: 'https://menu-ar-restaurant.vercel.app/' // Agrega la URL aquí
  },
  {
    title: 'VIRA CONSTRUCTORA',
    left: ['CONSTRUCCIÓN', 'RENOVACIÓN', 'REMODELACIÓN'],
    right: ['DISEÑO', 'CONSTRUCCIÓN', 'RENOVACIÓN'],
    img: VIRA,
    alt: 'Vira Constructora',
    url: 'https://www.viraconstructora.com/' // Agrega la URL aquí
  },
  
];

const Jobs = () => {
  const [active, setActive] = useState(null);
  const itemsRef = useRef([]);

  const handleImageClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Animación de entrada stagger
  useEffect(() => {
    gsap.set(itemsRef.current, { opacity: 0, y: 20, scale: 0.97 });
    gsap.to(itemsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      stagger: 0.04,
      clearProps: 'opacity,y,scale',
    });
  }, []);

  // Animación de abrir/cerrar
  useEffect(() => {
    itemsRef.current.forEach((item, idx) => {
      const content = item.querySelector('.project-content');
      const image = item.querySelector('.image-wrapper img');
      const details = item.querySelectorAll('.line');
      const title = item.querySelector('.project-title');
      if (active === idx) {
        // Abrir
        gsap.to(content, { maxHeight: 500, opacity: 1, margin: '2rem 0', pointerEvents: 'auto', duration: 0.4, ease: 'power2.out' });
        gsap.to(image, { clipPath: 'inset(0% 0 0 0)', duration: 0.35, ease: 'power2.out' });
        gsap.to(details, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' });
        gsap.to(title, { fontSize: window.innerWidth > 768 ? '3.5rem' : '2.5rem', letterSpacing: '0.01em', duration: 0.35 });
      } else {
        // Cerrar
        gsap.to(content, { maxHeight: 0, opacity: 0, margin: 0, pointerEvents: 'none', duration: 0.3, ease: 'power2.in' });
        gsap.to(image, { clipPath: 'inset(100% 0 0 0)', duration: 0.2, ease: 'power2.in' });
        gsap.to(details, { y: '100%', opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.in' });
        gsap.to(title, { fontSize: '3rem', letterSpacing: '-0.02em', duration: 0.2 });
      }
    });
  }, [active]);

  // Split animación de texto (simulación simple)
  useEffect(() => {
    itemsRef.current.forEach(item => {
      const detailElements = item.querySelectorAll('.project-details p');
      detailElements.forEach(element => {
        if (!element.querySelector('.line')) {
          const text = element.textContent;
          element.innerHTML = `<span class='line' style='display:inline-block; transform:translateY(100%); opacity:0;'>${text}</span>`;
        }
      });
    });
  }, []);

  // Hover indicators animación - cambiar a click
  useEffect(() => {
    itemsRef.current.forEach((item, idx) => {
      const titleContainer = item.querySelector('.project-title-container');
      const leftIndicator = item.querySelector('.hover-indicator.left');
      const rightIndicator = item.querySelector('.hover-indicator.right');
      
      const handleClick = () => {
        if (active === idx) {
          setActive(null); // Cerrar si ya está abierto
        } else {
          setActive(idx); // Abrir si está cerrado
        }
      };
      
      titleContainer.addEventListener('click', handleClick);
      
      return () => {
        titleContainer.removeEventListener('click', handleClick);
      };
    });
  }, [active]);

  return (

    <div className="projects-component">
    <h1 className="about-title-jobs">Proyectos</h1>
      <div className="projects-list">
        {projects.map((proj, idx) => (
          <div
            className="project-item"
            data-index={idx}
            key={proj.title}
            ref={el => (itemsRef.current[idx] = el)}
          >
            <div className="project-title-container">
              <div className="hover-indicator left"></div>
              <h2 className="project-title">{proj.title}</h2>
              <div className="hover-indicator right"></div>
            </div>
            <div className="project-content">
              <div className="project-details left">
                {proj.left.map((txt, i) => (
                  <div className="line-wrapper" key={i} style={{ overflow: 'hidden', marginBottom: '0.25rem' , color: 'white'}}>
                    <span className="line" style={{ display: 'inline-block', transform: 'translateY(100%)', opacity: 0 }}>{txt}</span>
                  </div>
                ))}
              </div>
              <div className="project-image">
              <div className="image-wrapper">
                <img 
                  src={proj.img} 
                  alt={proj.alt} 
                  style={{ 
                    clipPath: 'inset(100% 0 0 0)', 
                    cursor: proj.url ? 'pointer' : 'default' 
                  }}
                  onClick={() => handleImageClick(proj.url)}
                />
              </div>
            </div>
              <div className="project-details right">
                {proj.right.map((txt, i) => (
                  <div className="line-wrapper" key={i} style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
                    <span className="line" style={{ display: 'inline-block', transform: 'translateY(100%)', opacity: 0 , color: 'while'}}>{txt}</span>
                  </div>
                ))}
                <div className="line-wrapper">
                  <span className="line detail-year" style={{ display: 'inline-block', transform: 'translateY(100%)', opacity: 0 }}>/2025</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs; 