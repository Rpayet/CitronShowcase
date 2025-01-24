import { useEffect, useRef } from "react";
import lemonifylogoset from "../../assets/images/statics/brand/lemonify_logoset.png";

export default function BgGenerator() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Dimensions du canvas (HD 4K)
    canvas.width = 3840;
    canvas.height = 3840;

    // Charger l'image source
    const image = new Image();
    image.src = lemonifylogoset;

    image.onload = () => {
      // Taille d'une icône dans le sprite
      const iconWidth = 256;
      const iconHeight = 256;

      // Décalage entre les motifs
      const offsetX = 256; // Décalage horizontal
      const offsetY = 128; // Décalage vertical

      // Fonction pour dessiner une rangée décalée
      const drawPattern = () => {
        for (let y = 0; y < canvas.height; y += iconHeight + offsetY) {
          for (let x = 0; x < canvas.width; x += iconWidth + offsetX) {
            // Si la rangée est impaire, décaler le motif horizontalement
            const offset = (y / (iconHeight + offsetY)) % 2 === 1 ? (iconWidth + offsetX) / 2 : 0;

            ctx.drawImage(
              image,
              0, // Coordonnées x de l'icône dans le sprite
              0, // Coordonnées y de l'icône dans le sprite
              iconWidth,
              iconHeight,
              x + offset, // Position x sur le canvas
              y, // Position y sur le canvas
              iconWidth,
              iconHeight
            );
          }
        }
      };

      // Dessiner le motif initial
      drawPattern();

      // Animation de translation
      let startTime = performance.now();
      const duration = 5000; // 30 secondes en millisecondes

      function animateTranslate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Interpolation linéaire 
        const translateX = progress * 1886;
        const translateY = progress * 989;

        canvas.style.translate = `-${translateX}px ${translateY}px`;

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateTranslate);
        } else if (progress === 1) {
          startTime = performance.now();
          animationRef.current = requestAnimationFrame(animateTranslate);
        }
      }

      animationRef.current = requestAnimationFrame(animateTranslate);
    };

    // Nettoyer l'animation au démontage du composant
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        bottom: "-256px",
        left: "0",
        opacity: ".1",
        transform: "rotate(5deg)",
        zIndex: "0",
      }}
    ></canvas>
  );
}
