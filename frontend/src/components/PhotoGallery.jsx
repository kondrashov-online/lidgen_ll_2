import React, { useState } from 'react';
import { X } from 'lucide-react';
import { galleryImages } from '../data/mock';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Фотокарточки наших гостей
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            В пасмурные дни особенно атмосферно получаются фотографии. Чтобы убедиться сами, 
            сначала посмотрите наши видео, а затем приезжайте и испытайте всё лично
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image} 
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Scrolling Gallery (for more photos effect) */}
        <div className="mt-8 overflow-hidden">
          <div className="flex gap-4 animate-scroll">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div 
                key={`scroll-${index}`}
                className="flex-shrink-0 w-48 h-48 rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`Scroll Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage} 
                alt="Gallery Preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200"
              >
                <X className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS for scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;