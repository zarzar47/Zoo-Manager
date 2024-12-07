import React, { useEffect, useState } from "react";
import "./FloatingIcons.css"; // CSS for animations

const iconImages = [
  { path: "/images/aligator.png", basePosition: [10, 10] },
  { path: "/images/girraffe.png", basePosition: [5, 45] },
  { path: "/images/hippo.png", basePosition: [55, 20] },
  { path: "/images/tigericon.png", basePosition: [70, 60] },
  { path: "/images/monkey.png", basePosition: [40, 80] },
];

function FloatingIcons() {
  const [scaledPositions, setScaledPositions] = useState([]);

  const adjustIconPositions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Scale the positions dynamically based on screen size
    const newPositions = iconImages.map((icon) => {
      const scaleFactor = screenWidth < 768 ? 0.8 : screenWidth < 1200 ? 0.8 : 1; // Smaller on smaller screens
      return {
        ...icon,
        position: [
          icon.basePosition[0] * scaleFactor,
          icon.basePosition[1] * scaleFactor,
        ],
        scale: scaleFactor,
      };
    });
    setScaledPositions(newPositions);
  };

  useEffect(() => {
    adjustIconPositions(); // Set initial positions
    window.addEventListener("resize", adjustIconPositions); // Update on screen resize

    return () => {
      window.removeEventListener("resize", adjustIconPositions); // Cleanup listener
    };
  }, []);

  return (
    <div className="floating-icons">
      {scaledPositions.map((icon, index) => (
        <img
          key={index}
          src={icon.path}
          alt={`icon-${index}`}
          className="icon"
          style={{
            top: `${icon.position[0]}vh`,
            left: `${icon.position[1]}vw`,
            transform: `scale(${icon.scale})`,
            animationDuration: `${Math.random() * 4 + 4}s`, // Randomize float duration
            animationDelay: `${Math.random() * 2}s`, // Random delay for starting animation
          }}
        />
      ))}
    </div>
  );
}

export default FloatingIcons;
