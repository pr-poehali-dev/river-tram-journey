import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const routes = [
  {
    id: 1,
    title: 'Классическая прогулка',
    duration: '1.5 часа',
    description: 'Обзорная экскурсия по самым живописным местам реки Оки',
    price: 800,
    image: 'https://cdn.poehali.dev/projects/6e06c697-fcda-48ae-b65e-4544207fe152/files/4e2a176a-4a3d-47f2-b05f-65a21a01c749.jpg',
    times: ['10:00', '12:00', '14:00', '16:00', '18:00']
  },
  {
    id: 2,
    title: 'Романтический закат',
    duration: '2 часа',
    description: 'Вечерняя прогулка с видом на закат и живой музыкой',
    price: 1200,
    image: 'https://cdn.poehali.dev/projects/6e06c697-fcda-48ae-b65e-4544207fe152/files/fc730cf1-484e-419a-83ff-448a18c33bc3.jpg',
    times: ['19:00', '20:00']
  },
  {
    id: 3,
    title: 'Семейный круиз',
    duration: '3 часа',
    description: 'Длительная прогулка с развлечениями для всей семьи',
    price: 1500,
    image: 'https://cdn.poehali.dev/projects/6e06c697-fcda-48ae-b65e-4544207fe152/files/10b2dbef-2b5c-457d-8e4c-7aa4820cacb9.jpg',
    times: ['11:00', '15:00']
  }
];

const gallery = [
  {
    id: 1,
    url: 'https://cdn.poehali.dev/projects/6e06c697-fcda-48ae-b65e-4544207fe152/files/4e2a176a-4a3d-47f2-b05f-65a21a01c749.jpg',
    title: 'Речной трамвай'
  },
  {
    id: 2,
    url: 'https://cdn.poehali.dev/projects/6e06c697-fcda-48ae-b65e-4544207fe152/files/fc730cf1-484e-419a-83ff-448a18c33bc3.jpg',
    title: 'Закат на Оке'
  },
  {
    id: 3,
    url: 'https://cdn.poehali.dev/projects/6e06c697-fcda-48ae-b65e-4544207fe152/files/10b2dbef-2b5c-457d-8e4c-7aa4820cacb9.jpg',
    title: 'Комфортный интерьер'
  }
];

