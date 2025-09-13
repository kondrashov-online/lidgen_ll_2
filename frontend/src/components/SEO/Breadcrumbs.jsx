import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './StructuredData';

const Breadcrumbs = ({ customItems = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Generate breadcrumb items based on current path
  const generateBreadcrumbItems = () => {
    const items = [{ name: 'Главная', url: 'https://alpaca-lulu.ru/', path: '/' }];
    
    if (customItems.length > 0) {
      // Use custom items if provided
      items.push(...customItems);
    } else {
      // Generate items from current path
      let currentPath = '';
      
      pathnames.forEach((pathname, index) => {
        currentPath += `/${pathname}`;
        
        let name = pathname;
        
        // Map paths to readable names
        const pathNames = {
          'services': 'Услуги',
          'blog': 'Блог',
          'about': 'О ферме',
          'contacts': 'Контакты',
          'prices': 'Цены',
          'admin': 'Администрирование',
          'dashboard': 'Панель управления',
          'bookings': 'Заявки',
          'reviews': 'Отзывы',
          'gallery': 'Галерея',
          'news': 'Новости',
          'interact': 'Взаимодействие',
          'try': 'Пробовать',
          'move': 'Двигаться',
          'contact-zoo': 'Контактный зоопарк',
          'zoo-ekaterinburg': 'Зоопарк Екатеринбург', 
          'feed-animals': 'Покормить животных',
          'pet-animals': 'Погладить животных',
          'horse-care': 'Уход за лошадьми',
          'play-dogs': 'Игры с собаками',
          'restaurant': 'Ресторан',
          'kids-ekaterinburg': 'Куда сводить ребенка в Екатеринбурге',
          'kids-sverdlovsk': 'Отдых с детьми в Свердловской области'
        };
        
        name = pathNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
        
        items.push({
          name,
          url: `https://alpaca-lulu.ru${currentPath}`,
          path: currentPath
        });
      });
    }
    
    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();
  const isHomePage = location.pathname === '/';

  // Don't show breadcrumbs on home page or admin pages
  if (isHomePage || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Structured data for breadcrumbs */}
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Visual breadcrumbs */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              
              return (
                <li key={item.path} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                  )}
                  
                  {index === 0 ? (
                    <Link 
                      to={item.path}
                      className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <Home className="h-4 w-4 mr-1" />
                      {item.name}
                    </Link>
                  ) : isLast ? (
                    <span className="text-gray-900 font-medium">
                      {item.name}
                    </span>
                  ) : (
                    <Link 
                      to={item.path}
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;