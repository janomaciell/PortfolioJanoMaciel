import React, { useEffect, useRef } from 'react';
import '../styles/Skills.css'; // Crea este archivo para los estilos

const languages = [
  {
    name: "JavaScript",
    icon: "https://simpleicons.org/icons/javascript.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    name: "Python",
    icon: "https://simpleicons.org/icons/python.svg",
    link: "https://www.python.org/"
  },
  {
    name: "MySql",
    icon: "https://simpleicons.org/icons/mysql.svg",
    link: "https://www.mysql.com/"
  },
  {
    name: "GitHub",
    icon: "https://simpleicons.org/icons/github.svg",
    link: "https://github.com/"
  },
  {
    name: "Css",
    icon: "https://simpleicons.org/icons/css.svg",
    link: "https://developer.mozilla.org/es/docs/Web/CSS"
  },
  {
    name: "Django",
    icon: "https://simpleicons.org/icons/django.svg",
    link: "https://www.djangoproject.com/"
  },
  {
    name: "Kotlin",
    icon: "https://simpleicons.org/icons/kotlin.svg",
    link: "https://kotlinlang.org/"
  },
  {
    name: "TypeScript",
    icon: "https://simpleicons.org/icons/typescript.svg",
    link: "https://www.typescriptlang.org/docs/"
  },
  {
    name: "Html5",
    icon: "https://simpleicons.org/icons/html5.svg",
    link: "https://developer.mozilla.org/es/docs/Glossary/HTML5"
  }
];

const carouselDuplicates = 3;

const Skills = () => {
  const carouselRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselContent = contentRef.current;
    let carouselHasMouse = false;
    let carouselTouches = 0;
    let lastMouseX = null;
    let lastTouchX = null;
    let scrollDelta = 0;
    let lastTimestamp = 0;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function getTouchMidpoint(touches) {
      let midpoint = {
        x: touches[0].clientX,
        y: touches[0].clientY
      };
      for (let i = 1; i < touches.length; i++) {
        midpoint.x = lerp(midpoint.x, touches[i].clientX, 0.5);
        midpoint.y = lerp(midpoint.y, touches[i].clientY, 0.5);
      }
      return midpoint;
    }

    const handleTouchRemove = (event) => {
      carouselTouches -= event.changedTouches.length;
      if (carouselTouches <= 0 && !carouselHasMouse) {
        lastTouchX = null;
      }
    };

    const updateScroll = (timestamp) => {
      carousel.scrollBy({ left: scrollDelta });
      if (carouselHasMouse || carouselTouches > 0) {
        scrollDelta = 0;
      } else {
        scrollDelta = lerp(scrollDelta, 0, 0.045);
      }
      lastTimestamp = timestamp;
      requestAnimationFrame(updateScroll);
    };

    carousel.addEventListener("mousedown", () => { carouselHasMouse = true; });
    window.addEventListener("mouseup", () => { carouselHasMouse = false; lastMouseX = null; });
    window.addEventListener("mousemove", (event) => {
      if (carouselHasMouse) {
        if (lastMouseX !== null) {
          scrollDelta = lastMouseX - event.x;
        }
        lastMouseX = event.x;
      }
    });

    carousel.addEventListener("wheel", (event) => {
      if (event.shiftKey) {
        event.preventDefault();
        scrollDelta += event.deltaY * 0.1;
      }
    });

    carousel.addEventListener("touchstart", (event) => {
      if (lastTouchX === null) {
        lastTouchX = getTouchMidpoint(event.touches).x;
      }
      carouselTouches += event.changedTouches.length;
    });

    window.addEventListener("touchmove", (event) => {
      if (lastTouchX !== null) {
        const touchMidpoint = getTouchMidpoint(event.touches);
        scrollDelta = -(touchMidpoint.x - lastTouchX);
        lastTouchX = touchMidpoint.x;
      }
    });

    window.addEventListener("touchend", handleTouchRemove);
    window.addEventListener("touchcancel", handleTouchRemove);

    carousel.addEventListener("scroll", () => {
      const carouselRect = carouselContent.getBoundingClientRect();
      if (carouselRect.left > window.innerWidth) {
        carousel.scrollLeft += carouselRect.width;
      } else if (carouselRect.right < 0) {
        carousel.scrollLeft -= carouselRect.width;
      }
    });

    // Duplicar el contenido para el efecto infinito
    for (let i = 0; i < carouselDuplicates; i++) {
      const duplicate = carouselContent.cloneNode(true);
      duplicate.ariaHidden = true;
      duplicate.querySelectorAll("a").forEach((el) => { el.tabIndex = "-1"; });
      carousel.prepend(duplicate);
      carousel.append(duplicate.cloneNode(true));
    }

    carousel.scrollLeft += carouselContent.offsetWidth * carouselDuplicates;
    requestAnimationFrame(updateScroll);

    // Limpieza de listeners al desmontar
    return () => {
      // Aquí podrías remover los event listeners si lo deseas
    };
  }, []);

  return (
    <div>
      <h1>Programming Languages</h1>
      <div className="carousel" ref={carouselRef}>
        <div className="carousel-content" ref={contentRef}>
          {languages.map((lang, idx) => (
            <div className="card" key={idx}>
              <img className="icon" src={lang.icon} alt={lang.name} />
              <p>{lang.name}</p>
              <p>
                <a href={lang.link} target="_blank" rel="noopener noreferrer">
                  Más info ➞
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;