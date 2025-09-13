import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useApi } from '../hooks/useApi';
import { siteInfoAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

// Static navigation menu (can be made dynamic later)
const navigationMenu = [
  { id: 1, title: "Взаимодействуй", path: "/interact", isDropdown: false },
  { id: 2, title: "Пробуй", path: "/try", isDropdown: false },
  { id: 3, title: "Двигайся", path: "/move", isDropdown: false },
  { id: 4, title: "Цены", path: "/prices", isDropdown: false },
  { id: 5, title: "О ферме", path: "/about", isDropdown: false },
  { id: 6, title: "Контакты", path: "/contacts", isDropdown: false },
  { 
    id: 7, 
    title: "Услуги", 
    path: "/services", 
    isDropdown: true,
    dropdownItems: [
      { title: "Контактный зоопарк", path: "/services/contact-zoo" },
      { title: "Зоопарк Екатеринбург", path: "/services/zoo-ekaterinburg" },
      { title: "Покормить животных", path: "/services/feed-animals" },
      { title: "Погладить животных", path: "/services/pet-animals" },
      { title: "Покормить и погладить лошадку", path: "/services/horse-care" },
      { title: "Поиграть с собачками", path: "/services/play-dogs" },
      { title: "Ресторан Сысерть", path: "/services/restaurant" }
    ]
  },
  { 
    id: 8, 
    title: "Блог", 
    path: "/blog", 
    isDropdown: true,
    dropdownItems: [
      { title: "Куда сводить ребенка в Екатеринбурге", path: "/blog/kids-ekaterinburg" },
      { title: "Куда съездить с ребенком в Свердловской области", path: "/blog/kids-sverdlovsk" }
    ]
  }
];

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (menuId) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  return (
    <header className="bg-gradient-to-r from-orange-400 to-orange-500 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-lg p-2">
              <span className="text-orange-500 font-bold text-xl">LULU</span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationMenu.slice(0, 6).map((item) => (
              <div key={item.id} className="relative">
                {item.isDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.id)}
                      className="flex items-center text-white hover:text-orange-100 transition-colors duration-200 font-medium"
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    
                    {activeDropdown === item.id && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        {item.dropdownItems.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            to={dropdownItem.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="text-white hover:text-orange-100 transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle(7)}
                className="flex items-center text-white hover:text-orange-100 transition-colors duration-200 font-medium"
              >
                Услуги
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 7 && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  {navigationMenu.find(item => item.id === 7)?.dropdownItems.map((dropdownItem, index) => (
                    <Link
                      key={index}
                      to={dropdownItem.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {dropdownItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle(8)}
                className="flex items-center text-white hover:text-orange-100 transition-colors duration-200 font-medium"
              >
                Блог
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 8 && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  {navigationMenu.find(item => item.id === 8)?.dropdownItems.map((dropdownItem, index) => (
                    <Link
                      key={index}
                      to={dropdownItem.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {dropdownItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Contact Info and CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center text-white">
              <Phone className="h-4 w-4 mr-1" />
              <span className="font-medium">{siteInfo.phone}</span>
            </div>
            <Button 
              className="bg-white text-orange-500 hover:bg-orange-50 font-medium px-6"
            >
              ЗАБРОНИРОВАТЬ
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop for closing dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
};

export default Header;