import React from 'react'
import './Section.css'
import '../../src/App.css'
import './Navbar.css'

function Section() {
  return (
    <>
    <div className='cont'>
        
          <video src="/video/video.mp4" autoPlay loop muted/>
        
          <div className='text'>
          
              <h1>WELCOME!</h1>
              <p>“Simple ingredients prepared in a simple way –  that’s the best way to take your everyday cooking to a higher level.”
              <p className='writerstyle'>  — Jose Andres </p> </p>
          </div>
       
    </div>
    
    
    </>
  );
}

export default Section;