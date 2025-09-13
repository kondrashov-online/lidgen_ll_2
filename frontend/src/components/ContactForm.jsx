import React, { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { useMutation } from '../hooks/useApi';
import { bookingAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    agreement: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { mutate, loading } = useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreement) {
      toast({
        title: "Ошибка",
        description: "Необходимо согласие на обработку персональных данных",
        variant: "destructive"
      });
      return;
    }

    try {
      await mutate(
        () => bookingAPI.createBooking({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          message: formData.message || null
        }),
        (response) => {
          // Success callback
          setIsSubmitted(true);
          toast({
            title: "Заявка отправлена!",
            description: response.message || "Наш менеджер свяжется с вами в ближайшее время"
          });

          // Reset form after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              message: '',
              agreement: false
            });
          }, 3000);
        },
        (error) => {
          // Error callback
          toast({
            title: "Ошибка отправки",
            description: error || "Произошла ошибка при отправке заявки. Попробуйте позже.",
            variant: "destructive"
          });
        }
      );
    } catch (error) {
      // Additional error handling
      console.error('Booking submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-400 to-green-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="text-green-500 mb-4">
                <MessageCircle className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Ваша заявка отправлена!
              </h3>
              <p className="text-gray-600">
                Спасибо за обращение! Наш менеджер свяжется с вами в ближайшее время.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-orange-400 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                Забронировать
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Оставьте свои контакты и наш менеджер свяжется с вами и уточнит все детали
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email (необязательно)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите о ваших пожеланиях..."
                    className="w-full"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreement: checked }))
                    }
                    className="mt-1"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600 leading-relaxed">
                    Я согласен на обработку моих персональных данных. С политикой в отношении 
                    обработки и защиты персональных данных ознакомлен и согласен.
                  </label>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Отправляем...</span>
                    </div>
                  ) : (
                    "Отправить"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;