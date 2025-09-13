#!/usr/bin/env python3
"""
Seed script to populate the database with initial data
"""

import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv

# Import all services and models
from database import connect_to_mongo, close_mongo_connection
from services import (
    site_info_service, services_service, blog_service, 
    reviews_service, news_service, gallery_service
)
from models import *

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    """Seed the database with initial data"""
    print("🌱 Starting database seeding...")
    
    # Connect to database
    await connect_to_mongo()
    
    try:
        # 1. Site Information
        print("📍 Creating site information...")
        site_info = SiteInfo(
            name="Ферма ЛуЛу",
            location="в Космакова",
            distance="всего 30 км от Екатеринбурга",
            phone="+7 (343) 379-42-98",
            email="info@alpaca-lulu.ru",
            address="ул. Свободы, 28, д. Космакова",
            description="Полезное семейное развлечение на свежем воздухе и в любую погоду",
            working_hours="Ежедневно с 10:00 до 18:00",
            social_media={
                "instagram": "@alpaca_lulu",
                "facebook": "AlpacaFarmLulu",
                "youtube": "AlpacaLuluFarm"
            },
            seo_keywords=["альпака", "ферма", "екатеринбург", "зоопарк", "семейный отдых", "животные"]
        )
        await site_info_service.create(site_info.dict())
        
        # 2. Services
        print("🦙 Creating services...")
        services_data = [
            {
                "title": "Контактный зоопарк",
                "slug": "contact-zoo",
                "description": "Прямое взаимодействие с добрыми и ухоженными животными нашей фермы",
                "price": "от 500 руб",
                "image": "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "content": "Наш контактный зоопарк предлагает уникальную возможность познакомиться с альпаками, ламами и другими дружелюбными животными.",
                "duration": "1 час",
                "max_people": 20,
                "order_index": 1,
                "seo_title": "Контактный зоопарк - Ферма ЛуЛу",
                "seo_description": "Посетите контактный зоопарк на ферме ЛуЛу. Общение с альпаками и другими животными."
            },
            {
                "title": "Зоопарк Екатеринбург",
                "slug": "zoo-ekaterinburg", 
                "description": "Специальные экскурсии для жителей и гостей Екатеринбурга",
                "price": "от 700 руб",
                "image": "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "content": "Организованные экскурсии с трансфером из Екатеринбурга. Полный день на ферме с обедом.",
                "duration": "6 часов",
                "max_people": 30,
                "order_index": 2
            },
            {
                "title": "Покормить животных",
                "slug": "feed-animals",
                "description": "Кормление альпак, лам и других обитателей фермы",
                "price": "от 200 руб",
                "image": "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "content": "Специальный корм для животных включен в стоимость. Безопасное кормление под присмотром.",
                "duration": "30 минут",
                "max_people": 15,
                "order_index": 3
            },
            {
                "title": "Погладить животных",
                "slug": "pet-animals",
                "description": "Тактильный контакт с самыми дружелюбными животными",
                "price": "бесплатно",
                "image": "https://images.unsplash.com/photo-1572297982753-48c028401d18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "content": "Наши животные очень дружелюбны и любят ласку. Безопасное общение гарантировано.",
                "duration": "не ограничено",
                "max_people": 10,
                "order_index": 4
            },
            {
                "title": "Покормить и погладить лошадку",
                "slug": "horse-care",
                "description": "Особое общение с нашими лошадями",
                "price": "от 300 руб",
                "image": "https://images.unsplash.com/photo-1454179083322-198bb4daae41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
                "content": "Наши лошади особенно любят детей. Профессиональное сопровождение обязательно.",
                "duration": "45 минут",
                "max_people": 8,
                "order_index": 5
            },
            {
                "title": "Поиграть с собачками",
                "slug": "play-dogs",
                "description": "Веселые игры с дружелюбными собаками фермы",
                "price": "от 250 руб",
                "image": "https://images.unsplash.com/photo-1569858241634-5aee6e47091a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
                "content": "Активные игры с нашими четвероногими друзьями на специальной площадке.",
                "duration": "30 минут",
                "max_people": 12,
                "order_index": 6
            },
            {
                "title": "Ресторан Сысерть",
                "slug": "restaurant",
                "description": "Домашняя кухня с натуральными продуктами собственного производства",
                "price": "от 400 руб",
                "image": "https://images.unsplash.com/photo-1484557985045-edf25e08da73?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
                "content": "Свежие продукты с нашей фермы. Домашние рецепты. Уютная атмосфера.",
                "duration": "не ограничено",
                "max_people": 50,
                "order_index": 7
            }
        ]
        
        for service_data in services_data:
            service = Service(**service_data)
            await services_service.create(service.dict())
        
        # 3. Gallery Images
        print("📸 Creating gallery...")
        gallery_data = [
            {
                "title": "Альпаки на прогулке",
                "image": "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "alt_text": "Белые альпаки гуляют по зеленому полю",
                "order_index": 1
            },
            {
                "title": "Альпака в горах",
                "image": "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "alt_text": "Альпака на фоне гор",
                "order_index": 2
            },
            {
                "title": "Белая альпака",
                "image": "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "alt_text": "Пушистая белая альпака на траве",
                "order_index": 3
            },
            {
                "title": "Коричневые альпаки",
                "image": "https://images.unsplash.com/photo-1572297982753-48c028401d18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85",
                "alt_text": "Две коричневые альпаки стоят рядом",
                "order_index": 4
            },
            {
                "title": "Молодые телята",
                "image": "https://images.unsplash.com/photo-1454179083322-198bb4daae41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
                "alt_text": "Милые телята на ферме",
                "order_index": 5
            },
            {
                "title": "Коровы в поле",
                "image": "https://images.unsplash.com/photo-1569858241634-5aee6e47091a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxmYXJtJTIwYW5pbWFsc3xlbnwwfHx8fDE3NTc3NTU0MDF8MA&ixlib=rb-4.1.0&q=85",
                "alt_text": "Коровы пасутся в живописном поле",
                "order_index": 6
            }
        ]
        
        for gallery_item in gallery_data:
            gallery = Gallery(**gallery_item)
            await gallery_service.create(gallery.dict())
        
        # 4. Reviews
        print("⭐ Creating reviews...")
        reviews_data = [
            {
                "name": "Nina Lysakova",
                "text": "Сплошной восторг! Красивущее место, кругом сосны, просторы, всё ухоженное. Животные милейшие, экскурсия супер подробная и интересная! Еще и поесть можно в домашней обстановке вкусную еду!",
                "rating": 5,
                "is_approved": True,
                "is_featured": True
            },
            {
                "name": "Мария Лавренова", 
                "text": "Восхитительное, уютное, красивое место, пропитанное любовью к животным, пространству и гостям. Каждый встреченный мной человек на ферме был приветлив и улыбчив — чувство, что я была не в России. Благодарю за гостеприимство и удовлетворение любых потребностей!",
                "rating": 5,
                "is_approved": True
            },
            {
                "name": "Дарья Заровняева",
                "text": "Прекрасное место! Очень хорошо организовано пространство. Перед началом экскурсии предложили пройти в здание, где можно было согреться, также там есть удобства и сувенирная лавка. Сама экскурсия длительностью в 1 час, время пролетело незаметно.",
                "rating": 5,
                "is_approved": True
            },
            {
                "name": "Анна Ч.",
                "text": "Прекрасное место! Даже взрослым интересно. Самое главное, чувствуется забота о животных, они тут не грустят. Чисто, красиво и просторно на территории. Сотрудники гостеприимны и внимательны. Советуем всем! 🦙♥️",
                "rating": 5,
                "is_approved": True,
                "is_featured": True
            },
            {
                "name": "Александра Колядина",
                "text": "Место, где отдыхает душа. Потрясающе ухоженные, добрые, ручные животные. Сказочно заботливые (и к животным, и к гостям), душевные, горящие своим делом сотрудники.",
                "rating": 5,
                "is_approved": True
            }
        ]
        
        for review_data in reviews_data:
            review = Review(**review_data)
            await reviews_service.create(review.dict())
        
        # 5. News
        print("📰 Creating news...")
        news_data = [
            {
                "title": "Участники второго регионального конкурса «Уральские каникулы» стали героями тревел-сериала на 4 канале",
                "excerpt": "В финал конкурса прошли 24 команды из 80. По итогам испытаний 8 команд стали участниками тревел-сериала. В число туристических проектов Сысертского городского округа, которые приняли участие в съемках, вошли эко-тропа Лисья для оздоровительных прогулок и велотуров от победителя прошлогоднего сезона Татьяны Каркачевой и альпака-ферма Лу-Лу из деревни Космакова.",
                "content": "В финал конкурса прошли 24 команды из 80. По итогам испытаний 8 команд стали участниками тревел-сериала. В число туристических проектов Сысертского городского округа, которые приняли участие в съемках, вошли эко-тропа Лисья для оздоровительных прогулок и велотуров от победителя прошлогоднего сезона Татьяны Каркачевой и альпака-ферма Лу-Лу из деревни Космакова. В рамках четырехмесячной образовательной программы эксперты туротрасли помогли участникам развить свои проекты и подготовить их к реализации.",
                "image": "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "День защиты детей",
                "excerpt": "В начале июня, в честь Дня защиты детей, 15 ребят с ограниченными возможностями здоровья из г. Сысерть бесплатно посетили Альпака-ферму в Космакова. Дети познакомились с жителями фермы — ламами, альпаками, собаками, гуанако и другими добрыми животными.",
                "content": "В начале июня, в честь Дня защиты детей, 15 ребят с ограниченными возможностями здоровья из г. Сысерть бесплатно посетили Альпака-ферму в Космакова. Дети познакомились с жителями фермы — ламами, альпаками, собаками, гуанако и другими добрыми животными. Особенно детям понравилось кормить и гладить альпак. Многие дети впервые увидели этих удивительных животных вживую.",
                "image": "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Впервые в области: в сысертской деревне родился детеныш альпаки",
                "excerpt": "Знаете, как называют малышей этого животного? Криа! Именно такой впервые родился в Свердловской области. До этого на фермах и в зоопарках малышей-альпак не рождалось. Пополнение случилось ранним утром 28 мая на альпака-ферме «Лулу» в сысертской деревне Космакова.",
                "content": "Знаете, как называют малышей этого животного? Криа! Именно такой впервые родился в Свердловской области. До этого на фермах и в зоопарках малышей-альпак не рождалось. Пополнение случилось ранним утром 28 мая на альпака-ферме «Лулу» в сысертской деревне Космакова. Сейчас малыш чувствует себя хорошо и проявляет активность. Мама малыша немного пока не понимает, что произошло, чуть волнуется, но постепенно привыкает к своей новой роли.",
                "image": "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
            }
        ]
        
        for news_item in news_data:
            news = News(**news_item)
            await news_service.create(news.dict())
        
        # 6. Blog Posts
        print("📝 Creating blog posts...")
        blog_posts = [
            {
                "title": "Куда сводить ребенка в Екатеринбурге",
                "slug": "kids-ekaterinburg",
                "excerpt": "Лучшие места для семейного отдыха в Екатеринбурге: от развлекательных центров до образовательных музеев. Подробный гид по интересным местам города.",
                "content": """
Екатеринбург предлагает множество интересных мест для детей и семейного отдыха. В этой статье мы расскажем о самых популярных и интересных местах, которые стоит посетить с детьми.

## Зоопарки и контактные площадки

1. **Екатеринбургский зоопарк** - один из крупнейших зоопарков России с богатой коллекцией животных
2. **Ферма ЛуЛу в Космакова** - уникальная возможность познакомиться с альпаками всего в 30 км от города
3. **Контактные зоопарки в торговых центрах** - удобно для короткого визита

## Развлекательные центры

- **Гринвич** - большой развлекательный комплекс с аттракционами
- **Carnival** - семейный парк развлечений
- **Cosmic** - боулинг и игровые автоматы

## Образовательные места

- **Музей природы Урала** - познавательные экспозиции о местной природе
- **Планетарий** - увлекательные программы о космосе
- **Музей истории Екатеринбурга** - интересные экскурсии для школьников

Не забудьте про активный отдых на природе - парки города предлагают множество возможностей для прогулок и игр на свежем воздухе.
                """,
                "author": "Команда ЛуЛу",
                "tags": ["дети", "Екатеринбург", "развлечения", "семья", "отдых"],
                "image": "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
            },
            {
                "title": "Куда съездить с ребенком в Свердловской области",
                "slug": "kids-sverdlovsk",
                "excerpt": "Обзор семейных маршрутов по Свердловской области: природные парки, фермы и интересные места для выходного отдыха с детьми.",
                "content": """
Свердловская область богата удивительными местами для семейного отдыха. Рассказываем про самые интересные направления для поездок с детьми.

## Природные достопримечательности

### Национальный парк "Припышминские боры"
Отличное место для семейных прогулок и пикников. Чистый воздух, красивая природа и оборудованные места для отдыха.

### Озеро Балтым
Популярное место для летнего отдыха. Пляжи, водные развлечения и возможность порыбачить.

## Тематические парки и фермы

### Альпака-ферма ЛуЛу (Космакова)
- Уникальная возможность познакомиться с альпаками
- Контактный зоопарк с различными животными  
- Образовательные программы для детей
- Кафе с домашней едой
- Всего 30 км от Екатеринбурга

### Страусиная ферма "Уральский страус"
Необычное место, где дети могут увидеть настоящих страусов и узнать много интересного об этих птицах.

## Активный отдых

- **Горнолыжные курорты** зимой (Волчиха, Ежовая)
- **Веревочные парки** летом
- **Конные прогулки** в различных локациях

## Культурные объекты

- **Музей под открытым небом в Нижней Синячихе**
- **Невьянская башня** - уникальный архитектурный памятник
- **Природный парк "Оленьи ручьи"** - скалы, пещеры и живописные виды

Планируйте поездки заранее, учитывая возраст детей и их интересы. Многие места предлагают специальные детские программы и экскурсии.
                """,
                "author": "Команда ЛуЛу", 
                "tags": ["дети", "Свердловская область", "природа", "путешествия", "семейный отдых"],
                "image": "https://images.unsplash.com/photo-1589182337358-2cb63099350c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhbHBhY2F8ZW58MHx8fHwxNzU3NzU1Mzk2fDA&ixlib=rb-4.1.0&q=85"
            }
        ]
        
        for post_data in blog_posts:
            post = BlogPost(**post_data)
            await blog_service.create(post.dict())
        
        print("✅ Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        raise
    finally:
        # Close connection
        await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_database())