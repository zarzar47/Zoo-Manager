import React from "react";
import "./FloatingIcons.css"; // CSS for animations


const iconImages = [
    {path: '/images/aligator.png', position: [10, 10]},
    {path: '/images/girraffe.png', position: [5, 45]},
    {path: '/images/hippo.png', position: [55, 20]},
    {path: '/images/tigericon.png', position: [70, 60]},
    {path: '/images/monkey.png', position: [40, 80]},
];

  function FloatingIcons() {
    return (
      <div className="floating-icons">
        {iconImages.map((sets, index) => (
          <img
            key={index}
            src={sets.path}
            alt={`icon-${index}`}
            className="icon"
            style={{
                top : `${sets.position[0]}vh`,
                left : `${sets.position[1]}vw`,
                animationDuration: `${Math.random() * 4 + 4}s`, // Randomize the float duration
                animationDelay: `${Math.random() * 2}s`, // Random delay for starting the animation
            }
            }
          />
        ))}
      </div>
    );
  }
  

export default FloatingIcons;
