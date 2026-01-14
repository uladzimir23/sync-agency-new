export interface Feature {
  title: string;
  description: string;
  detailedDescription: string;
  exampleDescription: string;
}

export const featuresData: { [category: string]: Feature[] } = {
  'branding-and-identity': [
    {
      title: 'Signature Identity',
      description: 'Distinctive logos that embody your brand\'s core essence.',
      detailedDescription: 'Unique identity marks crafted through meticulous research and creative exploration. Each logo is designed to be timeless, versatile, and reflective of brand values, ensuring recognition and resonance across all mediums.',
      exampleDescription: 'Logo for a tech startup combining an atom symbol (innovation) with smooth lines (accessibility), visually conveying the mission of "complex technology — simple use".'
    },
    {
      title: 'Brand Standards',
      description: 'Comprehensive guidelines ensuring consistent brand representation.',
      detailedDescription: 'Detailed brand standards that serve as the foundation for visual and verbal identity. These guidelines maintain coherence across all touchpoints, preserving brand integrity and elevating perception.',
      exampleDescription: 'An 80-page brand book for a coffee shop chain with precise margins, logo sizes for different packaging, a palette of 6 primary and 4 accent colors, and rules for social media usage.'
    },
    {
      title: 'Visual Language',
      description: 'Cohesive visual systems that communicate with sophistication.',
      detailedDescription: 'Complete visual languages where every element—typography, color, imagery—works in harmony to tell brand stories with elegance and precision.',
      exampleDescription: 'Visual language for a luxury hotel: a custom font, a palette of gold, navy blue, and cream, a photography style with soft lighting and minimalist compositions.'
    },
    {
      title: 'Brand Strategy',
      description: 'Strategic positioning that defines your market presence.',
      detailedDescription: 'Sophisticated brand strategies that articulate unique value propositions and guide every aspect of market presence with purpose and clarity.',
      exampleDescription: 'Positioning an eco-brand as "luxurious sustainability", targeting conscious consumers aged 30-45, with a communication strategy emphasizing supply chain transparency.'
    },
    {
      title: 'Packaging Design',
      description: 'Elegant packaging solutions that create memorable unboxing experiences.',
      detailedDescription: 'Packaging that transforms product delivery into brand moments, combining aesthetic appeal with functional excellence and sensory engagement.',
      exampleDescription: 'Packaging for a perfume brand: magnetic cap, foil stamping, an inner layer of recycled cardboard, and a scented insert that unfolds upon opening.'
    },
    {
      title: 'Brand Assets',
      description: 'Complete suite of meticulously crafted brand elements.',
      detailedDescription: 'A comprehensive collection of brand assets, each thoughtfully designed to maintain consistency and excellence across all applications.',
      exampleDescription: 'A full set of assets for a fintech company: 5 logo variations, app icons, presentation templates, letterheads, email templates, and 30+ ready-made social media graphics.'
    }
  ],

  'automation-and-infrastructure': [
    {
      title: 'Automated Deployment',
      description: 'Seamless deployment workflows for exceptional reliability.',
      detailedDescription: 'Automated deployment systems ensure flawless, consistent releases with precision engineering. Every update is executed with elegance and reliability.',
      exampleDescription: 'A CI/CD pipeline that automatically runs 200+ tests, checks security, builds the application, and deploys it to 3 staging servers with zero-downtime updates.'
    },
    {
      title: 'Cloud Architecture',
      description: 'Sophisticated cloud solutions engineered for excellence.',
      detailedDescription: 'Cloud infrastructures that combine performance, security, and scalability. Each solution is tailored to specific requirements with uncompromising quality.',
      exampleDescription: 'Architecture for a media service: auto-scaling server groups, distributed Redis caching, CDN for static content, and geo-replication of databases between Europe and the USA.'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Precision infrastructure management through code.',
      detailedDescription: 'Infrastructure as code implementations with meticulous attention to detail, ensuring reproducible, version-controlled environments that eliminate configuration drift.',
      exampleDescription: 'Terraform configurations for deploying a complete infrastructure of 50+ AWS resources in 15 minutes, with the ability to roll back to any previous version via Git.'
    },
    {
      title: 'Performance Monitoring',
      description: 'Comprehensive monitoring for optimal system performance.',
      detailedDescription: 'Monitoring solutions providing elegant visibility into system health, enabling proactive optimization and ensuring exceptional user experiences.',
      exampleDescription: 'Monitoring with Grafana dashboards tracking 150+ metrics: API response time, container memory consumption, business metrics like payment conversion.'
    },
    {
      title: 'Security Framework',
      description: 'Advanced security protocols for complete protection.',
      detailedDescription: 'Sophisticated security frameworks integrating seamlessly throughout infrastructure, providing robust protection without compromising performance.',
      exampleDescription: 'Multi-layered protection: WAF for traffic filtering, automatic vulnerability scanning in containers, data encryption at rest and in transit, regular penetration tests.'
    },
    {
      title: 'Database Solutions',
      description: 'Optimized database architectures for peak performance.',
      detailedDescription: 'Database solutions combining performance tuning, automated management, and scalable architectures to ensure data integrity and accessibility.',
      exampleDescription: 'Hybrid database for an analytics platform: PostgreSQL for transactions, ClickHouse for analytics, and Redis for sessions, with automatic partitioning and replication.'
    }
  ],

  'analytics-and-optimization': [
    {
      title: 'Performance Intelligence',
      description: 'Comprehensive analytics for informed strategic decisions.',
      detailedDescription: 'Intelligence systems transforming complex data into clear insights, enabling precise optimization and strategic foresight for sustainable growth.',
      exampleDescription: 'Analytics for a marketplace: users who watch video reviews convert 47% better, allowing budget reallocation to content production.'
    },
    {
      title: 'User Insights',
      description: 'Deep understanding of user behavior and preferences.',
      detailedDescription: 'Meaningful patterns uncovered in user interactions, providing elegant insights that drive experience improvements and engagement strategies.',
      exampleDescription: 'Heatmaps and session recordings show that 30% of users cannot find the "Checkout" button due to poor contrast; fixing this increases conversion by 22%.'
    },
    {
      title: 'Strategic Testing',
      description: 'Data-driven experimentation to validate enhancements.',
      detailedDescription: 'Testing methodologies combining scientific rigor with practical application, ensuring every change delivers measurable value and refined experiences.',
      exampleDescription: 'An A/B test with 15 variants of the "Buy" button identifies the optimal combination: green color, 44px size, and the wording "Add to Cart", increasing click-through rate by 34%.'
    },
    {
      title: 'Conversion Excellence',
      description: 'Optimized user journeys for maximum conversion rates.',
      detailedDescription: 'User pathways refined with sophisticated optimization techniques, creating seamless experiences that naturally guide users toward desired actions.',
      exampleDescription: 'Onboarding for a SaaS product: 3 steps instead of 7, a progress bar, and usage examples, reducing churn during the adaptation phase from 65% to 28%.'
    },
    {
      title: 'Data Visualization',
      description: 'Elegant dashboards that transform data into understanding.',
      detailedDescription: 'Sophisticated visualization systems making complex information accessible and actionable for strategic decision-making at every level.',
      exampleDescription: 'Executive dashboard: financial KPIs for the selected period, a real-time click map of the website, and revenue prediction based on seasonal patterns.'
    },
    {
      title: 'Predictive Analytics',
      description: 'Advanced forecasting for proactive business strategy.',
      detailedDescription: 'Predictive models leveraging sophisticated algorithms to anticipate trends and opportunities, providing strategic advantage through foresight.',
      exampleDescription: 'A model for a retailer predicting demand for 2000+ products with 89% accuracy, optimizing inventory and reducing logistics costs by 18%.'
    }
  ],

  'marketing-strategy': [
    {
      title: 'Search Excellence',
      description: 'Strategic SEO for dominant search presence.',
      detailedDescription: 'Sophisticated search strategies elevating visibility and authority, driving qualified traffic through meticulous optimization and content excellence.',
      exampleDescription: 'Getting 15 key search queries for a law firm into the top 3 of Yandex and Google within 6 months through 50+ expert articles, technical base optimization, and link building.'
    },
    {
      title: 'Content Strategy',
      description: 'Compelling content that builds authority and engagement.',
      detailedDescription: 'Content strategies combining storytelling expertise with strategic intent, creating valuable narratives that resonate with audiences and drive action.',
      exampleDescription: 'Content plan for an EdTech platform: 100+ materials from expert articles and case studies to webinars with guest speakers, increasing leads by 300%.'
    },
    {
      title: 'Social Presence',
      description: 'Strategic social media for meaningful audience connections.',
      detailedDescription: 'Sophisticated social strategies fostering genuine community engagement while maintaining brand elegance and strategic positioning.',
      exampleDescription: 'An Instagram campaign for a cosmetics brand: UGC content, challenges, and collaborations with micro-influencers, increasing engagement by 450% in a quarter.'
    },
    {
      title: 'Precision Advertising',
      description: 'Targeted campaigns that maximize return on investment.',
      detailedDescription: 'Advertising approaches combining data intelligence with creative excellence, ensuring every impression delivers value and drives strategic outcomes.',
      exampleDescription: 'LinkedIn retargeting for a B2B service: segmentation by job titles (CTOs, Product Managers) and companies in specific industries, achieving a CPA 3 times lower than market average.'
    },
    {
      title: 'Email Excellence',
      description: 'Personalized communications that nurture relationships.',
      detailedDescription: 'Email strategies balancing automation with personal touch, creating meaningful dialogues that build loyalty and drive retention.',
      exampleDescription: 'Triggered email sequences: welcome series for new users, reactivation for inactive users, and personalized recommendations based on behavior, increasing retention by 40%.'
    },
    {
      title: 'Performance Intelligence',
      description: 'Comprehensive analytics for marketing optimization.',
      detailedDescription: 'Marketing intelligence systems providing elegant insights into campaign performance, enabling continuous refinement and strategic alignment.',
      exampleDescription: 'End-to-end analytics linking ad clicks to sales in CRM, allowing allocation of 80% of the budget to the most effective channels and increasing ROMI by 65%.'
    }
  ],

  'product-development': [
    {
      title: 'Web Applications',
      description: 'Sophisticated web solutions with exceptional user experiences.',
      detailedDescription: 'Elegant web applications combining technical excellence with intuitive design, delivering seamless experiences across all devices and platforms.',
      exampleDescription: 'Progressive Web App for food delivery with menu caching, push notifications on order status, and offline functionality, increasing repeat orders by 55%.'
    },
    {
      title: 'Mobile Excellence',
      description: 'Refined mobile applications with native performance.',
      detailedDescription: 'Mobile solutions embodying the highest standards of design and engineering, creating applications that feel intuitively native and perform flawlessly.',
      exampleDescription: 'Cross-platform fitness tracker app: 60 fps animations, native UX for iOS/Android, autonomous operation for 7+ days on a single charge.'
    },
    {
      title: 'API Architecture',
      description: 'Robust API solutions for seamless integration.',
      detailedDescription: 'Sophisticated API architectures enabling elegant system integrations, ensuring reliability, security, and developer-friendly experiences.',
      exampleDescription: 'RESTful API with versioning, rate limiting, OAuth 2.0 authorization, and Swagger documentation, handling 10k+ requests per second with latency under 50ms.'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud architectures for modern applications.',
      detailedDescription: 'Cloud solutions combining architectural elegance with practical scalability, creating foundations that support growth and innovation.',
      exampleDescription: 'Microservices architecture on Kubernetes for a streaming service with automatic scaling under load, handling 1M+ concurrent connections.'
    },
    {
      title: 'Experience Design',
      description: 'Intuitive interfaces that anticipate user needs.',
      detailedDescription: 'User experiences where every interaction feels natural and purposeful, blending aesthetic appeal with functional excellence.',
      exampleDescription: 'Banking app interface with operation prediction: scheduled transfers, frequently used payments, instant confirmation via Face ID.'
    },
    {
      title: 'Quality Assurance',
      description: 'Comprehensive testing for flawless performance.',
      detailedDescription: 'Quality processes ensuring every deliverable meets the highest standards of reliability, performance, and user satisfaction.',
      exampleDescription: 'Test coverage of 3000+ automated tests (unit, integration, e2e), continuous security scanning, and testing on 50+ real devices, reducing production bugs by 90%.'
    }
  ]
};