export default function Index() {
  const [date, setDate] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState<number>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [tickets, setTickets] = useState(1);
  const [showBooking, setShowBooking] = useState(false);

  const handleBooking = (routeId: number) => {
    setSelectedRoute(routeId);
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmitBooking = () => {
    if (!date || !selectedTime || !selectedRoute) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    const route = routes.find(r => r.id === selectedRoute);
    const total = route ? route.price * tickets : 0;
    
    alert(`Бронирование успешно!\n\nМаршрут: ${route?.title}\nДата: ${format(date, 'dd MMMM yyyy', { locale: ru })}\nВремя: ${selectedTime}\nБилетов: ${tickets}\nСумма: ${total}₽\n\nМы отправили подтверждение на ваш email!`);
    
    setDate(undefined);
    setSelectedTime(undefined);
    setTickets(1);
    setShowBooking(false);
  };

  const selectedRouteData = routes.find(r => r.id === selectedRoute);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Ship" size={32} className="text-primary" />
              <h1 className="text-2xl font-heading font-bold text-primary">Речные прогулки</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#routes" className="text-foreground hover:text-primary transition-colors">Маршруты</a>
              <a href="#schedule" className="text-foreground hover:text-primary transition-colors">Расписание</a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
              <a href="#prices" className="text-foreground hover:text-primary transition-colors">Цены</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button className="hidden md:inline-flex">Забронировать</Button>
            <Button size="icon" variant="outline" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${routes[0].image})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            Откройте красоту Оки
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Живописные маршруты, комфортные теплоходы и незабываемые впечатления
          </p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => handleBooking(1)}>
            <Icon name="Ticket" className="mr-2" size={20} />
            Забронировать билеты
          </Button>
        </div>
      </section>

      <section id="routes" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">Наши маршруты</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выберите идеальную прогулку для вас</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {routes.map((route, index) => (
              <Card 
                key={route.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-heading">{route.title}</CardTitle>
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <CardDescription className="text-base">{route.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{route.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-heading font-bold text-primary">{route.price}₽</span>
                      <span className="text-muted-foreground"> / чел</span>
                    </div>
                    <Button onClick={() => handleBooking(route.id)}>
                      Выбрать
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {showBooking && (
        <section id="booking" className="py-20 px-4 bg-blue-50">
          <div className="container mx-auto max-w-2xl">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-3xl font-heading">Забронировать билеты</CardTitle>
                <CardDescription className="text-base">
                  {selectedRouteData?.title} - {selectedRouteData?.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="route">Маршрут</Label>
                  <Select 
                    value={selectedRoute?.toString()} 
                    onValueChange={(value) => setSelectedRoute(Number(value))}
                  >
                    <SelectTrigger id="route">
                      <SelectValue placeholder="Выберите маршрут" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map(route => (
                        <SelectItem key={route.id} value={route.id.toString()}>
                          {route.title} - {route.price}₽
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Дата прогулки</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Icon name="Calendar" className="mr-2" size={16} />
                        {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {selectedRouteData && (
                  <div className="space-y-2">
                    <Label htmlFor="time">Время отправления</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedRouteData.times.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="tickets">Количество билетов</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTickets(Math.max(1, tickets - 1))}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Input
                      id="tickets"
                      type="number"
                      value={tickets}
                      onChange={(e) => setTickets(Math.max(1, Number(e.target.value)))}
                      className="text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTickets(tickets + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                {selectedRouteData && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center text-lg mb-4">
                      <span className="font-semibold">Итого:</span>
                      <span className="text-3xl font-heading font-bold text-primary">
                        {selectedRouteData.price * tickets}₽
                      </span>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleSubmitBooking}>
                      <Icon name="CheckCircle" className="mr-2" size={20} />
                      Подтвердить бронирование
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section id="schedule" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">Расписание</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Отправления каждый день</p>
          
          <div className="max-w-4xl mx-auto">
            {routes.map(route => (
              <Card key={route.id} className="mb-6">
                <CardHeader>
                  <CardTitle className="font-heading">{route.title}</CardTitle>
                  <CardDescription>{route.duration} • {route.price}₽</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {route.times.map(time => (
                      <Button key={time} variant="outline" className="min-w-24">
                        <Icon name="Clock" className="mr-2" size={16} />
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">Галерея</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Впечатления наших гостей</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <div 
                key={image.id} 
                className="relative h-80 rounded-lg overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-heading text-xl">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">Цены</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Доступные тарифы для всех</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {routes.map(route => (
              <Card key={route.id} className="text-center">
                <CardHeader>
                  <CardTitle className="font-heading">{route.title}</CardTitle>
                  <CardDescription>{route.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-5xl font-heading font-bold text-primary">{route.price}</span>
                    <span className="text-muted-foreground text-lg">₽</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center justify-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Онлайн-бронирование
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Комфортный салон
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Опытный экипаж
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => handleBooking(route.id)}>
                    Забронировать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">Контакты</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Мы всегда на связи</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Как нас найти</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Адрес причала</p>
                    <p className="text-muted-foreground">г. Калуга, Набережная Оки, 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (4842) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@oka-cruise.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground">Ежедневно с 10:00 до 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Ваш вопрос" />
                  </div>
                  <Button className="w-full">
                    <Icon name="Send" className="mr-2" size={16} />
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Ship" size={28} />
                <h3 className="font-heading font-bold text-xl">Речные прогулки</h3>
              </div>
              <p className="text-primary-foreground/80">
                Незабываемые путешествия по реке Оке
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#routes" className="hover:text-white transition-colors">Маршруты</a></li>
                <li><a href="#schedule" className="hover:text-white transition-colors">Расписание</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Галерея</a></li>
                <li><a href="#prices" className="hover:text-white transition-colors">Цены</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>+7 (4842) 123-45-67</li>
                <li>info@oka-cruise.ru</li>
                <li>Ежедневно 10:00-21:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="secondary">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="secondary">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="secondary">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>© 2024 Речные прогулки по Оке. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}