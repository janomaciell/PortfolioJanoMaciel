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
      <header className="content fluid" style={{ '--count': 7 }}>
        <section className="content">
          <h1>
            <span aria-hidden="true">you can&nbsp;</span>
            <span className="sr-only">you can ship things.</span>
          </h1>
          <ul aria-hidden="true">
            <li style={{ '--i': 0 }}>design.</li>
            <li style={{ '--i': 1 }}>prototype.</li>
            <li style={{ '--i': 2 }}>solve.</li>
            <li style={{ '--i': 3 }}>build.</li>
            <li style={{ '--i': 4 }}>develop.</li>
            <li style={{ '--i': 5 }}>cook.</li>
            <li style={{ '--i': 6 }}>ship.</li>
          </ul>
        </section>
      </header>
      
      <main>
        <section>
          <p className="fluid">
            and i'll show you how.<br />
            <a href="https://craftofui.com">craftofui.dev</a>.
          </p>

        </section>
      </main>

    </div>
  );
};

export default SlideYouCan;