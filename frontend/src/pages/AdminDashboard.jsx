import React from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, MessageSquare, Camera, FileText, 
  Settings, LogOut, Calendar, TrendingUp, Eye, Star,
  Mail, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { adminAPI, bookingAPI, reviewsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import NoIndexTags from '../components/SEO/NoIndexTags';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { data: stats, loading: statsLoading, error: statsError } = useApi(() => adminAPI.getStats());
  const { data: bookings, loading: bookingsLoading } = useApi(() => bookingAPI.getAllBookings());
  const { data: pendingReviews, loading: reviewsLoading } = useApi(() => reviewsAPI.getPendingReviews());

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', change }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon: Icon, to, count = 0 }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <Link to={to} className="block">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-orange-500" />
          {count > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {count}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </Link>
    </Card>
  );

  const RecentBooking = ({ booking }) => (
    <div className="flex items-center justify-between p-3 border-b last:border-b-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{booking.name}</p>
        <p className="text-sm text-gray-600">{booking.phone}</p>
        {booking.message && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{booking.message}</p>
        )}
      </div>
      <div className="text-right ml-4">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          booking.status === 'new' 
            ? 'bg-yellow-100 text-yellow-800' 
            : booking.status === 'confirmed'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {booking.status === 'new' && <Clock className="h-3 w-3 mr-1" />}
          {booking.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
          {booking.status === 'new' ? 'Новая' : booking.status === 'confirmed' ? 'Подтверждена' : 'Завершена'}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(booking.created_at).toLocaleDateString('ru')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-orange-500 rounded-lg p-2 mr-3">
                <span className="text-white font-bold text-lg">LULU</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Админ-панель</h1>
                <p className="text-sm text-gray-500">Ферма ЛуЛу</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                target="_blank"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Посмотреть сайт
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Привет, {user?.full_name || user?.username}!
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Обзор статистики</h2>
          
          {statsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6">
                  <LoadingSpinner size="md" />
                </Card>
              ))}
            </div>
          ) : statsError ? (
            <ErrorMessage message={statsError} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Всего заявок" 
                value={stats?.total_bookings || 0}
                icon={Calendar}
                color="blue"
                change="+12% за месяц"
              />
              <StatCard 
                title="Новые заявки" 
                value={stats?.pending_bookings || 0}
                icon={AlertCircle}
                color="yellow"
              />
              <StatCard 
                title="Всего отзывов" 
                value={stats?.total_reviews || 0}
                icon={Star}
                color="green"
              />
              <StatCard 
                title="Услуги" 
                value={stats?.total_services || 0}
                icon={Settings}
                color="purple"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Быстрые действия</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard 
                title="Заявки на бронирование"
                description="Просмотр и управление заявками от посетителей"
                icon={Calendar}
                to="/admin/bookings"
                count={stats?.pending_bookings || 0}
              />
              <QuickActionCard 
                title="Модерация отзывов"
                description="Одобрение и управление отзывами посетителей"
                icon={MessageSquare}
                to="/admin/reviews"
                count={stats?.pending_reviews || 0}
              />
              <QuickActionCard 
                title="Управление услугами"
                description="Добавление и редактирование услуг фермы"
                icon={Settings}
                to="/admin/services"
              />
              <QuickActionCard 
                title="Управление блогом"
                description="Создание и редактирование статей блога"
                icon={FileText}
                to="/admin/blog"
              />
              <QuickActionCard 
                title="Галерея фото"
                description="Загрузка и управление фотографиями"
                icon={Camera}
                to="/admin/gallery"
              />
              <QuickActionCard 
                title="Новости фермы"
                description="Публикация новостей и событий"
                icon={Mail}
                to="/admin/news"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Последние заявки</h2>
            <Card className="p-0">
              {bookingsLoading ? (
                <div className="p-6">
                  <LoadingSpinner size="md" />
                </div>
              ) : bookings && bookings.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {bookings.slice(0, 5).map((booking) => (
                    <RecentBooking key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  Заявки отсутствуют
                </div>
              )}
              
              {bookings && bookings.length > 5 && (
                <div className="border-t p-3">
                  <Link 
                    to="/admin/bookings"
                    className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                  >
                    Посмотреть все заявки →
                  </Link>
                </div>
              )}
            </Card>

            {/* Pending Reviews */}
            {pendingReviews && pendingReviews.length > 0 && (
              <Card className="mt-6 p-4">
                <h3 className="font-medium text-gray-900 mb-2">Ожидают модерации</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {pendingReviews.length} отзыв(ов) ожидают одобрения
                </p>
                <Link to="/admin/reviews">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Перейти к модерации
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;