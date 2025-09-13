import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Import all components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ActivitiesSection from "./components/ActivitiesSection";
import PhotoGallery from "./components/PhotoGallery";
import ReviewsSection from "./components/ReviewsSection";
import FarmMapSection from "./components/FarmMapSection";
import NewsSection from "./components/NewsSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ActivitiesSection />
        <PhotoGallery />
        <ReviewsSection />
        <FarmMapSection />
        <NewsSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

// Placeholder pages for navigation
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-white">
    <Header />
    <main className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{title}</h1>
        <p className="text-gray-600 mb-8">Эта страница находится в разработке.</p>
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Скоро здесь будет:</h2>
          <ul className="text-left text-gray-700 space-y-2">
            <li>• Подробная информация о наших услугах</li>
            <li>• Фотогалерея</li>
            <li>• Отзывы посетителей</li>
            <li>• Система онлайн-бронирования</li>
            <li>• Актуальные цены</li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/interact" element={<PlaceholderPage title="Взаимодействуй с животными" />} />
          <Route path="/try" element={<PlaceholderPage title="Пробуй новое" />} />
          <Route path="/move" element={<PlaceholderPage title="Двигайся и гуляй" />} />
          <Route path="/prices" element={<PlaceholderPage title="Цены" />} />
          <Route path="/about" element={<PlaceholderPage title="О ферме" />} />
          <Route path="/contacts" element={<PlaceholderPage title="Контакты" />} />
          
          {/* Services routes */}
          <Route path="/services/contact-zoo" element={<PlaceholderPage title="Контактный зоопарк" />} />
          <Route path="/services/zoo-ekaterinburg" element={<PlaceholderPage title="Зоопарк Екатеринбург" />} />
          <Route path="/services/feed-animals" element={<PlaceholderPage title="Покормить животных" />} />
          <Route path="/services/pet-animals" element={<PlaceholderPage title="Погладить животных" />} />
          <Route path="/services/horse-care" element={<PlaceholderPage title="Покормить и погладить лошадку" />} />
          <Route path="/services/play-dogs" element={<Placeholder title="Поиграть с собачками" />} />
          <Route path="/services/restaurant" element={<PlaceholderPage title="Ресторан Сысерть" />} />
          
          {/* Blog routes */}
          <Route path="/blog" element={<PlaceholderPage title="Блог" />} />
          <Route path="/blog/kids-ekaterinburg" element={<PlaceholderPage title="Куда сводить ребенка в Екатеринбурге" />} />
          <Route path="/blog/kids-sverdlovsk" element={<PlaceholderPage title="Куда съездить с ребенком в Свердловской области" />} />
          
          {/* Admin routes (will be implemented later) */}
          <Route path="/admin" element={<PlaceholderPage title="Панель администратора" />} />
          <Route path="/admin/login" element={<PlaceholderPage title="Вход в админ-панель" />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
