import React from 'react';
import { MapPin, Eye } from 'lucide-react';
import { Button } from './ui/button';

const FarmMapSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Карта фермы ЛуЛу
          </h2>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
            <Eye className="h-5 w-5 mr-2" />
            Показать 3D-тур
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Farm Map */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 shadow-lg">
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                {/* Farm boundaries */}
                <rect x="20" y="20" width="360" height="260" fill="#e5f3e5" stroke="#4ade80" strokeWidth="2" rx="10"/>
                
                {/* Buildings */}
                <rect x="60" y="60" width="80" height="60" fill="#8b4513" rx="5"/>
                <text x="100" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Кафе</text>
                
                <rect x="260" y="80" width="70" height="50" fill="#d97706" rx="5"/>
                <text x="295" y="110" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Сувениры</text>
                
                {/* Animal areas */}
                <ellipse cx="120" cy="180" rx="40" ry="25" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2"/>
                <text x="120" y="185" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Альпаки</text>
                
                <ellipse cx="280" cy="160" rx="35" ry="20" fill="#fde68a" stroke="#f59e0b" strokeWidth="2"/>
                <text x="280" y="165" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Ламы</text>
                
                <ellipse cx="180" cy="220" rx="30" ry="18" fill="#fed7d7" stroke="#ef4444" strokeWidth="2"/>
                <text x="180" y="225" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">Лошади</text>
                
                {/* Paths */}
                <path d="M100 120 Q150 140 200 120 T280 140" stroke="#6b7280" strokeWidth="4" fill="none" strokeDasharray="5,5"/>
                
                {/* Trees */}
                <circle cx="80" cy="40" r="8" fill="#22c55e"/>
                <circle cx="320" cy="50" r="8" fill="#22c55e"/>
                <circle cx="50" cy="200" r="8" fill="#22c55e"/>
                <circle cx="350" cy="200" r="8" fill="#22c55e"/>
              </svg>
            </div>

            {/* 3D Tour Button */}
            <div className="mt-6">
              <div className="relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
                  alt="3D Tour Preview" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="text-center text-white">
                    <Eye className="h-12 w-12 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-semibold">Нажми чтобы</p>
                    <p className="font-semibold">посмотреть 3D-тур</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Как нас найти?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">ул. Свободы, 28, д. Космакова</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-orange-500">📧</span>
                  <a 
                    href="mailto:info@alpaca-lulu.ru" 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    info@alpaca-lulu.ru
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-orange-100 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <p className="text-orange-800 font-semibold">
                Предварительная запись обязательна!
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Забронировать
            </Button>

            {/* Interactive Map */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-orange-500" />
                <p className="font-semibold">Интерактивная карта</p>
                <p className="text-sm">Нажмите, чтобы разблокировать карту</p>
                <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                  Открыть в Яндекс Картах
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmMapSection;