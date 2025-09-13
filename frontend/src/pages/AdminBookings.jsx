import React, { useState } from 'react';
import { Calendar, Phone, Mail, MessageSquare, Clock, CheckCircle, XCircle, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { useApi, useMutation } from '../hooks/useApi';
import { bookingAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';
import LoadingSpinner, { LoadingSection } from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AdminBookings = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  
  const { data: bookings, loading, error, refetch } = useApi(() => bookingAPI.getAllBookings());
  const { mutate: updateStatus, loading: updating } = useMutation();
  const { toast } = useToast();

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateStatus(
        () => bookingAPI.updateBookingStatus(bookingId, newStatus, adminNotes),
        (response) => {
          toast({
            title: "Статус обновлён",
            description: response.message || "Статус заявки успешно изменён"
          });
          setAdminNotes('');
          setExpandedBooking(null);
          refetch();
        },
        (error) => {
          toast({
            title: "Ошибка",
            description: error || "Не удалось обновить статус заявки",
            variant: "destructive"
          });
        }
      );
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return Clock;
      case 'confirmed':
        return CheckCircle;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new':
        return 'Новая';
      case 'confirmed':
        return 'Подтверждена';
      case 'completed':
        return 'Завершена';
      case 'cancelled':
        return 'Отменена';
      default:
        return status;
    }
  };

  const filteredBookings = bookings?.filter(booking => {
    if (selectedStatus === 'all') return true;
    return booking.status === selectedStatus;
  }) || [];

  const BookingCard = ({ booking }) => {
    const isExpanded = expandedBooking === booking.id;
    const StatusIcon = getStatusIcon(booking.status);

    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-orange-100 rounded-full p-2">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(booking.created_at).toLocaleString('ru')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {booking.phone}
              </div>
              {booking.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {booking.email}
                </div>
              )}
            </div>

            {booking.message && (
              <div className="mb-4">
                <div className="flex items-start text-sm text-gray-600">
                  <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{booking.message}</p>
                </div>
              </div>
            )}

            {booking.admin_notes && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">Заметки администратора:</p>
                <p className="text-sm text-blue-800">{booking.admin_notes}</p>
              </div>
            )}
          </div>

          <div className="ml-6 flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(booking.status)}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {getStatusText(booking.status)}
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
            >
              {isExpanded ? 'Скрыть' : 'Управление'}
            </Button>
          </div>
        </div>

        {/* Expanded management section */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изменить статус:
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant={booking.status === 'new' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusUpdate(booking.id, 'new')}
                    disabled={updating}
                  >
                    Новая
                  </Button>
                  <Button
                    variant={booking.status === 'confirmed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                    disabled={updating}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Подтвердить
                  </Button>
                  <Button
                    variant={booking.status === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusUpdate(booking.id, 'completed')}
                    disabled={updating}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Завершить
                  </Button>
                  <Button
                    variant={booking.status === 'cancelled' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                    disabled={updating}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Отменить
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заметки администратора:
                </label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Добавьте заметки к заявке..."
                  className="w-full"
                />
              </div>

              {adminNotes && (
                <Button
                  onClick={() => handleStatusUpdate(booking.id, booking.status)}
                  disabled={updating}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {updating ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Сохранение...</span>
                    </div>
                  ) : (
                    'Сохранить заметки'
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    );
  };

  if (loading) {
    return <LoadingSection message="Загрузка заявок..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки на бронирование</h1>
          <p className="text-gray-600">
            Управление заявками от посетителей
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">{bookings?.length || 0}</p>
              <p className="text-sm text-gray-600">Всего заявок</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {bookings?.filter(b => b.status === 'new').length || 0}
              </p>
              <p className="text-sm text-gray-600">Новые</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {bookings?.filter(b => b.status === 'confirmed').length || 0}
              </p>
              <p className="text-sm text-gray-600">Подтверждены</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {bookings?.filter(b => b.status === 'completed').length || 0}
              </p>
              <p className="text-sm text-gray-600">Завершены</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Фильтр по статусу:</label>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все заявки</SelectItem>
            <SelectItem value="new">Новые</SelectItem>
            <SelectItem value="confirmed">Подтверждены</SelectItem>
            <SelectItem value="completed">Завершены</SelectItem>
            <SelectItem value="cancelled">Отменены</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Заявки не найдены
            </h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? 'Заявки на бронирование пока отсутствуют'
                : `Заявки со статусом "${getStatusText(selectedStatus)}" не найдены`
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;