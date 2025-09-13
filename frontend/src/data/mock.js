// Mock data for Alpaca Farm LL website

export const siteInfo = {
  name: "Ферма ЛуЛу",
  location: "в Космакова",
  distance: "всего 30 км от Екатеринбурга",
  phone: "+7 (343) 379-42-98",
  email: "info@alpaca-lulu.ru",
  address: "ул. Свободы, 28, д. Космакова",
  description: "Полезное семейное развлечение на свежем воздухе и в любую погоду"
};

export const navigationMenu = [
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

export const activities = [
  {
    id: 1,
    title: "Взаимодействуй",
    subtitle: "С животными и природой",
    image: "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    icon: "🤝"
  },
  {
    id: 2,
    title: "Пробуй",
    subtitle: "Новое, натуральное и вкусное",
    image: "https://images.unsplash.com/photo-1454179083322-198bb4daae41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
    icon: "🍯"
  },
  {
    id: 3,
    title: "Двигайся",
    subtitle: "Прогулки в заповедной зоне",
    image: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    icon: "🚶"
  },
  {
    id: 4,
    title: "У нас круто",
    subtitle: "в любую погоду",
    description: "Независимо от погодных условий, наша ферма всегда уютна и интересна!",
    image: "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    icon: "☀️"
  },
  {
    id: 5,
    title: "Развивайся",
    subtitle: "Знакомься и познавай мир",
    image: "https://images.unsplash.com/photo-1572297982753-48c028401d18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    icon: "🧠"
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1572297982753-48c028401d18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1454179083322-198bb4daae41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1569858241634-5aee6e47091a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85"
];

export const reviews = [
  {
    id: 1,
    name: "Nina Lysakova",
    date: "28/03/2025",
    text: "Сплошной восторг! Красивущее место, кругом сосны, просторы, всё ухоженное. Животные милейшие, экскурсия супер подробная и интересная! Еще и поесть можно в домашней обстановке вкусную еду!",
    rating: 5
  },
  {
    id: 2,
    name: "Мария Лавренова",
    date: "23/03/2025",
    text: "Восхитительное, уютное, красивое место, пропитанное любовью к животным, пространству и гостям. Каждый встреченный мной человек на ферме был приветлив и улыбчив — чувство, что я была не в России. Благодарю за гостеприимство и удовлетворение любых потребностей!",
    rating: 5
  },
  {
    id: 3,
    name: "Дарья Заровняева",
    date: "01/03/2025",
    text: "Прекрасное место! Очень хорошо организовано пространство. Перед началом экскурсии предложили пройти в здание, где можно было согреться, также там есть удобства и сувенирная лавка. Сама экскурсия длительностью в 1 час, время пролетело незаметно.",
    rating: 5
  },
  {
    id: 4,
    name: "Анна Ч.",
    date: "23/06/2025",
    text: "Прекрасное место! Даже взрослым интересно. Самое главное, чувствуется забота о животных, они тут не грустят. Чисто, красиво и просторно на территории. Сотрудники гостеприимны и внимательны. Советуем всем 🦙♥️",
    rating: 5
  },
  {
    id: 5,
    name: "Александра Колядина",
    date: "23/06/2025",
    text: "Место, где отдыхает душа. Потрясающе ухоженные, добрые, ручные животные. Сказочно заботливые (и к животным, и к гостям), душевные, горящие своим делом сотрудники.",
    rating: 5
  },
  {
    id: 6,
    name: "Анастасия Ардашева",
    date: "21/04/2025",
    text: "Великолепное место для отдыха и получения массы положительных эмоций и впечатлений. Экскурсия проходит в трех разных локациях, чем мы были приятно удивлены.",
    rating: 5
  }
];

export const news = [
  {
    id: 1,
    title: "Участники второго регионального конкурса «Уральские каникулы» стали героями тревел-сериала на 4 канале",
    date: "26/06/2025",
    excerpt: "В финал конкурса прошли 24 команды из 80. По итогам испытаний 8 команд стали участниками тревел-сериала. В число туристических проектов Сысертского городского округа...",
    image: "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    title: "День защиты детей",
    date: "26/06/2025",
    excerpt: "В начале июня, в честь Дня защиты детей, 15 ребят с ограниченными возможностями здоровья из г. Сысерть бесплатно посетили Альпака-ферму в Космакова.",
    image: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    title: "Впервые в области: в сысертской деревне родился детеныш альпаки",
    date: "26/06/2025",
    excerpt: "Знаете, как называют малышей этого животного? Криа! Именно такой впервые родился в Свердловской области. До этого на фермах и в зоопарках малышей-альпак не рождалось.",
    image: "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
  }
];

export const services = [
  {
    id: 1,
    title: "Контактный зоопарк",
    description: "Прямое взаимодействие с добрыми и ухоженными животными",
    price: "от 500 руб",
    image: "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    path: "/services/contact-zoo"
  },
  {
    id: 2,
    title: "Зоопарк Екатеринбург",
    description: "Экскурсии для жителей и гостей Екатеринбурга",
    price: "от 700 руб",
    image: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    path: "/services/zoo-ekaterinburg"
  },
  {
    id: 3,
    title: "Покормить животных",
    description: "Кормление альпак, лам и других обитателей фермы",
    price: "от 200 руб",
    image: "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    path: "/services/feed-animals"
  },
  {
    id: 4,
    title: "Погладить животных",
    description: "Тактильный контакт с дружелюбными животными",
    price: "бесплатно",
    image: "https://images.unsplash.com/photo-1572297982753-48c028401d18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
    path: "/services/pet-animals"
  },
  {
    id: 5,
    title: "Покормить и погладить лошадку",
    description: "Особое общение с нашими лошадями",
    price: "от 300 руб",
    image: "https://images.unsplash.com/photo-1454179083322-198bb4daae41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
    path: "/services/horse-care"
  },
  {
    id: 6,
    title: "Поиграть с собачками",
    description: "Веселые игры с дружелюбными собаками фермы",
    price: "от 250 руб",
    image: "https://images.unsplash.com/photo-1569858241634-5aee6e47091a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
    path: "/services/play-dogs"
  },
  {
    id: 7,
    title: "Ресторан Сысерть",
    description: "Домашняя кухня с натуральными продуктами",
    price: "от 400 руб",
    image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
    path: "/services/restaurant"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Куда сводить ребенка в Екатеринбурге",
    slug: "kids-ekaterinburg",
    excerpt: "Лучшие места для семейного отдыха в Екатеринбурге: от развлекательных центров до образовательных музеев.",
    content: "Екатеринбург предлагает множество интересных мест для детей...",
    author: "Команда ЛуЛу",
    publishDate: "2025-07-10",
    tags: ["дети", "Екатеринбург", "развлечения", "семья"],
    image: "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    title: "Куда съездить с ребенком в Свердловской области",
    slug: "kids-sverdlovsk",
    excerpt: "Обзор семейных маршрутов по Свердловской области: природные парки, фермы и интересные места.",
    content: "Свердловская область богата удивительными местами для семейного отдыха...",
    author: "Команда ЛуЛу",
    publishDate: "2025-07-12",
    tags: ["дети", "Свердловская область", "природа", "путешествия"],
    image: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
  }
];