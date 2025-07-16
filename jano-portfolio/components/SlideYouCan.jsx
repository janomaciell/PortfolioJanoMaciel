import React, { useEffect, useState } from 'react';
import '../styles/SlideYouCan.css';

const SlideYouCan = () => {
  const [config, setConfig] = useState({
    theme: 'system',
    animate: true,
    debug: false,
    hue: 280,
    start: 50,
    space: 50,
  });

  const updateStyles = () => {
    document.documentElement.dataset.theme = config.theme;
    document.documentElement.dataset.animate = config.animate;
    document.documentElement.dataset.debug = config.debug;
    document.documentElement.style.setProperty('--hue', config.hue);
    document.documentElement.style.setProperty('--start', `${config.start}vh`);
    document.documentElement.style.setProperty('--space', `${config.space}vh`);
  };

  useEffect(() => {
    updateStyles();
  }, [config]);

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="slide-you-can">
      {/* Control Panel */}

      {/* Main Content */}
      <header className="content fluid" style={{ '--count': 10 }}>
        <section className="content-slide">
          <h1>
            <span aria-hidden="true">puedo&nbsp;</span>
            <span className="sr-only">puedo crear soluciones digitales completas y marcas memorables.</span>
          </h1>
          <ul aria-hidden="true">
            <li style={{ '--i': 0 }}>Desarrollar aplicaciones web.</li>
            <li style={{ '--i': 1 }}>Crear APIs y automatizaciones a medida.</li>
            <li style={{ '--i': 2 }}>Diseñar bases de datos eficientes.</li>
            <li style={{ '--i': 3 }}>Integrar sistemas y plataformas.</li>
            <li style={{ '--i': 4 }}>Optimizar SEO, SEM y analítica.</li>
            <li style={{ '--i': 5 }}>Escalar infraestructura en la nube.</li>
            <li style={{ '--i': 6 }}>Crear identidades de marca sólidas.</li>
            <li style={{ '--i': 7 }}>Desarrollar branding estratégico.</li>
            <li style={{ '--i': 8 }}>Diseñar experiencias visuales.</li>
            <li style={{ '--i': 9 }}>Fusionar creatividad y código para tu negocio.</li>
          </ul>
        </section>
      </header>
      
      <main>
        <section>
          <p className="fluid" style={{ fontSize: '30px' }}>
            Combino programación avanzada con branding y diseño estratégico.<br />
            <a>Potenciá tu marca y tu tecnología conmigo</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default SlideYouCan;