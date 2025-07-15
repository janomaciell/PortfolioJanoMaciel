import React, { useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/Projects.css'; // Asegúrate de tener los estilos

const compositions = [
  { className: 'composition--3', title: 'Composition III' },
  { className: 'composition--c', title: 'Composition C' },
  { className: 'composition--2', title: 'Composition II' },
];

const Proyects = () => {
  const frameRefs = useRef([]);

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

  return (
    <>
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
