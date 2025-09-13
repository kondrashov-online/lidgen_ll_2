import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { siteInfo, navigationMenu } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 rounded-lg p-2">
                <span className="text-white font-bold text-xl">LULU</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{siteInfo.name}</h3>
                <p className="text-gray-400 text-sm">{siteInfo.location}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {siteInfo.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Навигация</h4>
            <ul className="space-y-2">
              {navigationMenu.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Услуги</h4>
            <ul className="space-y-2">
              {navigationMenu.find(item => item.id === 7)?.dropdownItems.slice(0, 5).map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{siteInfo.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a 
                  href={`tel:${siteInfo.phone}`} 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {siteInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a 
                  href={`mailto:${siteInfo.email}`} 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {siteInfo.email}
                </a>
              </div>
            </div>
            
            <div className="bg-orange-600 bg-opacity-20 border border-orange-500 rounded-lg p-3 mt-4">
              <p className="text-orange-200 text-xs font-medium">
                Предварительная запись обязательна!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Ферма ЛуЛу. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Пользовательское соглашение
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Notice */}
      <div className="bg-orange-600 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-sm">
              Этот сайт использует cookie для хранения данных. Продолжая использовать этот сайт, 
              Вы даете согласие на работу с этими файлами.
            </p>
            <button className="bg-white text-orange-600 px-4 py-1 rounded text-sm font-medium hover:bg-orange-50 transition-colors">
              Я даю свое согласие
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;