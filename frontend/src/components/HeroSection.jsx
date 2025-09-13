import React from 'react';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import { useApi } from '../hooks/useApi';
import { siteInfoAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const HeroSection = () => {
  const { data: siteInfo, loading } = useApi(() => siteInfoAPI.getSiteInfo());

  // Default values while loading
  const displayInfo = siteInfo || {
    name: "Ферма ЛуЛу",
    location: "в Космакова",
    distance: "всего 30 км от Екатеринбурга",
    description: "Полезное семейное развлечение на свежем воздухе и в любую погоду"
  };

  return (
    <section className="relative bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="geometric" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon points="20,10 40,20 20,30" fill="#ef4444" opacity="0.6"/>
              <polygon points="60,15 80,25 60,35" fill="#22c55e" opacity="0.6"/>
              <polygon points="10,50 30,60 10,70" fill="#f59e0b" opacity="0.6"/>
              <polygon points="70,55 90,65 70,75" fill="#ef4444" opacity="0.6"/>
              <polygon points="35,80 55,90 35,100" fill="#22c55e" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Main Alpaca Image */}
            <div className="relative mb-8">
              <img 
                src="https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
                alt="Alpaca" 
                className="w-96 h-96 object-cover rounded-full shadow-2xl mx-auto lg:mx-0"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="mb-8">
              <p className="text-gray-600 mb-4">Смотрите видео нашей фермы</p>
              <div className="relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
                  alt="Video Preview" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                  <Play className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  <LoadingSpinner size="lg" />
                  <p className="text-gray-600">Загружаем информацию о ферме...</p>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    {displayInfo.name}
                    <br />
                    <span className="text-orange-500">{displayInfo.location}</span>
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">{displayInfo.distance}</p>
                  
                  <div className="space-y-3">
                    <p className="text-lg text-orange-600 font-semibold">
                      {displayInfo.description}
                    </p>
                
                <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Проведите у нас целый день
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    У нас много чем можно заняться: ты потрогаешь животных, погуляешь, 
                    пофоткаешься, потом вкусно поешь, классно пообщаешься, и вообще это 
                    будут лучшие выходные!
                  </p>
                </div>
              </div>

                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Забронировать
                    </Button>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;