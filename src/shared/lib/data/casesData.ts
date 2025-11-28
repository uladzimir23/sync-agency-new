import { Case } from '../../types/case.types';

export const casesData: Case[] = [
  {
    id: '1',
    company: 'EQT',
    category: 'Branding & Identity',
    title: 'Development of a modern and scalable visual identity system for a real estate agency operating in the premium housing segment.',
    description: 'Creation of a full branding package for EQT — a real estate agency focused on the Dubai market. From logo and typography to stationery, web presence and signage, the project establishes a unified visual language that reflects trust, structure, and growth',
    images: [
      {
        id: 'eqt-branding-1',
        url: 'https://static.tildacdn.com/tild3338-6564-4437-b930-616539306263/bveibve.png',
        alt: 'EQT Branding & Identity - Main visual identity'
      },
      {
        id: 'eqt-branding-2',
        url: 'https://static.tildacdn.com/tild3338-6564-4437-b930-616539306263/bveibve.png',
        alt: 'EQT Branding & Identity - Additional branding elements'
      }
    ],
    tags: ['Branding', 'Identity', 'Real Estate', 'Dubai']
  },
  {
    id: '2',
    company: 'EQT',
    category: 'Marketing Strategy',
    title: 'Full-cycle marketing and sales infrastructure for a Dubai-based real estate agency',
    description: 'We built a complete digital system: strategy, creative identity, advertising funnels, project websites, SEO, and analytics — all aligned for luxury property sales',
    images: [
      {
        id: 'eqt-marketing-1',
        url: 'https://static.tildacdn.com/tild3031-6262-4437-a336-396335643136/vbhrunvr.png',
        alt: 'EQT Marketing Strategy - Digital marketing dashboard'
      },
      {
        id: 'eqt-marketing-2',
        url: 'https://static.tildacdn.com/tild3031-6262-4437-a336-396335643136/vbhrunvr.png',
        alt: 'EQT Marketing Strategy - Campaign analytics'
      }
    ],
    tags: ['Marketing', 'Strategy', 'Sales', 'Digital']
  },
  {
    id: '3',
    company: 'EQT',
    category: 'Corporate Websites',
    title: 'Launchpad for Luxury:<br> 4 Custom Dubai Property Project Landing Pages',
    description: 'Engineered dedicated launch platforms for four exclusive Dubai real estate developments. Crafted tailored user experiences, persuasive content, and conversion-optimized designs for each project',
    images: [
      {
        id: 'eqt-websites-1',
        url: 'https://static.tildacdn.com/tild3964-3430-4565-b937-333037616561/eqt3mobile.png',
        alt: 'EQT Corporate Websites - Main landing page design'
      }
    ],
    tags: ['Web Development', 'Landing Pages', 'Real Estate', 'UX/UI']
  },
  {
    id: '4',
    company: 'Dashboard',
    category: 'Web Applications',
    title: 'Development of an interface prototype for managing external communications',
    description: 'An innovative platform that combines email, messaging apps, and social media in a single workspace. Key features include email automation, feedback monitoring, AI-powered sentiment analysis, and task prioritization',
    images: [
      {
        id: 'dashboard-app-1',
        url: 'https://static.tildacdn.com/tild3164-3430-4134-b834-303161653430/vbehjevbnjek.png',
        alt: 'Dashboard Web Application - Main interface view'
      },
      {
        id: 'dashboard-app-2',
        url: 'https://static.tildacdn.com/tild3164-3430-4134-b834-303161653430/vbehjevbnjek.png',
        alt: 'Dashboard Web Application - Analytics dashboard'
      }
    ],
    tags: ['Web App', 'Dashboard', 'Communication', 'AI']
  },
  {
    id: '5',
    company: 'Coiner',
    category: 'MVP Development',
    title: 'Development of an interface for a crypto exchange and a crypto wallet',
    description: 'A platform for instant cryptocurrency exchange with trader ratings and a secure multi-currency wallet. Created for those who love speed, transparency, and competition',
    images: [
      {
        id: 'coiner-mvp-1',
        url: 'https://static.tildacdn.com/tild3139-6131-4266-b566-336161326338/coiner2mobile.png',
        alt: 'Coiner MVP - Exchange interface'
      }
    ],
    tags: ['Crypto', 'Exchange', 'Wallet', 'Fintech']
  },
  {
    id: '6',
    company: 'Garden',
    category: 'Product Design',
    title: 'Smart Home Greenhouse with AI Ecosystem Management',
    description: 'Visualization of the concept of a compact home greenhouse with a closed ecosystem, where all environmental parameters are controlled by artificial intelligence. From design to operational logic, the project is created using neural network tools and adapted to the real tasks of gardeners',
    images: [
      {
        id: 'garden-design-1',
        url: 'https://static.tildacdn.com/tild3739-3961-4631-b339-363338616535/photo.png',
        alt: 'Garden Product Design - Main product visualization'
      }
    ],
    tags: ['IoT', 'AI', 'Smart Home', 'Product Design']
  },
  {
    id: '7',
    company: 'Your Company',
    category: 'Your Request',
    title: 'Here could be the story of your success',
    description: 'We create not just tools, but ecosystems for communications. We unite disparate communication channels, implement AI analytics and automation so that you can not just react, but anticipate customer needs, manage reputation and build long-term relationships',
    images: [
      {
        id: 'your-company-1',
        url: 'https://static.tildacdn.com/tild6339-6532-4338-a131-646466343932/_.png',
        alt: 'Your Company - Potential collaboration overview'
      },
      {
        id: 'your-company-2',
        url: 'https://static.tildacdn.com/tild6339-6532-4338-a131-646466343932/_.png',
        alt: 'Your Company - Success metrics and results'
      }
    ],
    tags: ['Custom Solution', 'Consultation', 'Partnership']
  }
];

// Функция для получения кейсов по категории
export const getCasesByCategory = (category: string): Case[] => {
  return casesData.filter(caseItem => caseItem.category === category);
};

// Функция для получения кейсов по компании
export const getCasesByCompany = (company: string): Case[] => {
  return casesData.filter(caseItem => caseItem.company === company);
};

// Функция для получения уникальных категорий
export const getUniqueCategories = (): string[] => {
  return [...new Set(casesData.map(caseItem => caseItem.category))];
};

// Функция для получения уникальных компаний
export const getUniqueCompanies = (): string[] => {
  return [...new Set(casesData.map(caseItem => caseItem.company))];
};