import React from 'react';
import { Helmet } from 'react-helmet';

// Компонент для глобальной блокировки индексации
const NoIndexTags = () => {
  return (
    <Helmet>
      {/* Основные мета-теги для блокировки индексации */}
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
      
      {/* Яндекс специфичные теги */}
      <meta name="yandex" content="noindex, nofollow, noarchive, nosnippet" />
      <meta name="slurp" content="noindex, nofollow, noarchive, nosnippet" />
      
      {/* Дополнительные директивы */}
      <meta name="referrer" content="no-referrer" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* HTTP-Equiv заголовки */}
      <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet" />
      
      {/* Удаляем canonical URL чтобы не указывать на себя */}
      {/* <link rel="canonical" href={url} /> */}
      
      {/* Блокировка Open Graph для соцсетей */}
      <meta property="robots" content="noindex, nofollow" />
      
      {/* Блокировка Twitter Card */}
      <meta name="twitter:robots" content="noindex, nofollow" />
      
      {/* Директивы для предотвращения кэширования */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
    </Helmet>
  );
};

export default NoIndexTags;