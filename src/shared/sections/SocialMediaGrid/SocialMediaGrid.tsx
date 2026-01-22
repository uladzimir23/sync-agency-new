import React from 'react';
import { 
  FaTelegram, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaBehance, 
  FaDribbble, 
  FaGithub, 
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp
} from 'react-icons/fa';
import { SiNotion, SiDiscord } from 'react-icons/si';
import styles from './SocialMediaGrid.module.scss';

interface SocialMediaItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  description: string;
  gradient: string;
}

interface SocialMediaGridProps {
  title?: string;
  subtitle?: string;
  columns?: 3 | 4 | 5 | 6;
  showDescriptions?: boolean;
  className?: string;
}

export const SocialMediaGrid: React.FC<SocialMediaGridProps> = ({
  title = "Connect With Us",
  subtitle = "Follow our journey across digital platforms",
  columns = 4,
  showDescriptions = true,
  className = ''
}) => {
  // Определяем размер сетки в зависимости от количества колонок
  const gridClass = {
    3: styles.gridThree,
    4: styles.gridFour,
    5: styles.gridFive,
    6: styles.gridSix,
  }[columns];

  const socialMediaItems: SocialMediaItem[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <FaTelegram />,
      url: 'https://t.me/sync_agency',
      color: '#0088cc',
      description: 'Join our community for updates and discussions',
      gradient: 'linear-gradient(135deg, #0088cc 0%, #0055aa 100%)'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/sync.agency',
      color: '#E4405F',
      description: 'Behind-the-scenes and visual storytelling',
      gradient: 'linear-gradient(45deg, #833AB4, #E1306C, #F77737)'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: <FaWhatsapp />,
        url: 'https://wa.me/your-number',
        color: '#25D366',
        description: 'Direct messaging for inquiries',
        gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: 'https://linkedin.com/company/sync-agency',
      color: '#0077B5',
      description: 'Professional network and company updates',
      gradient: 'linear-gradient(135deg, #0077B5 0%, #005582 100%)'
    },
    // {
    //   id: 'twitter',
    //   name: 'Twitter',
    //   icon: <FaTwitter />,
    //   url: 'https://twitter.com/sync_agency',
    //   color: '#1DA1F2',
    //   description: 'News, insights, and industry trends',
    //   gradient: 'linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)'
    // },
    {
      id: 'behance',
      name: 'Behance',
      icon: <FaBehance />,
      url: 'https://behance.net/syncagency',
      color: '#0057FF',
      description: 'Our creative portfolio and design work',
      gradient: 'linear-gradient(135deg, #0057FF 0%, #0033aa 100%)'
    },
    // {
    //   id: 'dribbble',
    //   name: 'Dribbble',
    //   icon: <FaDribbble />,
    //   url: 'https://dribbble.com/syncagency',
    //   color: '#EA4C89',
    //   description: 'Design shots and creative concepts',
    //   gradient: 'linear-gradient(135deg, #EA4C89 0%, #c32369 100%)'
    // },
    // {
    //   id: 'github',
    //   name: 'GitHub',
    //   icon: <FaGithub />,
    //   url: 'https://github.com/sync-agency',
    // //   color: '#0FBF3E',
    //   color: 'invert',
    //   description: 'Open-source projects and contributions',
    //   gradient: 'linear-gradient(135deg, #333 0%, #181717 100%)'
    // },
    // {
    //   id: 'youtube',
    //   name: 'YouTube',
    //   icon: <FaYoutube />,
    //   url: 'https://youtube.com/@syncagency',
    //   color: '#FF0000',
    //   description: 'Tutorials, case studies, and video content',
    //   gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)'
    // },
    // {
    //   id: 'tiktok',
    //   name: 'TikTok',
    //   icon: <FaTiktok />,
    //   url: 'https://tiktok.com/@sync.agency',
    //   color: 'invert',
    //   //color: '#25F4EE',
    //   description: 'Short-form creative content',
    //   gradient: 'linear-gradient(135deg, #000000 0%, #333333 50%, #69C9D0 100%)'
    // },
    // {
    //   id: 'facebook',
    //   name: 'Facebook',
    //   icon: <FaFacebookF />,
    //   url: 'https://facebook.com/syncagency',
    //   color: '#1877F2',
    //   description: 'Community and company updates',
    //   gradient: 'linear-gradient(135deg, #1877F2 0%, #0d5cb6 100%)'
    // },
    // {
    //   id: 'pinterest',
    //   name: 'Pinterest',
    //   icon: <FaPinterestP />,
    //   url: 'https://pinterest.com/syncagency',
    //   color: '#E60023',
    //   description: 'Visual inspiration and mood boards',
    //   gradient: 'linear-gradient(135deg, #E60023 0%, #a3001a 100%)'
    // },
    // {
    //   id: 'discord',
    //   name: 'Discord',
    //   icon: <SiDiscord />,
    //   url: 'https://discord.gg/syncagency',
    //   color: '#5865F2',
    //   description: 'Community chat and discussions',
    //   gradient: 'linear-gradient(135deg, #5865F2 0%, #404EED 100%)'
    // },
    // {
    //   id: 'notion',
    //   name: 'Notion',
    //   icon: <SiNotion />,
    //   url: 'https://www.notion.so/syncagency',
    //   color: 'invert',
    //   description: 'Resources, templates, and knowledge base',
    //   gradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)'
    // }
  ];

  const handleSocialClick = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log(`Navigating to ${name}`);
  };

  return (
    <section className={`${styles.socialMediaGrid} ${className}`}>
      <div className={styles.container}>
        {/* Заголовок и подзаголовок */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* Сетка социальных сетей */}
        <div className={`${styles.grid} ${gridClass}`}>
          {socialMediaItems.map((item) => (
            <div
              key={item.id}
              className={styles.gridItem}
              onClick={() => handleSocialClick(item.url, item.name)}
              style={{ '--item-color': item.color, '--item-gradient': item.gradient } as React.CSSProperties}
            >
              <div className={styles.itemContent}>
                {/* Иконка */}
                <div className={styles.iconWrapper}>
                  <div className={styles.iconBackground} />
                  <div className={styles.icon}>
                    {item.icon}
                  </div>
                </div>

                {/* Название */}
                <h3 className={styles.itemName}>{item.name}</h3>

                {/* Описание (если включено) */}
                {showDescriptions && (
                  <p className={styles.itemDescription}>{item.description}</p>
                )}

                {/* Индикатор перехода */}
                <div className={styles.arrowIndicator}>
                  <span className={styles.arrow}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Призыв к действию
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Follow us for updates, insights, and creative inspiration
          </p>
          <a 
            href="https://t.me/sync_agency" 
            className={styles.primaryButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Our Telegram Community
          </a>
        </div> */}
      </div>
    </section>
  );
};