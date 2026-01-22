import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './MarketingBackground.module.scss';

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

/* ------------------------------------------------------------------ */
/* Socials config (локально, часть design system)                      */
/* ------------------------------------------------------------------ */

const SOCIAL_ITEMS = [
     {
       id: 'telegram',
       name: 'Telegram',
       icon: <FaTelegram />,
       url: 'https://t.me/sync_agency',
       color: '#0088cc',
       description: 'Join our community for updates and discussions',
       gradient: 'linear-gradient(135deg,rgba(0, 136, 204, 0.1) 0%,rgba(0, 85, 170, 0.1) 100%)'
     },
     {
       id: 'instagram',
       name: 'Instagram',
       icon: <FaInstagram />,
       url: 'https://instagram.com/sync.agency',
       color: '#E4405F',
       description: 'Behind-the-scenes and visual storytelling',
       gradient: 'linear-gradient(45deg,rgba(131, 58, 180, 0.1),rgba(225, 48, 107, 0.1),rgba(247, 119, 55, 0.1))'
     },
     {
         id: 'whatsapp',
         name: 'WhatsApp',
         icon: <FaWhatsapp />,
         url: 'https://wa.me/your-number',
         color: '#25D366',
         description: 'Direct messaging for inquiries',
         gradient: 'linear-gradient(135deg,rgba(37, 211, 101, 0.1) 0%,rgba(18, 140, 126, 0.1) 100%)'
     },
     {
       id: 'linkedin',
       name: 'LinkedIn',
       icon: <FaLinkedinIn />,
       url: 'https://linkedin.com/company/sync-agency',
       color: '#0077B5',
       description: 'Professional network and company updates',
       gradient: 'linear-gradient(135deg,rgba(0, 118, 181, 0.1) 0%,rgba(0, 85, 130, 0.1) 100%)'
     },
     {
       id: 'twitter',
       name: 'Twitter',
       icon: <FaTwitter />,
       url: 'https://twitter.com/sync_agency',
       color: '#1DA1F2',
       description: 'News, insights, and industry trends',
       gradient: 'linear-gradient(135deg,rgba(29, 160, 242, 0.1) 0%,rgba(13, 139, 217, 0.1) 100%)'
     },
     {
       id: 'behance',
       name: 'Behance',
       icon: <FaBehance />,
       url: 'https://behance.net/syncagency',
       color: '#0057FF',
       description: 'Our creative portfolio and design work',
       gradient: 'linear-gradient(135deg,rgba(0, 85, 255, 0.1) 0%,rgba(0, 51, 170, 0.1) 100%)'
     },
     {
       id: 'dribbble',
       name: 'Dribbble',
       icon: <FaDribbble />,
       url: 'https://dribbble.com/syncagency',
       color: '#EA4C89',
       description: 'Design shots and creative concepts',
       gradient: 'linear-gradient(135deg,rgba(234, 76, 137, 0.1) 0%,rgba(195, 35, 104, 0.1) 100%)'
     },
     {
       id: 'github',
       name: 'GitHub',
       icon: <FaGithub />,
       url: 'https://github.com/sync-agency',
     //   color: '#0FBF3E',
       color: 'invert',
       description: 'Open-source projects and contributions',
       gradient: 'linear-gradient(135deg,rgba(51, 51, 51, 0.1) 0%,rgba(24, 23, 23, 0.1) 100%)'
     },
     {
       id: 'youtube',
       name: 'YouTube',
       icon: <FaYoutube />,
       url: 'https://youtube.com/@syncagency',
       color: '#FF0000',
       description: 'Tutorials, case studies, and video content',
       gradient: 'linear-gradient(135deg,rgba(255, 0, 0, 0.1) 0%,rgba(204, 0, 0, 0.1) 100%)'
     },
     {
       id: 'tiktok',
       name: 'TikTok',
       icon: <FaTiktok />,
       url: 'https://tiktok.com/@sync.agency',
       color: 'invert',
       //color: '#25F4EE',
       description: 'Short-form creative content',
       gradient: 'linear-gradient(135deg,rgba(0, 0, 0, 0.1) 0%,rgba(51, 51, 51, 0.1) 50%,rgba(105, 201, 208, 0.1) 100%)'
     },
     {
       id: 'facebook',
       name: 'Facebook',
       icon: <FaFacebookF />,
       url: 'https://facebook.com/syncagency',
       color: '#1877F2',
       description: 'Community and company updates',
       gradient: 'linear-gradient(135deg,rgba(24, 118, 242, 0.1) 0%,rgba(13, 92, 182, 0.1) 100%)'
     },
     {
       id: 'pinterest',
       name: 'Pinterest',
       icon: <FaPinterestP />,
       url: 'https://pinterest.com/syncagency',
       color: '#E60023',
       description: 'Visual inspiration and mood boards',
       gradient: 'linear-gradient(135deg,rgba(230, 0, 35, 0.1) 0%,rgba(163, 0, 27, 0.1) 100%)'
     },
     {
       id: 'discord',
       name: 'Discord',
       icon: <SiDiscord />,
       url: 'https://discord.gg/syncagency',
       color: '#5865F2',
       description: 'Community chat and discussions',
       gradient: 'linear-gradient(135deg,rgba(88, 101, 242, 0.1) 0%,rgba(64, 78, 237, 0.1) 100%)'
     },
     {
       id: 'notion',
       name: 'Notion',
       icon: <SiNotion />,
       url: 'https://www.notion.so/syncagency',
       color: 'invert',
       description: 'Resources, templates, and knowledge base',
       gradient: 'linear-gradient(135deg,rgba(0, 0, 0, 0.1) 0%,rgba(51, 51, 51, 0.1) 100%)'
     }
   ];
 
export const MarketingBackgroundLogos: React.FC<BaseBackgroundProps> = ({
  speed = 10,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const rowTopRef = useRef<HTMLDivElement>(null);
  const rowBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowTopRef.current || !rowBottomRef.current) return;

    const distance = 48 * intensity;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(
      rowTopRef.current,
      {
        x: distance,
        duration: 14 / speed,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      },
      0
    );

    tl.to(
      rowBottomRef.current,
      {
        x: -distance,
        duration: 14 / speed,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [speed, intensity]);

  useEffect(() => {
    const active = isHovered || isActive || isScrolled;

    gsap.to([rowTopRef.current, rowBottomRef.current], {
      opacity: active ? 1 : 0.85,
      duration: 0.5,
      ease: 'power2.out'
    });
  }, [isHovered, isActive, isScrolled]);

  const half = Math.ceil(SOCIAL_ITEMS.length / 2);
  const topRow = SOCIAL_ITEMS.slice(0, half);
  const bottomRow = SOCIAL_ITEMS.slice(half);

  return (
    <div className={styles.socialLogosLayer}>
      {/* Верхняя строка */}
      <div ref={rowTopRef} className={styles.socialRow}>
        {topRow.map((item) => (
          <div
            key={item.id}
            className={styles.socialCard}
            style={{ background: item.gradient }}
          >
            <div
              className={styles.socialIcon}
              style={{ color: item.color }}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Нижняя строка */}
      <div
        ref={rowBottomRef}
        className={`${styles.socialRow} ${styles.socialRowBottom}`}
      >
        {bottomRow.map((item) => (
          <div
            key={item.id}
            className={styles.socialCard}
            style={{ background: item.gradient }}
          >
            <div
              className={styles.socialIcon}
              style={{ color: item.color }}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
