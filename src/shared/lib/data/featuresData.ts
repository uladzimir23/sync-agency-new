export interface Feature {
    title: string;
    description: string;
    detailedDescription: string;
  }
  
  export const featuresData = {
    'branding-and-identity': [
      {
        title: 'Logo Design',
        description: 'Unique and memorable logos that capture your brand essence.',
        detailedDescription: 'Our logo design process begins with deep research into your industry, target audience, and brand values. We create multiple concepts that reflect your unique identity, followed by meticulous refinement. The final logo will be versatile, scalable, and memorable—working across digital and print mediums while maintaining its impact and recognition.'
      },
      {
        title: 'Brand Guidelines',
        description: 'Comprehensive brand standards for consistent application.',
        detailedDescription: 'We develop detailed brand guidelines that serve as your brand\'s rulebook. This includes precise specifications for logo usage, color palettes, typography, imagery style, voice and tone, and application examples. These guidelines ensure every team member and partner represents your brand consistently, building trust and recognition across all touchpoints.'
      },
      {
        title: 'Visual Identity',
        description: 'Cohesive visual systems including colors and typography.',
        detailedDescription: 'Beyond the logo, we craft a complete visual language that tells your brand story. This includes custom color palettes that evoke specific emotions, carefully selected typography that reflects your personality, distinctive graphic elements, and photography guidelines. Every visual component works harmoniously to create a memorable and distinctive brand presence.'
      },
      {
        title: 'Brand Strategy',
        description: 'Strategic positioning that differentiates your brand.',
        detailedDescription: 'We help you define your brand\'s core purpose, positioning, and personality. Through market analysis, competitor research, and audience insights, we develop a strategic foundation that guides all brand decisions. This includes your unique value proposition, brand story, messaging architecture, and customer journey mapping—ensuring every interaction strengthens your brand position.'
      },
      {
        title: 'Packaging Design',
        description: 'Eye-catching packaging that enhances customer experience.',
        detailedDescription: 'Your packaging is often the first physical interaction customers have with your brand. We design packaging that not only protects your product but also tells your story, creates emotional connections, and drives purchase decisions. We consider materials, sustainability, unboxing experience, and shelf impact to create packaging that stands out and builds brand loyalty.'
      },
      {
        title: 'Brand Assets',
        description: 'Complete set of digital and print assets.',
        detailedDescription: 'We deliver a comprehensive suite of brand assets ready for immediate use. This includes all logo variations in multiple formats, social media kits, business stationery, presentation templates, marketing collateral, and digital assets. Each asset is professionally crafted and follows your brand guidelines, saving you time and ensuring professional representation across all platforms.'
      }
    ],
  
    'automation-and-infrastructure': [
      {
        title: 'CI/CD Pipelines',
        description: 'Automated deployment workflows for rapid, reliable, and consistent software releases.',
        detailedDescription: 'We implement robust CI/CD pipelines that automate your entire software delivery process—from code commit to production deployment. Our pipelines include automated testing, security scanning, performance validation, and deployment orchestration. This ensures faster release cycles, higher quality software, and reduced manual errors while maintaining complete visibility and control over your deployment process.'
      },
      {
        title: 'Cloud Infrastructure',
        description: 'Scalable cloud solutions optimized for performance, security, and cost-efficiency.',
        detailedDescription: 'Our cloud infrastructure solutions are designed for scalability, resilience, and cost optimization. We architect multi-region deployments with auto-scaling, load balancing, and disaster recovery capabilities. Using infrastructure as code, we ensure reproducible environments that can scale elastically with your business needs while maintaining strict security protocols and cost controls through continuous monitoring and optimization.'
      },
      {
        title: 'Infrastructure as Code',
        description: 'Manage and provision infrastructure through code for reproducibility and version control.',
        detailedDescription: 'We transform your infrastructure management using Infrastructure as Code (IaC) principles. By defining your entire infrastructure in version-controlled code, we eliminate manual configuration drift and enable reproducible environments across development, staging, and production. Our IaC implementations include comprehensive testing, security scanning, and automated provisioning workflows that reduce deployment time from days to minutes.'
      },
      {
        title: 'Monitoring & Alerting',
        description: 'Real-time system monitoring and proactive alerting to ensure optimal performance.',
        detailedDescription: 'Our comprehensive monitoring solutions provide deep visibility into your system performance, application health, and business metrics. We implement real-time dashboards, automated alerting, and predictive analytics to identify issues before they impact users. With custom metrics, log aggregation, and performance tracing, we give you actionable insights to optimize system performance and user experience continuously.'
      },
      {
        title: 'Security Automation',
        description: 'Automated security scanning and compliance checks to protect your systems.',
        detailedDescription: 'We integrate security automation throughout your development lifecycle, from code commit to production. Our security automation includes vulnerability scanning, compliance validation, secret detection, and threat modeling. Automated security gates prevent vulnerabilities from reaching production, while continuous monitoring detects and responds to threats in real-time, ensuring your systems remain secure and compliant with industry standards.'
      },
      {
        title: 'Database Management',
        description: 'Optimized database solutions with automated backups, scaling, and performance tuning.',
        detailedDescription: 'Our database management solutions ensure high performance, reliability, and scalability for your data layer. We implement automated backup and recovery strategies, performance optimization, query analysis, and scaling solutions. With comprehensive monitoring and automated maintenance tasks, we ensure your databases operate efficiently while providing robust disaster recovery capabilities and data integrity safeguards.'
      }
    ],
  
    'analytics-and-optimization': [
      {
        title: 'Performance Analytics',
        description: 'Comprehensive tracking and analysis of system performance and user experience metrics.',
        detailedDescription: 'We implement sophisticated performance analytics that track every aspect of your system\'s behavior and user interactions. Our solutions monitor page load times, API response times, error rates, and user journey performance. By correlating technical metrics with business outcomes, we identify optimization opportunities that directly impact conversion rates, user satisfaction, and operational efficiency.'
      },
      {
        title: 'User Behavior Analysis',
        description: 'Deep insights into how users interact with your product and identify improvement opportunities.',
        detailedDescription: 'Through advanced user behavior analysis, we uncover how customers actually use your product—where they succeed, where they struggle, and what drives engagement. Using session recordings, heatmaps, and funnel analysis, we identify friction points and optimization opportunities. This deep understanding enables data-driven design decisions that improve user experience and drive key business metrics.'
      },
      {
        title: 'A/B Testing',
        description: 'Data-driven experimentation to test and validate improvements and new features.',
        detailedDescription: 'Our A/B testing framework enables systematic experimentation to validate every change before full deployment. We design statistically sound experiments, implement robust testing infrastructure, and analyze results to make confident decisions. From UI changes to new features, our testing approach minimizes risk while maximizing learning and ensuring that every deployment contributes positively to your business goals.'
      },
      {
        title: 'Conversion Optimization',
        description: 'Strategies and implementations to improve conversion rates and user engagement.',
        detailedDescription: 'We take a holistic approach to conversion optimization, combining quantitative data with qualitative insights to identify and address conversion barriers. Our process includes user journey analysis, hypothesis development, rapid experimentation, and implementation of winning variations. We focus on both micro-conversions and macro-conversions to create a frictionless experience that guides users toward your desired outcomes.'
      },
      {
        title: 'Data Visualization',
        description: 'Clear and actionable dashboards that make complex data understandable and useful.',
        detailedDescription: 'We transform complex data into intuitive, actionable visualizations that empower your team to make informed decisions. Our custom dashboards provide real-time insights into key business metrics, user behavior, and system performance. Using best practices in data visualization, we ensure that stakeholders at all levels can quickly understand trends, identify opportunities, and track progress toward business objectives.'
      },
      {
        title: 'Predictive Analytics',
        description: 'Advanced analytics to forecast trends and user behavior for proactive decision making.',
        detailedDescription: 'Our predictive analytics solutions leverage machine learning and statistical modeling to forecast future trends, user behavior, and business outcomes. We build models that predict customer churn, lifetime value, demand patterns, and system performance. These insights enable proactive decision-making, resource optimization, and strategic planning that keeps you ahead of market trends and customer needs.'
      }
    ],
  
    'marketing-strategy': [
      {
        title: 'SEO Optimization',
        description: 'Improve your search engine rankings and organic visibility with data-driven strategies.',
        detailedDescription: 'Our SEO optimization combines technical excellence with content strategy to maximize your organic visibility. We conduct comprehensive site audits, keyword research, and competitor analysis to identify high-impact opportunities. Our holistic approach includes on-page optimization, technical SEO improvements, content strategy development, and ongoing performance monitoring to drive sustainable organic growth and qualified traffic.'
      },
      {
        title: 'Content Marketing',
        description: 'Engaging content that converts visitors into customers and builds brand authority.',
        detailedDescription: 'We develop content marketing strategies that position your brand as an industry authority while driving measurable business results. Our approach includes content planning, creation, distribution, and performance analysis. From blog posts and whitepapers to video content and case studies, we create valuable, engaging content that addresses customer pain points, builds trust, and guides prospects through the buyer journey.'
      },
      {
        title: 'Social Media Strategy',
        description: 'Strategic social media campaigns that engage audiences and drive conversions.',
        detailedDescription: 'Our social media strategies combine platform expertise with data-driven insights to build engaged communities and drive business outcomes. We develop platform-specific content strategies, community management protocols, and paid social campaigns that align with your brand voice and business objectives. Through continuous optimization and performance analysis, we ensure your social presence delivers tangible ROI.'
      },
      {
        title: 'PPC Advertising',
        description: 'Targeted paid advertising campaigns that maximize ROI and reach your ideal customers.',
        detailedDescription: 'We create sophisticated PPC campaigns that target your ideal customers across search, social, and display networks. Our data-driven approach includes audience research, keyword strategy, bid optimization, and continuous A/B testing. With advanced tracking and attribution modeling, we maximize return on ad spend while gathering valuable insights about your target audience and their conversion patterns.'
      },
      {
        title: 'Email Marketing',
        description: 'Personalized email campaigns that nurture leads and build customer relationships.',
        detailedDescription: 'Our email marketing strategies focus on building lasting customer relationships through personalized, relevant communication. We design automated nurture sequences, segmentation strategies, and lifecycle campaigns that deliver the right message to the right audience at the right time. Through rigorous testing and optimization, we maximize engagement, retention, and lifetime customer value.'
      },
      {
        title: 'Analytics & Reporting',
        description: 'Comprehensive tracking and reporting to measure performance and optimize strategies.',
        detailedDescription: 'We implement comprehensive analytics frameworks that provide clear visibility into marketing performance across all channels. Our custom dashboards and automated reports track key metrics, attribution, and ROI. By connecting marketing efforts to business outcomes, we enable data-driven decision making and continuous optimization of your marketing strategy for maximum impact and efficiency.'
      }
    ],
  
    'product-development': [
      {
        title: 'Web Applications',
        description: 'Modern, responsive web applications built with cutting-edge technologies and best practices.',
        detailedDescription: 'We build sophisticated web applications that deliver exceptional user experiences across all devices. Using modern frameworks and cloud-native architectures, we create scalable, secure, and maintainable solutions. Our development process emphasizes performance optimization, accessibility, and user-centered design to ensure your web application not only meets but exceeds user expectations and business requirements.'
      },
      {
        title: 'Mobile Apps',
        description: 'iOS and Android native applications with seamless user experiences and native performance.',
        detailedDescription: 'Our mobile app development delivers native experiences optimized for each platform while maintaining code efficiency. We follow platform-specific design guidelines and leverage native APIs to create fast, responsive, and feature-rich applications. From concept to deployment, we ensure your mobile app provides intuitive navigation, smooth performance, and delivers value to users wherever they are.'
      },
      {
        title: 'API Development',
        description: 'Robust RESTful and GraphQL APIs for seamless integration and scalability.',
        detailedDescription: 'We design and build robust APIs that serve as the backbone of your digital ecosystem. Our API development focuses on performance, security, and developer experience. We implement comprehensive documentation, versioning strategies, and monitoring solutions to ensure your APIs are reliable, scalable, and easy to integrate with internal systems and third-party services.'
      },
      {
        title: 'Cloud Architecture',
        description: 'Scalable cloud solutions optimized for performance, security, and cost-efficiency.',
        detailedDescription: 'Our cloud architecture designs leverage the full potential of modern cloud platforms to create scalable, resilient, and cost-effective solutions. We architect distributed systems with auto-scaling, load balancing, and fault tolerance. Our infrastructure designs prioritize security, performance monitoring, and cost optimization while maintaining flexibility for future growth and technology evolution.'
      },
      {
        title: 'UI/UX Design',
        description: 'User-centered design approaches that create intuitive and engaging experiences.',
        detailedDescription: 'Our UI/UX design process begins with deep user research and continues through iterative prototyping and testing. We create intuitive interfaces that balance business goals with user needs. Our design system approach ensures consistency across all touchpoints while maintaining flexibility for innovation. The result is engaging experiences that drive user satisfaction and business success.'
      },
      {
        title: 'Quality Assurance',
        description: 'Comprehensive testing strategies to ensure reliability and performance.',
        detailedDescription: 'Our quality assurance process integrates testing throughout the development lifecycle. We implement automated testing, manual testing, and user acceptance testing to ensure software reliability, security, and performance. Our comprehensive QA strategy includes test planning, defect tracking, and quality metrics that provide confidence in every release while maintaining development velocity.'
      }
    ]
  }