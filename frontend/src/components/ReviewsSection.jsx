import React from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/mock';

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Отзывы наших гостей
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, index) => (
                  <Star 
                    key={index} 
                    className="h-5 w-5 text-yellow-400 fill-current" 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                {review.text}
              </p>

              {/* Author Info */}
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling Reviews */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll-reviews">
            {[...reviews, ...reviews].map((review, index) => (
              <div 
                key={`scroll-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-3">
                  {[...Array(review.rating)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="h-4 w-4 text-yellow-400 fill-current" 
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3">
                  {review.text}
                </p>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for scrolling animation */}
      <style jsx>{`
        @keyframes scroll-reviews {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-reviews {
          animation: scroll-reviews 40s linear infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;