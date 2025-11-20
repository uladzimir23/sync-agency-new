export interface FAQData {
    [key: string]: {
      title?: string
      items: Array<{
        question: string
        answer: string
      }>
    }
  }
  
  export const faqData: FAQData = {
    // Branding & Identity FAQ
    'branding-and-identity': {
      title: 'Branding & Identity Questions',
      items: [
        {
          question: 'Why are brand guidelines important?',
          answer: 'Brand guidelines ensure consistency across all channels and touchpoints, helping build recognition faster and maintain a cohesive brand identity that resonates with your audience. They provide clear rules for logo usage, typography, colors, and tone of voice.'
        },
        {
          question: 'How long does it take to create a logo and identity?',
          answer: 'Typically 2–4 weeks for a complete brand identity, depending on the complexity of your business, number of revisions, and the depth of brand strategy required. We follow a structured process to ensure every element aligns with your business goals.'
        },
        {
          question: 'Can you refresh an old brand without fully rebranding?',
          answer: 'Absolutely. We specialize in brand evolution that preserves existing recognition while modernizing your visual identity to stay relevant and competitive. We analyze what works in your current brand and strategically update elements that need improvement.'
        },
        {
          question: 'What is Tone of Voice, and why does it matter?',
          answer: 'Tone of Voice defines how your brand communicates with your audience—whether serious, friendly, playful, or professional. It ensures consistent messaging that aligns with your brand personality and helps build stronger connections with your target market.'
        },
        {
          question: 'Do you provide all file formats for the final deliverables?',
          answer: 'Yes, we deliver comprehensive brand packages including vector files (AI, EPS), high-resolution formats (PNG, JPG), and web-optimized versions for all digital applications. You\'ll receive everything needed for both print and digital use.'
        },
        {
          question: 'How do you ensure our brand stands out from competitors?',
          answer: 'We conduct thorough market research and competitor analysis to identify unique positioning opportunities, then craft distinctive visual elements that differentiate your brand while maintaining relevance to your industry and target audience.'
        }
      ]
    },
  
    // Product Development FAQ
    'product-development': {
      title: 'Product Development Questions',
      items: [
        {
          question: 'What technologies do you use for product development?',
          answer: 'We use modern tech stacks including React, Node.js, Python, TypeScript, and cloud platforms like AWS and Azure, choosing the best tools for your specific project requirements, scalability needs, and team expertise.'
        },
        {
          question: 'How do you handle project management and communication?',
          answer: 'We use agile methodologies with regular sprints, daily standups, and transparent communication tools like Slack and Jira to keep you informed throughout development. You\'ll have direct access to the team and regular progress updates.'
        },
        {
          question: 'Can you work with our existing development team?',
          answer: 'Yes, we often collaborate with in-house teams, providing expertise in specific areas or helping scale development capacity during critical project phases. We adapt to your workflows and tools for seamless integration.'
        },
        {
          question: 'What is your approach to testing and quality assurance?',
          answer: 'We implement comprehensive testing strategies including unit tests, integration tests, end-to-end testing, and user acceptance testing to ensure product reliability, performance, and excellent user experience.'
        },
        {
          question: 'How do you handle post-launch support and maintenance?',
          answer: 'We offer flexible support packages including bug fixes, feature updates, performance monitoring, and security patches to ensure your product continues to perform optimally and adapts to changing requirements.'
        },
        {
          question: 'What is your typical development timeline?',
          answer: 'Timelines vary by project complexity, but most MVPs take 8-12 weeks, with full-scale products typically completed within 4-6 months. We provide detailed project plans with clear milestones and deliverables.'
        }
      ]
    },
  
    // Marketing Strategy FAQ
    'marketing-strategy': {
      title: 'Marketing Strategy Questions',
      items: [
        {
          question: 'How do you measure marketing campaign success?',
          answer: 'We track KPIs like conversion rates, customer acquisition cost, ROI, engagement metrics, and lifetime value, providing detailed analytics dashboards for transparent reporting and data-driven optimization.'
        },
        {
          question: 'What channels do you recommend for B2B vs B2C marketing?',
          answer: 'For B2B: LinkedIn, content marketing, email campaigns, and industry events. For B2C: social media, influencer partnerships, targeted digital advertising, and community building based on audience behavior and preferences.'
        },
        {
          question: 'How long until we see results from marketing efforts?',
          answer: 'Initial results can appear within 2-4 weeks for paid campaigns, while organic growth and SEO typically show significant impact within 3-6 months. We set realistic expectations and focus on sustainable long-term growth.'
        },
        {
          question: 'Do you handle international marketing campaigns?',
          answer: 'Yes, we develop localized strategies considering cultural nuances, language differences, and regional market trends for global brand presence. We have experience managing multi-region campaigns across different time zones.'
        },
        {
          question: 'How do you stay updated with marketing trends?',
          answer: 'Our team continuously researches emerging trends, attends industry conferences, tests new platforms, and analyzes performance data to ensure strategies remain cutting-edge and effectively reach target audiences.'
        },
        {
          question: 'What is included in your marketing strategy package?',
          answer: 'Comprehensive market analysis, channel strategy, content plan, budget allocation, KPI framework, competitor analysis, and detailed implementation roadmap with measurable objectives and regular performance reviews.'
        }
      ]
    },
  
    // Automation & Infrastructure FAQ
    'automation-and-infrastructure': {
      title: 'Automation & Infrastructure Questions',
      items: [
        {
          question: 'What types of processes can you automate?',
          answer: 'We automate repetitive tasks, data processing, deployment pipelines, testing workflows, customer onboarding, reporting, and business processes to improve efficiency, reduce human error, and free up your team for strategic work.'
        },
        {
          question: 'How do you ensure infrastructure security?',
          answer: 'We implement security best practices including encryption, access controls, regular security audits, vulnerability scanning, and compliance with industry standards like SOC2, GDPR, and ISO 27001.'
        },
        {
          question: 'Can you work with our existing infrastructure?',
          answer: 'Yes, we assess your current setup and develop migration or integration strategies that minimize disruption while modernizing your infrastructure. We ensure compatibility and smooth transition to new systems.'
        },
        {
          question: 'What cloud platforms do you support?',
          answer: 'We work with AWS, Google Cloud, Azure, and hybrid solutions, choosing the platform that best fits your technical requirements, business goals, budget constraints, and existing technology stack.'
        },
        {
          question: 'How do you handle scalability and performance?',
          answer: 'We design architectures with auto-scaling, load balancing, caching strategies, and performance monitoring to ensure your systems handle growth without compromising speed, reliability, or user experience.'
        },
        {
          question: 'What is Infrastructure as Code (IaC)?',
          answer: 'IaC manages and provisions infrastructure through code instead of manual processes, ensuring consistency, version control, reproducibility across environments, faster deployments, and reduced configuration errors.'
        }
      ]
    },
  
    // Analytics & Optimization FAQ
    'analytics-and-optimization': {
      title: 'Analytics & Optimization Questions',
      items: [
        {
          question: 'What analytics tools do you integrate?',
          answer: 'We work with Google Analytics, Mixpanel, Hotjar, Amplitude, and custom solutions, choosing tools that provide the insights most relevant to your business objectives, user behavior, and conversion goals.'
        },
        {
          question: 'How do you ensure data privacy compliance?',
          answer: 'We implement GDPR, CCPA, and other privacy regulations, ensuring proper data anonymization, user consent management, secure data handling practices, and transparent data collection policies.'
        },
        {
          question: 'What is the typical A/B testing process?',
          answer: 'We identify test opportunities, create hypotheses, implement variations, run statistical tests with adequate sample sizes, and analyze results to make data-driven optimization decisions that improve user experience and conversions.'
        },
        {
          question: 'How often should we review analytics reports?',
          answer: 'We recommend weekly performance reviews for tactical adjustments and monthly deep-dive analysis for strategic decisions, with real-time dashboards for ongoing monitoring of key metrics and immediate insights.'
        },
        {
          question: 'Can you help set up custom tracking events?',
          answer: 'Yes, we implement custom event tracking for specific user actions, conversion funnels, feature usage, and business metrics that matter most to your success, providing actionable insights beyond standard analytics.'
        },
        {
          question: 'How do you translate data into actionable insights?',
          answer: 'We combine quantitative data with qualitative research, user feedback, and business context to identify patterns, uncover user behavior insights, and provide clear, prioritized recommendations for improvement and growth opportunities.'
        }
      ]
    }
  }