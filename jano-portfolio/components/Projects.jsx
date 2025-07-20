import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import '../styles/Projects.css';
import SplitWords from './ScrollingText'; // Ajusta la ruta si es necesario



// Registrar plugins de GSAP
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const compositions = [
  { className: 'composition--3', title: 'Arte III' },
  { className: 'composition--c', title: 'Arte C' },
  { className: 'composition--2', title: 'Arte II' },
];

const Proyects = () => {
  const frameRefs = useRef([]);
  const scrambleTextRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const h1Ref = useRef(null);
  const quotesRef = useRef([]);
  const [isDecoded, setIsDecoded] = useState(false);

  const message = 'Cuida tus datos.';
  const scrambleChars = 'upperAndLowerCase';

  // Función para obtener posición aleatoria
  const getRandomPosition = () => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    return { x, y };
  };

  // Función para animar quotes con scramble
  const scrambleQuote = (quote, text) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.call(() => {
      const { x, y } = getRandomPosition();
      gsap.set(quote, { x, y });
    })
      .to(quote, {
        delay: Math.random() * 5,
        duration: 1,
        opacity: 1,
        scrambleText: { text, chars: scrambleChars, revealDelay: 0.5, speed: 1 },
        ease: 'power2.out',
      })
      .to(quote, {
        delay: 0.5,
        duration: 1,
        scrambleText: { text: '', chars: scrambleChars },
        opacity: 0,
        ease: 'power2.in',
      });
  };

  // Función para toggle del scramble
  const toggleScramble = () => {
    const text = isDecoded ? '*&@#$#@#$@*&$(@#^)' : message;
    const duration = isDecoded ? 1 : 1.5;
    const speed = isDecoded ? 0.3 : 1;

    gsap.to(scrambleTextRef.current, {
      duration,
      scrambleText: {
        text,
        chars: scrambleChars,
        revealDelay: isDecoded ? 0 : 0.5,
        speed,
      },
    });

    if (toggleBtnRef.current) {
      toggleBtnRef.current.textContent = isDecoded ? 'Encriptar' : 'Desencriptar';
    }
    setIsDecoded(!isDecoded);
  };

  // Efectos de mouse para las composiciones Mondrian
  const handleMouseMove = (index, e) => {
    const frame = frameRefs.current[index];
    const rect = frame.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    const xOffset = left - rect.width / 2;
    const yOffset = top - rect.height / 2;
    const xPerc = (xOffset / rect.width) * 200;
    const yPerc = (yOffset / rect.height) * 200;

    gsap.to(frame, {
      duration: 2,
      rotationX: 0.3 * yPerc,
      rotationY: -0.3 * xPerc,
      transformOrigin: "center center -30",
      ease: "expo.out"
    });

    gsap.to(frame.querySelector('.frame-grad'), {
      duration: 2,
      opacity: top / rect.height,
      ease: "expo.out"
    });

    gsap.to(frame.querySelector('.frame-shad'), {
      duration: 2,
      opacity: 0.15 - top / rect.height / 2,
      ease: "expo.out"
    });
  };

  const handleMouseLeave = (index) => {
    const frame = frameRefs.current[index];
    gsap.to(frame, {
      duration: 2,
      rotationX: 0,
      rotationY: 0,
      transformOrigin: "center center -20",
      ease: "expo.out"
    });
    gsap.to(frame.querySelector('.frame-grad'), {
      duration: 2,
      opacity: 0.5,
      ease: "expo.out"
    });
    gsap.to(frame.querySelector('.frame-shad'), {
      duration: 2,
      opacity: 0,
      ease: "expo.out"
    });
  };

  // useEffect para inicializar las animaciones
  useEffect(() => {
    // Inicializar scramble text
    if (scrambleTextRef.current) {
      gsap.set(scrambleTextRef.current, {
        scrambleText: {
          text: '*&@#$#@#$@*&$(@#^)',
          chars: scrambleChars,
          speed: 0.3,
        },
      });
    }

    // Inicializar quotes
    quotesRef.current.forEach((quote) => {
      if (quote) {
        gsap.set(quote, {
          position: 'absolute',
          opacity: 0,
          whiteSpace: 'nowrap',
        });
        scrambleQuote(quote, quote.textContent || '');
      }
    });

    // Animar H1
    if (h1Ref.current) {
      const split = SplitText.create(h1Ref.current, { type: 'words, lines' });
      gsap.from(split.words, {
        x: 'random([-1000, 1000])',
        y: 'random([-1000, 1000])',
        opacity: 0,
        ease: 'expo.inOut',
        duration: 1.25,
      });
    }
  }, []);

  const quotes = [
    'La imaginación es poder',
    'El código es arte',
    'La creatividad requiere valor',
    'El diseño es inteligencia visible',
    'Cada píxel tiene un propósito',
    'La simplicidad es la máxima sofisticación',
    'La imaginación es poder',
    'El código es arte',
    'La creatividad requiere valor',
    'El diseño es inteligencia visible',
    'Cada píxel tiene un propósito'
  ];

  return (
    <>
    <SplitWords text="SEGURIDAD" />
      {/* Nueva sección con scramble text */}
      <section className="scramble-section">
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          className="scramble-logo"
        >


        </a>
        <div className="scramble-content">
          <h1 ref={h1Ref} className="scramble-headline">
            Seguridad Plena en tus datos
          </h1>
          <div className="scramble-box">
            <span ref={scrambleTextRef} className="scramble-text">
              *&@#$#@#$@*&$(@#^)
            </span>
            <button
              ref={toggleBtnRef}
              type="button"
              className="scramble-btn"
              onClick={toggleScramble}
            >
              {isDecoded ? 'Encriptar' : 'Desencriptar'}
            </button>
          </div>
        </div>
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="quote"
            ref={el => quotesRef.current[index] = el}
          >
            {quote}
          </div>
        ))}
      </section>
      <SplitWords text="ARTE" />


      {/* Bloque de composiciones Mondrian */}
      <div className="containers">
        <div className="compositions">
          {compositions.map((comp, idx) => (
            <div className={`composition ${comp.className}`} key={comp.className}>
              <div
                className="frame"
                ref={el => frameRefs.current[idx] = el}
                onMouseMove={e => handleMouseMove(idx, e)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <div className="frame__face frame__face--front">
                  {[...Array(9)].map((_, i) => (
                    <div className={`cell cell${i + 1}`} key={i}></div>
                  ))}
                  <div className="frame-grad"></div>
                  <div className="frame-shad"></div>
                </div>
                <div className="frame__face frame__face--back"></div>
                <div className="frame__face frame__face--left"></div>
                <div className="frame__face frame__face--right"></div>
                <div className="frame__face frame__face--top"></div>
                <div className="frame__face frame__face--bottom"></div>
              </div>
              <p className="composition__title">{comp.title}</p>
            </div>
          ))}
        </div>
      </div>
      <SplitWords text="TECNOLOGIA" />
      {/* Bloque MacBook Pro */}
      <div className="tilt-wrapper">
        <div className="hero">
          <div className="label">MacBook Pro</div>
          <div className="glow-text" data-text="Built for Apple Intelligence.">
            Built for Apple Intelligence.
          </div>
        </div>
      </div>
    </>
  );
};

export default Proyects;