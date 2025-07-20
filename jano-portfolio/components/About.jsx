import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import '../styles/About.css'; // Asegúrate de que tengas tus estilos

gsap.registerPlugin(SplitText);

const AnimateText = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.2, onComplete: () => {
        gsap.from('.about-title-about', {
          y: -80,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        });

        const split = SplitText.create(containerRef.current.querySelector('.animate-me'), {
          type: 'words',
          aria: 'hidden',
        });
        gsap.from(split.words, {
          opacity: 0,
          duration: 2,
          ease: 'sine.out',
          stagger: 0.1,
        });
      }});
    });
  }, []);

  return (
    <div className="container-about" ref={containerRef}>
      <h1 className="about-title-about">¿Quién soy?</h1>
      <div className="animate-me" aria-hidden="true">
        Soy Jano Maciel.<br />
        Full Stack Developer & UX/UI Specialist.<br />
        Trabajo con tecnologías como:<br />
        React JS, Django REST, Python, MySQL.<br /><br />
        Me especializo en crear plataformas eficientes,<br />
        funcionales y escalables para negocios reales.<br />
        Integro análisis de datos, pagos online<br />
        y sistemas conectados a necesidades concretas.<br /><br />
        Además, mi fuerte es la Identidad de Marca<br />
        y el Branding estratégico aplicado a negocios.<br />
        Ayudo a marcas a encontrar su voz, su estilo,<br />
        y a mostrarse de manera profesional y coherente.<br /><br />
        Creo en los detalles, en el diseño con propósito,<br />
        y en que cada marca tiene algo único para contar.<br /><br />
        — Jano Maciel
      </div>
      <p className="sr-only">
        Soy Jano Maciel. Full Stack Developer & UX/UI Specialist. Trabajo con tecnologías como: React JS, Django REST, Python, MySQL. Me especializo en crear plataformas eficientes, funcionales y escalables para negocios reales. Integro análisis de datos, pagos online y sistemas conectados a necesidades concretas. Además, mi fuerte es la Identidad de Marca y el Branding estratégico aplicado a negocios. Ayudo a marcas a encontrar su voz, su estilo, y a mostrarse de manera profesional y coherente. Creo en los detalles, en el diseño con propósito, y en que cada marca tiene algo único para contar. — Jano Maciel
      </p>
    </div>
  );
};

export default AnimateText;
