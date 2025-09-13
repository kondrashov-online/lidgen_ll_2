import React from 'react';
import { Helmet } from 'react-helmet';

export const MetaTags = ({
  title = "Ферма ЛуЛу в Космакова — всего 30 км от Екатеринбурга",
  description = "Единственная альпака-ферма в регионе. Контактный зоопарк, экскурсии, кормление животных. Полезное семейное развлечение на свежем воздухе в любую погоду.",
  keywords = "альпака, ферма, екатеринбург, зоопарк, семейный отдых, животные, экскурсии, дети",
  image = "https://images.unsplash.com/photo-1511885663737-eea53f6d6187?w=1200&h=630&fit=crop",
  url = "https://alpaca-lulu.ru",
  type = "website",
  siteName = "Ферма ЛуЛу"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ферма ЛуЛу" />
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="yandex" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Альпаки на ферме ЛуЛу" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@alpaca_lulu" />
      <meta name="twitter:creator" content="@alpaca_lulu" />

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="RU-SVE" />
      <meta name="geo.placename" content="Космакова, Свердловская область" />
      <meta name="geo.position" content="56.6337;60.8268" />
      <meta name="ICBM" content="56.6337, 60.8268" />

      {/* Business Info */}
      <meta name="business:contact_data:street_address" content="ул. Свободы, 28, д. Космакова" />
      <meta name="business:contact_data:locality" content="Космакова" />
      <meta name="business:contact_data:region" content="Свердловская область" />
      <meta name="business:contact_data:postal_code" content="" />
      <meta name="business:contact_data:country_name" content="Россия" />
      <meta name="business:contact_data:phone_number" content="+7 (343) 379-42-98" />
      <meta name="business:contact_data:email" content="info@alpaca-lulu.ru" />

      {/* Language */}
      <meta httpEquiv="content-language" content="ru" />
      <meta name="language" content="Russian" />
    </Helmet>
  );
};

export const ServiceMetaTags = ({ service }) => {
  if (!service) return null;

  return (
    <MetaTags
      title={`${service.title} — Ферма ЛуЛу`}
      description={`${service.description}. ${service.price}. Забронируйте на ферме ЛуЛу в Космакова, всего 30 км от Екатеринбурга.`}
      keywords={`${service.title}, альпака, ферма, екатеринбург, ${service.slug}`}
      image={service.image}
      url={`https://alpaca-lulu.ru/services/${service.slug}`}
      type="article"
    />
  );
};

export const BlogMetaTags = ({ post }) => {
  if (!post) return null;

  return (
    <MetaTags
      title={`${post.title} — Блог фермы ЛуЛу`}
      description={post.excerpt}
      keywords={post.tags?.join(", ") || "блог, статьи, семейный отдых, дети"}
      image={post.image}
      url={`https://alpaca-lulu.ru/blog/${post.slug}`}
      type="article"
    />
  );
};

export default MetaTags;