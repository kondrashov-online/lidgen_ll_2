import React from 'react';
import { Helmet } from 'react-helmet';

// LocalBusiness schema for the farm
export const LocalBusinessSchema = ({ siteInfo }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://alpaca-lulu.ru/#localbusiness",
    "name": siteInfo?.name || "Ферма ЛуЛу",
    "alternateName": "Alpaca Farm LuLu",
    "description": siteInfo?.description || "Полезное семейное развлечение на свежем воздухе и в любую погоду. Единственная альпака-ферма в регионе.",
    "url": "https://alpaca-lulu.ru",
    "telephone": siteInfo?.phone || "+7 (343) 379-42-98",
    "email": siteInfo?.email || "info@alpaca-lulu.ru",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteInfo?.address || "ул. Свободы, 28, д. Космакова",
      "addressLocality": "Космакова",
      "addressRegion": "Свердловская область",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "56.6337",
      "longitude": "60.8268"
    },
    "openingHours": ["Mo-Su 10:00-18:00"],
    "priceRange": "₽₽",
    "image": [
      "https://images.unsplash.com/photo-1511885663737-eea53f6d6187",
      "https://images.unsplash.com/photo-1589182337358-2cb63099350c",
      "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f"
    ],
    "sameAs": [
      "https://instagram.com/alpaca_lulu",
      "https://facebook.com/AlpacaFarmLulu",
      "https://youtube.com/AlpacaLuluFarm"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги фермы ЛуЛу",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Контактный зоопарк",
            "description": "Прямое взаимодействие с альпаками и другими животными"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Экскурсии",
            "description": "Познавательные экскурсии по ферме с гидом"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Кормление животных",
            "description": "Кормление альпак, лам и других обитателей фермы"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Service/Product schema for individual services
export const ServiceSchema = ({ service }) => {
  if (!service) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://alpaca-lulu.ru/services/${service.slug}#service`,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Ферма ЛуЛу",
      "@id": "https://alpaca-lulu.ru/#localbusiness"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Свердловская область"
    },
    "image": service.image,
    "url": `https://alpaca-lulu.ru/services/${service.slug}`,
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Article schema for blog posts
export const ArticleSchema = ({ article }) => {
  if (!article) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://alpaca-lulu.ru/blog/${article.slug}#article`,
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "url": `https://alpaca-lulu.ru/blog/${article.slug}`,
    "datePublished": article.publish_date,
    "dateModified": article.updated_at || article.publish_date,
    "author": {
      "@type": "Organization",
      "name": article.author || "Команда ЛуЛу",
      "url": "https://alpaca-lulu.ru"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ферма ЛуЛу",
      "url": "https://alpaca-lulu.ru",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alpaca-lulu.ru/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://alpaca-lulu.ru/blog/${article.slug}`
    },
    "keywords": article.tags?.join(", ") || "",
    "articleSection": "Семейный отдых",
    "wordCount": article.content?.length || 0
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Review schema for customer reviews
export const ReviewSchema = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": reviews.map((review, index) => ({
      "@type": "Review",
      "position": index + 1,
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text,
      "datePublished": review.date,
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Ферма ЛуЛу",
        "@id": "https://alpaca-lulu.ru/#localbusiness"
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Breadcrumb schema for navigation
export const BreadcrumbSchema = ({ items }) => {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Organization schema for the farm
export const OrganizationSchema = ({ siteInfo }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://alpaca-lulu.ru/#organization",
    "name": siteInfo?.name || "Ферма ЛуЛу",
    "url": "https://alpaca-lulu.ru",
    "logo": {
      "@type": "ImageObject",
      "url": "https://alpaca-lulu.ru/logo.png"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteInfo?.phone || "+7 (343) 379-42-98",
      "contactType": "customer service",
      "areaServed": "RU",
      "availableLanguage": ["ru"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteInfo?.address || "ул. Свободы, 28, д. Космакова",
      "addressLocality": "Космакова",
      "addressRegion": "Свердловская область",
      "addressCountry": "RU"
    },
    "sameAs": [
      "https://instagram.com/alpaca_lulu",
      "https://facebook.com/AlpacaFarmLulu", 
      "https://youtube.com/AlpacaLuluFarm"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// FAQ schema for common questions
export const FAQSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Где находится ферма ЛуЛу?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ферма ЛуЛу расположена в деревне Космакова, всего в 30 км от Екатеринбурга, по адресу ул. Свободы, 28."
        }
      },
      {
        "@type": "Question",
        "name": "Какие услуги предоставляет ферма?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Мы предлагаем контактный зоопарк, экскурсии с альпаками и ламами, кормление животных, фотосессии, а также домашнюю кухню в нашем ресторане."
        }
      },
      {
        "@type": "Question",
        "name": "Нужно ли бронировать заранее?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, предварительная запись обязательна. Вы можете забронировать посещение через наш сайт или по телефону +7 (343) 379-42-98."
        }
      },
      {
        "@type": "Question",
        "name": "Сколько стоит посещение?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Стоимость услуг варьируется от 200 до 700 рублей в зависимости от выбранного пакета. Семейные билеты со скидкой 20% доступны при бронировании."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default {
  LocalBusinessSchema,
  ServiceSchema,
  ArticleSchema,
  ReviewSchema,
  BreadcrumbSchema,
  OrganizationSchema,
  FAQSchema
};