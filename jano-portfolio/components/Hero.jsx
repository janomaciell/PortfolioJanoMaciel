import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Hero.css';

gsap.registerPlugin(Flip, ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const curLayout = useRef(0);
  const layouts = ["final", "plain", "columns", "grid"];
  const delayedCallRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const timelineRef = useRef(null);

  // Función para limpiar todas las animaciones
  const cleanupAnimations = useCallback(() => {
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
      delayedCallRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const nextState = useCallback(() => {
    // Evitar ejecutar si ya se está animando
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    
    const container = containerRef.current;
    if (!container) return;

    // Obtener el estado actual con mejor configuración
    const state = Flip.getState(".letter, .for, .gsap", {
      props: "color,backgroundColor",
      simple: true
    });

    // Cambiar layout
    container.classList.remove(layouts[curLayout.current]);
    curLayout.current = (curLayout.current + 1) % layouts.length;
    container.classList.add(layouts[curLayout.current]);

    // Crear la animación Flip con mejor configuración
    const flipAnimation = Flip.from(state, {
      absolute: true,
      stagger: 0.07,
      duration: 0.7,
      ease: "power2.inOut",
      spin: curLayout.current === 0,
      simple: true,
      onEnter: (elements, animation) => {
        gsap.fromTo(elements, 
          { opacity: 0, scale: 0.8 }, 
          { 
            opacity: 1, 
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
            delay: animation.duration() - 0.1 
          }
        );
      },
      onLeave: elements => {
        gsap.to(elements, { 
          opacity: 0, 
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in"
        });
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        
        // Programar siguiente animación
        const delay = curLayout.current === 0 ? 3.5 : 1.5;
        delayedCallRef.current = gsap.delayedCall(delay, nextState);
      }
    });

    // Guardar referencia para poder limpiar
    timelineRef.current = flipAnimation;
  }, [layouts]);

  useEffect(() => {
    const container = containerRef.current;
    const heroContent = heroContentRef.current;

    if (!container || !heroContent) return;

    // Configurar animación inicial con mejor performance
    gsap.set(".letter, .for, .gsap", {
      willChange: "transform, opacity",

      backfaceVisibility: "hidden",
      position: "relative"

    });

    // Iniciar la secuencia de animaciones
    delayedCallRef.current = gsap.delayedCall(1, nextState);

    // Animación de scroll optimizada
    const scrollTrigger = ScrollTrigger.create({
      trigger: heroContent,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.fromTo(
          heroContent,
          { 
            opacity: 0, 
            y: 50,
            willChange: "transform, opacity"
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            clearProps: "willChange"
          }
        );
      },
      onLeave: () => {
        gsap.to(heroContent, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(heroContent, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(heroContent, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });

    // Cleanup function
    return () => {
      isAnimatingRef.current = false;
      cleanupAnimations();
      scrollTrigger.kill();
      
      // Limpiar propiedades CSS
      gsap.set(".letter, .for, .gsap", {
        clearProps: "all"
      });
    };
  }, [nextState, cleanupAnimations]);

  return (
    <section className="hero-section">
      <div className="hero-animation">
        <div className="container final" ref={containerRef}>
          <div className="letter F">J</div>
          <div className="letter l">A</div>
          <div className="letter i">N</div>
          <div className="letter p">O</div>
          <div className="for">DIGITAL</div>
          <div className="gsap">DEVELOPER</div>
        </div>

      </div>

      <div className="hero-content" ref={heroContentRef}>
        </div>
    </section>
  );
};

export default Hero;