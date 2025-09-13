import React from 'react';
import { Button } from './ui/button';
import { activities } from '../data/mock';

const ActivitiesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div key={activity.id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Background Image */}
              <div className="relative h-80">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-white space-y-3">
                  <h3 className="text-2xl font-bold">{activity.title}</h3>
                  <p className="text-lg font-medium opacity-90">{activity.subtitle}</p>
                  
                  {activity.description && (
                    <p className="text-sm opacity-80 leading-relaxed">
                      {activity.description}
                    </p>
                  )}

                  {/* Special styling for the weather card */}
                  {activity.id === 4 && (
                    <div className="pt-4">
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                      >
                        Забронировать
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Icon Badge */}
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-3 shadow-md">
                <span className="text-2xl">{activity.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weather Special Section */}
        <div className="mt-12 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            У нас круто в любую погоду
          </h2>
          <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
            Независимо от погодных условий, наша ферма всегда уютна и интересна!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-3"
          >
            Забронировать
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;