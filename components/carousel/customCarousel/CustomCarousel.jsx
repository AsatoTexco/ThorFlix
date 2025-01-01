import React, { useEffect, useRef } from 'react'
import './CustomCarousel.css'



function CustomCarousel(props) {
    const slider = useRef(null);
    let isDown = useRef(false);
    let startX = useRef(null);
    let scrollLeft = useRef(null);
  
    useEffect(() => {
         
      if (slider && slider.current) {
        let sliderRef = slider.current;
        sliderRef.addEventListener("mousedown", one); 
        sliderRef.addEventListener("mouseleave", three);
        sliderRef.addEventListener("mouseup", four);
        sliderRef.addEventListener("mousemove", five);
  
        return () => {
          sliderRef.removeEventListener("mousedown", one); 
          sliderRef.removeEventListener("mouseleave", three);
          sliderRef.removeEventListener("mouseup", four);
          sliderRef.removeEventListener("mousemove", five);
        };
      }

    }, []);
  
    function one(e) {  
      isDown.current = true;
      startX.current = e.pageX - slider.current.offsetLeft;
      scrollLeft.current = slider.current.scrollLeft;
    }
    
    function three() { 

      isDown.current = false;
    }
  
    function four() { 
      isDown.current = false;
    }
  
    function five(e) {
      
      if (!isDown.current) return;
      e.preventDefault(); 

      const x = e.pageX - slider.current.offsetLeft; 
      const walk = x - startX.current;
      slider.current.scrollLeft = scrollLeft.current - walk;
    }
  
    return (
      <div className="items" ref={slider}>
        {props.children}
      </div>
    );
}

export default CustomCarousel