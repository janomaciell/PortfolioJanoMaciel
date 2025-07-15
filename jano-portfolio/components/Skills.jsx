import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);

  const skills = [
    { name: "Django Rest Framework", level: 90 },
    { name: "React JS", level: 85 },
    { name: "Python", level: 88 },
    { name: "SQL", level: 82 },
    { name: "JavaScript", level: 85 },
    { name: "API Development", level: 90 },
    { name: "Data Analysis", level: 80 },
    { name: "Payment Integration", level: 85 }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const skillBars = skillsRef.current.querySelectorAll('.skill-bar-fill');

    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );

    skillBars.forEach((bar, index) => {
      gsap.fromTo(bar,
        { width: 0 },
        {
          width: `${skills[index].level}%`,
          duration: 1.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          }
        }
      );
    });
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2>Habilidades</h2>
        <div className="skills-grid" ref={skillsRef}>
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-bar-fill"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;