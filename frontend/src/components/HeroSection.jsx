import React from 'react';
import { Star, Clock, Users, Heart } from 'lucide-react';
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

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-50 overflow-hidden min-h-screen">
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

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content - Main Hero */}
          <div className="relative z-10 space-y-8">
            {loading ? (
              <div className="space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600">Загружаем информацию о ферме...</p>
              </div>
            ) : (
              <>
                {/* Badge */}
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  Лучшая ферма 2024 года
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {displayInfo.name}
                    <br />
                    <span className="text-orange-500">{displayInfo.location}</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 font-medium">{displayInfo.distance}</p>
                </div>

                {/* УТП (Уникальное торговое предложение) */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-2xl">
                  <h2 className="text-3xl font-bold mb-4">
                    Единственная альпака-ферма в регионе!
                  </h2>
                  <p className="text-xl mb-6 text-orange-100">
                    {displayInfo.description}
                  </p>
                  
                  {/* Преимущества */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-orange-200" />
                      <span className="font-semibold">Работаем круглый год</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-6 w-6 text-orange-200" />
                      <span className="font-semibold">Для всей семьи</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="h-6 w-6 text-orange-200" />
                      <span className="font-semibold">Любовь к животным</span>
                    </div>
                  </div>

                  {/* Главная кнопка действия */}
                  <Button 
                    size="lg" 
                    onClick={scrollToBooking}
                    className="bg-white text-orange-600 hover:bg-orange-50 px-10 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    ЗАПИСАТЬСЯ НА ЭКСКУРСИЮ
                  </Button>
                </div>

                {/* Дополнительная информация */}
                <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Что вас ждёт на ферме:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Знакомство с альпаками и ламами
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Кормление и общение с животными
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Фотосессия с пушистыми друзьями
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Домашняя кухня и натуральные продукты
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Right Content - Hero Banner Image */}
          <div className="relative z-10">
            <div className="relative">
              {/* Main Hero Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
                  alt="Альпаки на ферме ЛуЛу" 
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                {/* Overlay с информацией */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Встречайте наших друзей!</h3>
                    <p className="text-lg">Более 20 альпак ждут вашего визита</p>
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border-4 border-orange-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">5.0</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">200+ отзывов</div>
                </div>
              </div>

              {/* Additional floating image */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
                  alt="Белая альпака"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-yellow-200 text-yellow-800 px-6 py-3 rounded-full text-lg font-semibold mb-6">
            🎉 Специальное предложение: семейный билет со скидкой 20%!
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Забронируйте экскурсию прямо сейчас и получите незабываемые впечатления для всей семьи!
          </p>
          <Button 
            size="lg"
            onClick={scrollToBooking}
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            ЗАБРОНИРОВАТЬ СО СКИДКОЙ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;