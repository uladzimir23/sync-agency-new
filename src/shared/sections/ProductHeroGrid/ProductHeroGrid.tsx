import React from 'react';
import { ProductHeroSection } from '../ProductHeroSection';
import styles from './ProductHeroGrid.module.scss';
import { HeroBackgroundType } from '@/shared/ui/hero-background';

export interface ProductHeroItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  backgroundType: HeroBackgroundType;
}

interface ProductHeroGridProps {
  items?: ProductHeroItem[];
  onItemClick?: (id: string) => void;
  className?: string;
}

const DEFAULT_ITEMS: ProductHeroItem[] = [
  {
    id: 'brand-identity',
    title: 'Bránd Idéntity',
    subtitle: '·Unique Brand Design·',
    description: 'We Build strong, strategic brand systems with expressive identity, naming, tone of voice, and visual language to amplify positioning and ensure recognition.',
    ctaText: 'Create Your Brand',
    backgroundType: 'brand' as HeroBackgroundType
  },
  {
    id: 'marketing-strategy',
    title: 'Márketing Strátegy',
    subtitle: '·Effective Growth Strategies·',
    description: 'We Create multi-stage marketing funnels and drive measurable business growth through conversion-driven, data-powered, and insight-led performance campaigns.',
    ctaText: 'Discuss Your Strategy',
    backgroundType: 'marketing' as HeroBackgroundType
  },
  {
    id: 'product-development',
    title: 'Próduct Devélopment',
    subtitle: '·Reliable Digital Products·',
    description: 'We Design and build scalable digital products with reliable architecture and seamless integrations that support long-term growth and excellent user experience.',
    ctaText: 'Start Your Project',
    backgroundType: 'product' as HeroBackgroundType
  },
  {
    id: 'performance-intelligence',
    title: 'Perfórmance Intélligence',
    subtitle: '·Data-Backed Decisions·',
    description: 'We Collect, analyze, and act on data across all stages of the funnel to ensure continuous performance improvement, optimization, and real-time decision-making.',
    ctaText: 'Optimize With Data',
    backgroundType: 'data' as HeroBackgroundType
  },
  {
    id: 'infrastructure-automation',
    title: 'Ínfrastructure Automátion',
    subtitle: '·Efficient Systems·',
    description: 'We Automate operations, connect internal and external systems, and streamline processes through custom logic, APIs, and scenario-based automation layers.',
    ctaText: 'Optimize Your Infrastructure',
    backgroundType: 'automation' as HeroBackgroundType
  }
];

export const ProductHeroGrid: React.FC<ProductHeroGridProps> = ({
  items = DEFAULT_ITEMS,
  onItemClick,
  className = ''
}) => {
  const handleItemClick = (id: string) => {
    console.log(`ProductHeroGrid item clicked: ${id}`);
    onItemClick?.(id);
  };

  return (
    <div className={`${styles.gridContainer} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={styles.gridItem}>
          <ProductHeroSection
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            ctaText={item.ctaText}
            onCtaClick={() => handleItemClick(item.id)}
            backgroundType={item.backgroundType}
          />
        </div>
      ))}
    </div>
  );
};