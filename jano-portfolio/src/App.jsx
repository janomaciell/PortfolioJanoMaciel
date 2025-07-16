import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import './App.css';
import SlideYouCan from '../components/SlideYouCan';
import Footer from '../components/Footer';
import Jobs from '../components/Jobs';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <SlideYouCan />
      <Skills />
      <Jobs />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;