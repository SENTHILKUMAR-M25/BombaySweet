import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "THE BIG 6th BIRTHDAY SALE",
    subtitle: "Bringing Back The Magic Of Mithai",
    discount: "FLAT 25% OFF",
    bgClass: "bg-gradient-to-r from-blue-900 to-blue-700",
    image: "/path-to-your-mithai-image.png", // The image from your upload
  },
  {
    id: 2,
    title: "HAND-MADE WITH LOVE",
    subtitle: "100% Vegetarian & No Preservatives",
    discount: "BESTSELLERS BOX",
    bgClass: "bg-gradient-to-r from-purple-800 to-indigo-900",
    image: "/path-to-another-product.png",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${slide.bgClass}`}
        >
          {/* Animated Background Decor (Stripes) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:40px_100%]"></div>

          <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center px-8 relative">
            {/* Text Content */}
            <div className="text-white space-y-6 z-20">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full font-bold text-sm animate-bounce">
                <Sparkles size={16} /> {slide.discount}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-blue-100 drop-shadow-md">
                {slide.subtitle}
              </p>
              <button className="bg-yellow-400 hover:bg-white text-black font-extrabold px-10 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl uppercase">
                Order Now
              </button>
            </div>

            {/* Image Content */}
            <div className={`relative flex justify-center items-center transition-all duration-1000 delay-300 transform ${
              index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
               <img 
                 src={slide.image} 
                 alt="Product" 
                 className="w-full max-w-[500px] object-contain drop-shadow-2xl"
               />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-yellow-400 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;