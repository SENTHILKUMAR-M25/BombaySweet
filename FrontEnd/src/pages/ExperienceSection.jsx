import React from "react";

const experiences = [
  {
    title: "Indian Mithai & Desserts",
    description: "The flavours you grew up with, but with a twist.",
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=500", // Replace with your mithai image
  },
  {
    title: "Bulk Gifting",
    description: "From corporate gifting to wedding favours and festive gifts, we are your one-stop gifting solution.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500", // Replace with your gifting image
  },
  {
    title: "Curated Hampers",
    description: "Explore curated gift hampers for different occasions with a varied price range.",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=500", // Replace with your hampers image
  },
  {
    title: "Our Cafés",
    description: "Visit our cafés across Mumbai for chaat, desserts and Veronica’s coffee.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=500", // Replace with your cafe image
  },
];

const ExperienceSection = () => {
  return (
    <section className="bg-[#F9F5F0] py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-12">
        {/* Title using a Serif font for that 'Bombay Sweet Shop' look */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003049] mb-3">
          The Bombay Sweet Shop Experience
        </h2>
        <p className="text-gray-700 text-lg">
          From timeless mithai to modern gifting, here’s everything we have for you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((item, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content Area */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-serif font-bold text-[#003049] mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;