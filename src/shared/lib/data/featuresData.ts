export interface Feature {
  title: string;
  description: string;
  detailedDescription: string;
  exampleDescription: string;
}

export const featuresData = {
  'branding-and-identity': [
    {
      title: 'Signature Identity',
      description: 'Distinctive logos that embody your brand\'s core essence.',
      detailedDescription: 'Unique identity marks crafted through meticulous research and creative exploration. Each logo is designed to be timeless, versatile, and reflective of brand values, ensuring recognition and resonance across all mediums.',
      exampleDescription: 'Логотип для технологического стартапа, сочетающий символ атома (инновации) с плавными линиями (доступность), что визуально передаёт миссию "сложные технологии — простое использование".'
    },
    {
      title: 'Brand Standards',
      description: 'Comprehensive guidelines ensuring consistent brand representation.', 
      detailedDescription: 'Detailed brand standards that serve as the foundation for visual and verbal identity. These guidelines maintain coherence across all touchpoints, preserving brand integrity and elevating perception.',
      exampleDescription: 'Брендбук для сети кофеен на 80 страниц с точными отступами, размерами логотипа для разной упаковки, палитрой из 6 основных и 4 акцентных цветов, правилами использования в социальных сетях.'
    },
    {
      title: 'Visual Language',
      description: 'Cohesive visual systems that communicate with sophistication.',
      detailedDescription: 'Complete visual languages where every element—typography, color, imagery—works in harmony to tell brand stories with elegance and precision.',
      exampleDescription: 'Визуальный язык для luxury-отеля: кастомный шрифт, палитра из золотого, тёмно-синего и кремового цветов, стиль фотографии с мягким светом и минималистичными композициями.'
    },
    {
      title: 'Brand Strategy',
      description: 'Strategic positioning that defines your market presence.',
      detailedDescription: 'Sophisticated brand strategies that articulate unique value propositions and guide every aspect of market presence with purpose and clarity.',
      exampleDescription: 'Позиционирование экобренда как "роскошная устойчивость", целевая аудитория — осознанные потребители 30-45 лет, коммуникационная стратегия с акцентом на прозрачность цепочек поставок.'
    },
    {
      title: 'Packaging Design',
      description: 'Elegant packaging solutions that create memorable unboxing experiences.',
      detailedDescription: 'Packaging that transforms product delivery into brand moments, combining aesthetic appeal with functional excellence and sensory engagement.',
      exampleDescription: 'Упаковка для парфюмерного бренда: магнитная крышка, тиснение фольгой, внутренний слой из переработанного картона и ароматизированная вставка, раскрывающаяся при открытии.'
    },
    {
      title: 'Brand Assets',
      description: 'Complete suite of meticulously crafted brand elements.',
      detailedDescription: 'A comprehensive collection of brand assets, each thoughtfully designed to maintain consistency and excellence across all applications.',
      exampleDescription: 'Полный набор активов для финтех-компании: 5 вариантов логотипа, иконки для приложения, шаблоны презентаций, фирменные бланки, email-рассылки и 30+ готовых графических материалов для соцсетей.'
    }
  ],

  'automation-and-infrastructure': [
    {
      title: 'Automated Deployment',
      description: 'Seamless deployment workflows for exceptional reliability.',
      detailedDescription: 'Automated deployment systems ensure flawless, consistent releases with precision engineering. Every update is executed with elegance and reliability.',
      exampleDescription: 'CI/CD пайплайн, автоматически запускающий 200+ тестов, проверяющий безопасность, собирающий приложение и деплоящий на 3 стейджинг-сервера с zero-downtime обновлением.'
    },
    {
      title: 'Cloud Architecture',
      description: 'Sophisticated cloud solutions engineered for excellence.',
      detailedDescription: 'Cloud infrastructures that combine performance, security, and scalability. Each solution is tailored to specific requirements with uncompromising quality.',
      exampleDescription: 'Архитектура для медиа-сервиса: auto-scaling группы серверов, распределённое кэширование Redis, CDN для статики и гео-репликация баз данных между Европой и США.'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Precision infrastructure management through code.',
      detailedDescription: 'Infrastructure as code implementations with meticulous attention to detail, ensuring reproducible, version-controlled environments that eliminate configuration drift.',
      exampleDescription: 'Terraform-конфигурации для разворачивания полной инфраструктуры из 50+ ресурсов AWS за 15 минут, с возможностью отката к любой предыдущей версии через Git.'
    },
    {
      title: 'Performance Monitoring',
      description: 'Comprehensive monitoring for optimal system performance.',
      detailedDescription: 'Monitoring solutions providing elegant visibility into system health, enabling proactive optimization and ensuring exceptional user experiences.',
      exampleDescription: 'Мониторинг с Grafana-дашбордами, отслеживающий 150+ метрик: время ответа API, потребление памяти контейнерами, бизнес-метрики вроде конверсии оплат.'
    },
    {
      title: 'Security Framework',
      description: 'Advanced security protocols for complete protection.',
      detailedDescription: 'Sophisticated security frameworks integrating seamlessly throughout infrastructure, providing robust protection without compromising performance.',
      exampleDescription: 'Многоуровневая защита: WAF для фильтрации трафика, автоматическое сканирование уязвимостей в контейнерах, шифрование данных в покое и движении, регулярные пентесты.'
    },
    {
      title: 'Database Solutions',
      description: 'Optimized database architectures for peak performance.',
      detailedDescription: 'Database solutions combining performance tuning, automated management, and scalable architectures to ensure data integrity and accessibility.',
      exampleDescription: 'Гибридная база данных для аналитической платформы: PostgreSQL для транзакций, ClickHouse для аналитики и Redis для сессий, с автоматическим партицированием и репликацией.'
    }
  ],

  'analytics-and-optimization': [
    {
      title: 'Performance Intelligence',
      description: 'Comprehensive analytics for informed strategic decisions.',
      detailedDescription: 'Intelligence systems transforming complex data into clear insights, enabling precise optimization and strategic foresight for sustainable growth.',
      exampleDescription: 'Аналитика для маркетплейса: пользователи, просмотревшие видео-обзоры, конвертируются на 47% лучше, что позволяет перераспределить бюджет на производство контента.'
    },
    {
      title: 'User Insights',
      description: 'Deep understanding of user behavior and preferences.',
      detailedDescription: 'Meaningful patterns uncovered in user interactions, providing elegant insights that drive experience improvements and engagement strategies.',
      exampleDescription: 'Heatmaps и session recordings показывают, что 30% пользователей не находят кнопку "Оформить заказ" из-за плохого контраста, что после исправления увеличивает конверсию на 22%.'
    },
    {
      title: 'Strategic Testing',
      description: 'Data-driven experimentation to validate enhancements.',
      detailedDescription: 'Testing methodologies combining scientific rigor with practical application, ensuring every change delivers measurable value and refined experiences.',
      exampleDescription: 'A/B тест с 15 вариантами кнопки "Купить" выявляет оптимальную комбинацию: зелёный цвет, размер 44px и формулировка "Добавить в корзину", что увеличивает кликабельность на 34%.'
    },
    {
      title: 'Conversion Excellence',
      description: 'Optimized user journeys for maximum conversion rates.',
      detailedDescription: 'User pathways refined with sophisticated optimization techniques, creating seamless experiences that naturally guide users toward desired actions.',
      exampleDescription: 'Onboarding для SaaS-продукта: 3 шага вместо 7, progress bar и примеры использования, снижающие отток на этапе адаптации с 65% до 28%.'
    },
    {
      title: 'Data Visualization',
      description: 'Elegant dashboards that transform data into understanding.',
      detailedDescription: 'Sophisticated visualization systems making complex information accessible and actionable for strategic decision-making at every level.',
      exampleDescription: 'Дашборд для руководителя: финансовые KPI за выбранный период, карта кликов по сайту в реальном времени и предсказание выручки на основе сезонных паттернов.'
    },
    {
      title: 'Predictive Analytics',
      description: 'Advanced forecasting for proactive business strategy.',
      detailedDescription: 'Predictive models leveraging sophisticated algorithms to anticipate trends and opportunities, providing strategic advantage through foresight.',
      exampleDescription: 'Модель для ритейлера, предсказывающая спрос на 2000+ товаров с точностью 89%, что позволяет оптимизировать запасы и сократить логистические издержки на 18%.'
    }
  ],

  'marketing-strategy': [
    {
      title: 'Search Excellence',
      description: 'Strategic SEO for dominant search presence.',
      detailedDescription: 'Sophisticated search strategies elevating visibility and authority, driving qualified traffic through meticulous optimization and content excellence.',
      exampleDescription: 'Вывод 15 ключевых запросов юридической фирмы в топ-3 Яндекса и Google за 6 месяцев через 50+ экспертных статей, оптимизацию технической базы и наращивание ссылочной массы.'
    },
    {
      title: 'Content Strategy',
      description: 'Compelling content that builds authority and engagement.',
      detailedDescription: 'Content strategies combining storytelling expertise with strategic intent, creating valuable narratives that resonate with audiences and drive action.',
      exampleDescription: 'Контент-план для EdTech-платформы: 100+ материалов от экспертных статей и case studies до вебинаров с приглашёнными спикерами, увеличивающий лиды на 300%.'
    },
    {
      title: 'Social Presence',
      description: 'Strategic social media for meaningful audience connections.',
      detailedDescription: 'Sophisticated social strategies fostering genuine community engagement while maintaining brand elegance and strategic positioning.',
      exampleDescription: 'Кампания в Instagram для косметического бренда: UGC-контент, челленджи и коллаборации с микро-инфлюенсерами, увеличивающие вовлечённость на 450% за квартал.'
    },
    {
      title: 'Precision Advertising',
      description: 'Targeted campaigns that maximize return on investment.',
      detailedDescription: 'Advertising approaches combining data intelligence with creative excellence, ensuring every impression delivers value and drives strategic outcomes.',
      exampleDescription: 'Ретаргетинг на LinkedIn для B2B-сервиса: сегментация по должностям (CTO, Product Managers) и компаниям из определённых отраслей, CPA в 3 раза ниже рынка.'
    },
    {
      title: 'Email Excellence',
      description: 'Personalized communications that nurture relationships.',
      detailedDescription: 'Email strategies balancing automation with personal touch, creating meaningful dialogues that build loyalty and drive retention.',
      exampleDescription: 'Триггерные цепочки писем: welcome-серия для новых пользователей, reactivation для неактивных и персонализированные рекомендации на основе поведения, повышающие retention на 40%.'
    },
    {
      title: 'Performance Intelligence',
      description: 'Comprehensive analytics for marketing optimization.',
      detailedDescription: 'Marketing intelligence systems providing elegant insights into campaign performance, enabling continuous refinement and strategic alignment.',
      exampleDescription: 'Сквозная аналитика, связывающая клики из рекламы с продажами в CRM, позволяющая распределить 80% бюджета на самые эффективные каналы и увеличить ROMI на 65%.'
    }
  ],

  'product-development': [
    {
      title: 'Web Applications',
      description: 'Sophisticated web solutions with exceptional user experiences.',
      detailedDescription: 'Elegant web applications combining technical excellence with intuitive design, delivering seamless experiences across all devices and platforms.',
      exampleDescription: 'Progressive Web App для доставки еды с кэшированием меню, push-уведомлениями о статусе заказа и работой офлайн, увеличивающий повторные заказы на 55%.'
    },
    {
      title: 'Mobile Excellence',
      description: 'Refined mobile applications with native performance.',
      detailedDescription: 'Mobile solutions embodying the highest standards of design and engineering, creating applications that feel intuitively native and perform flawlessly.',
      exampleDescription: 'Кроссплатформенное приложение для фитнес-трекера: 60 fps анимаций, нативный UX под iOS/Android, автономная работа 7+ дней на одном заряде.'
    },
    {
      title: 'API Architecture',
      description: 'Robust API solutions for seamless integration.',
      detailedDescription: 'Sophisticated API architectures enabling elegant system integrations, ensuring reliability, security, and developer-friendly experiences.',
      exampleDescription: 'RESTful API с версионированием, rate limiting, OAuth 2.0 авторизацией и документацией в Swagger, обрабатывающий 10k+ запросов в секунду с задержкой менее 50ms.'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud architectures for modern applications.',
      detailedDescription: 'Cloud solutions combining architectural elegance with practical scalability, creating foundations that support growth and innovation.',
      exampleDescription: 'Микросервисная архитектура на Kubernetes для стримингового сервиса с автоматическим масштабированием под нагрузку, обработкой 1M+ одновременных подключений.'
    },
    {
      title: 'Experience Design',
      description: 'Intuitive interfaces that anticipate user needs.',
      detailedDescription: 'User experiences where every interaction feels natural and purposeful, blending aesthetic appeal with functional excellence.',
      exampleDescription: 'Интерфейс банковского приложения с предсказанием операций: переводы по расписанию, часто используемые платежи, мгновенное подтверждение через Face ID.'
    },
    {
      title: 'Quality Assurance',
      description: 'Comprehensive testing for flawless performance.',
      detailedDescription: 'Quality processes ensuring every deliverable meets the highest standards of reliability, performance, and user satisfaction.',
      exampleDescription: 'Тестовое покрытие из 3000+ автотестов (unit, integration, e2e), непрерывный security scanning и тестирование на 50+ реальных устройствах, снижающее количество багов в продакшене на 90%.'
    }
  ]
};