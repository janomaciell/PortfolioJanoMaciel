import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import "../styles/About.css";

const About = () => {
    useEffect(() => {
      const handleScroll = () => {
        const textDivs = document.querySelectorAll(".textDiv");
        const viewportHeight = window.innerHeight;
        const quarterHeight = viewportHeight / 4;
  
        textDivs.forEach((div) => {
          const rect = div.getBoundingClientRect();
          const divCenterY = rect.top + rect.height / 2;
  
          let opacity;
          let weight;
          let size;
  
          if (divCenterY < quarterHeight) {
            opacity = divCenterY / quarterHeight;
          } else if (divCenterY > viewportHeight - quarterHeight) {
            opacity = (viewportHeight - divCenterY) / quarterHeight;
          } else {
            opacity = 1;
          }
  
          opacity = Math.max(0, Math.min(1, opacity));
          weight = opacity * 900;
          size = opacity + 3;
  
          div.style.opacity = opacity;
          div.style.fontWeight = weight;
          div.style.fontSize = size + "vw";
        });
      };
  
      window.addEventListener("scroll", handleScroll);
      handleScroll();
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return (
      <div className="wrapper">
        <div className="textDiv">Soy Jano Maciel.</div>
        <div className="textDiv">Full Stack Developer & UX/UI Specialist.</div>
        <div className="textDiv">Trabajo con tecnologías como:</div>
        <div className="textDiv">React JS, Django REST, Python, MySQL.</div>
        <br /><br />
        <div className="textDiv">Me especializo en crear plataformas eficientes,</div>
        <div className="textDiv">funcionales y escalables para negocios reales.</div>
        <div className="textDiv">Integro análisis de datos, pagos online</div>
        <div className="textDiv">y sistemas conectados a necesidades concretas.</div>
        <br /><br />
        <div className="textDiv">Además, mi fuerte es la Identidad de Marca</div>
        <div className="textDiv">y el Branding estratégico aplicado a negocios.</div>
        <div className="textDiv">Ayudo a marcas a encontrar su voz, su estilo,</div>
        <div className="textDiv">y a mostrarse de manera profesional y coherente.</div>
        <br /><br />
        <div className="textDiv">Creo en los detalles, en el diseño con propósito,</div>
        <div className="textDiv">y en que cada marca tiene algo único para contar.</div>
        <br /><br />
        <div className="textDiv">— Jano Maciel</div>
      </div>
    );
  };
  
  export default About;