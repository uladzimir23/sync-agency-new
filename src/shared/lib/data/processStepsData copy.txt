export interface ProcessStep {
    step: number;
    title: string;
    description: string;
    duration: string;
  }
  
  export const processStepsData = {
    'branding-and-identity': [
      {
        step: 1,
        title: 'Brand Discovery',
        description: 'Dive deep into your business, values, and target audience to understand your essence.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Market Research',
        description: 'Analysis of competitors and industry trends to identify unique positioning opportunities.',
        duration: '1 week'
      },
      {
        step: 3,
        title: 'Concept Development',
        description: 'Creation of initial brand concepts, mood boards, and visual directions for your review.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Design Refinement',
        description: 'Iterative refinement of selected concepts based on your feedback and strategic alignment.',
        duration: '2-3 weeks'
      },
      {
        step: 5,
        title: 'Brand Guidelines',
        description: 'Development of comprehensive guidelines for consistent brand application.',
        duration: '2 weeks'
      },
      {
        step: 6,
        title: 'Asset Delivery',
        description: 'Delivery of all brand assets and guidelines with support for implementation.',
        duration: '1 week'
      }
    ],
  
    'automation-and-infrastructure': [
      {
        step: 1,
        title: 'Infrastructure Assessment',
        description: 'Comprehensive analysis of your current infrastructure and automation needs.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Architecture Design',
        description: 'Design scalable and secure infrastructure architecture tailored to your requirements.',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Setup and configuration of infrastructure using infrastructure as code practices.',
        duration: '3-6 weeks'
      },
      {
        step: 4,
        title: 'Automation Setup',
        description: 'Implementation of CI/CD pipelines and automation workflows for efficient operations.',
        duration: '2-4 weeks'
      },
      {
        step: 5,
        title: 'Testing & Optimization',
        description: 'Rigorous testing and performance optimization of the implemented solutions.',
        duration: '1-2 weeks'
      },
      {
        step: 6,
        title: 'Training & Handover',
        description: 'Comprehensive training and documentation for your team to manage the infrastructure.',
        duration: '1 week'
      }
    ],
  
    'analytics-and-optimization': [
      {
        step: 1,
        title: 'Data Audit',
        description: 'Comprehensive review of your current data collection, tracking, and analysis capabilities.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Goal Definition',
        description: 'Identify key business objectives and define measurable goals and success metrics.',
        duration: '1 week'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Setup of tracking systems, analytics tools, and data collection infrastructure.',
        duration: '2-4 weeks'
      },
      {
        step: 4,
        title: 'Analysis & Insights',
        description: 'Deep analysis of collected data to identify patterns, trends, and optimization opportunities.',
        duration: '2-3 weeks'
      },
      {
        step: 5,
        title: 'Optimization',
        description: 'Implementation of data-driven improvements and A/B testing to validate changes.',
        duration: 'Ongoing'
      },
      {
        step: 6,
        title: 'Reporting & Strategy',
        description: 'Regular reporting and strategic recommendations based on continuous data analysis.',
        duration: 'Monthly'
      }
    ],
  
    'marketing-strategy': [
      {
        step: 1,
        title: 'Market Research',
        description: 'We analyze your industry, competitors, and target audience to identify opportunities.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'We create a comprehensive marketing strategy tailored to your business goals.',
        duration: '2 weeks'
      },
      {
        step: 3,
        title: 'Channel Planning',
        description: 'We select the most effective marketing channels and tactics for your audience.',
        duration: '1 week'
      },
      {
        step: 4,
        title: 'Implementation',
        description: 'Our team executes the marketing strategy across selected channels and platforms.',
        duration: 'Ongoing'
      },
      {
        step: 5,
        title: 'Monitoring & Optimization',
        description: 'We continuously monitor performance and optimize campaigns for better results.',
        duration: 'Ongoing'
      },
      {
        step: 6,
        title: 'Reporting & Analysis',
        description: 'Regular reporting and analysis to demonstrate ROI and inform future strategies.',
        duration: 'Monthly'
      }
    ],
  
    'product-development': [
      {
        step: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your requirements, define project scope, and create detailed specifications.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Our designers create wireframes and prototypes for your review and feedback.',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Development & Implementation',
        description: 'Our developers build your product using agile methodologies and continuous integration.',
        duration: '4-12 weeks'
      },
      {
        step: 4,
        title: 'Testing & Quality Assurance',
        description: 'Rigorous testing ensures your product meets quality standards and user expectations.',
        duration: '1-3 weeks'
      },
      {
        step: 5,
        title: 'Deployment & Launch',
        description: 'We deploy your product to production and ensure a smooth launch process.',
        duration: '1 week'
      },
      {
        step: 6,
        title: 'Maintenance & Support',
        description: 'Ongoing support, updates, and improvements to keep your product running smoothly.',
        duration: 'Ongoing'
      }
    ]
  }