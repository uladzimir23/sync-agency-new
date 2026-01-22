import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { BaseBackgroundProps } from '../../HeroBackground.types';
import styles from './ProductBackground.module.scss';

// Цветные токены для подсветки синтаксиса
type TokenType = 
  | 'keyword'    // import, export, const
  | 'string'     // строки в кавычках
  | 'function'   // createProduct, deploy
  | 'property'   // name, version, features
  | 'operator'   // { } [ ] , : = ( )
  | 'comment'    // комментарии
  | 'number'     // 1.0.0
  | 'boolean'    // true, false
  | 'text';      // обычный текст

interface Token {
  type: TokenType;
  text: string;
}

interface CodeLine {
  id: number;
  tokens: Token[];
}

// Код с разметкой для подсветки
const HIGHLIGHTED_CODE: CodeLine[] = [
  {
    id: 1,
    tokens: [
      { type: 'keyword', text: 'import' },
      { type: 'text', text: ' { ' },
      { type: 'function', text: 'createProduct' },
      { type: 'text', text: ' } ' },
      { type: 'keyword', text: 'from' },
      { type: 'text', text: ' ' },
      { type: 'string', text: "'@sync/core'" },
      { type: 'operator', text: ';' }
    ]
  },
  { id: 2, tokens: [] }, // пустая строка
  {
    id: 3,
    tokens: [
      { type: 'keyword', text: 'export' },
      { type: 'text', text: ' ' },
      { type: 'keyword', text: 'const' },
      { type: 'text', text: ' product = ' },
      { type: 'function', text: 'createProduct' },
      { type: 'operator', text: '(' },
      { type: 'operator', text: '{' }
    ]
  },
  {
    id: 4,
    tokens: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'name' },
      { type: 'operator', text: ':' },
      { type: 'text', text: ' ' },
      { type: 'string', text: "'Scalable Platform'" },
      { type: 'operator', text: ',' }
    ]
  },
  {
    id: 5,
    tokens: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'environment' },
      { type: 'operator', text: ':' },
      { type: 'text', text: ' ' },
      { type: 'string', text: "'production'" },
      { type: 'operator', text: ',' }
    ]
  },
  {
    id: 6,
    tokens: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'version' },
      { type: 'operator', text: ':' },
      { type: 'text', text: ' ' },
      { type: 'string', text: "'1.0.0'" },
      { type: 'operator', text: ',' }
    ]
  },
  {
    id: 7,
    tokens: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'features' },
      { type: 'operator', text: ':' },
      { type: 'text', text: ' ' },
      { type: 'operator', text: '[' }
    ]
  },
  {
    id: 8,
    tokens: [
      { type: 'text', text: '    ' },
      { type: 'string', text: "'authentication'" },
      { type: 'operator', text: ',' }
    ]
  },
  {
    id: 9,
    tokens: [
      { type: 'text', text: '    ' },
      { type: 'string', text: "'real-time-sync'" },
      { type: 'operator', text: ',' }
    ]
  },
  {
    id: 10,
    tokens: [
      { type: 'text', text: '    ' },
      { type: 'string', text: "'api-gateway'" },
      { type: 'operator', text: ',' }
    ]
  },
  {
    id: 11,
    tokens: [
      { type: 'text', text: '    ' },
      { type: 'string', text: "'observability'" }
    ]
  },
  {
    id: 12,
    tokens: [
      { type: 'text', text: '  ' },
      { type: 'operator', text: ']' }
    ]
  },
  {
    id: 13,
    tokens: [
      { type: 'operator', text: '}' },
      { type: 'operator', text: ')' },
      { type: 'operator', text: ';' }
    ]
  },
  { id: 14, tokens: [] }, // пустая строка
  {
    id: 15,
    tokens: [
      { type: 'text', text: 'product' },
      { type: 'operator', text: '.' },
      { type: 'function', text: 'deploy' },
      { type: 'operator', text: '(' },
      { type: 'operator', text: ')' },
      { type: 'operator', text: ';' }
    ]
  },
  { id: 16, tokens: [] }, // пустая строка
  {
    id: 17,
    tokens: [
      { type: 'comment', text: '✓ build completed' }
    ]
  },
  {
    id: 18,
    tokens: [
      { type: 'comment', text: '✓ services online' }
    ]
  },
  {
    id: 19,
    tokens: [
      { type: 'comment', text: '✓ ready for traffic' }
    ]
  }
];

export const ProductBackground: React.FC<BaseBackgroundProps> = ({
  speed = 1,
  intensity = 1,
  isHovered = false,
  isActive = false,
  isScrolled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(false);

  const [renderedLines, setRenderedLines] = useState<Token[][]>([]);
  const [currentLineTokens, setCurrentLineTokens] = useState<Token[]>([]);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  /* -----------------------------
     Улучшенный typing engine
  ----------------------------- */
  useEffect(() => {
    isMountedRef.current = true;

    const typeNext = () => {
      if (!isMountedRef.current) return;

      const lineIndex = lineIndexRef.current;

      // 🔁 restart loop
      if (lineIndex >= HIGHLIGHTED_CODE.length) {
        timeoutRef.current = window.setTimeout(() => {
          if (!isMountedRef.current) return;

          setRenderedLines([]);
          setCurrentLineTokens([]);
          setCurrentTokenIndex(0);
          setCurrentText('');
          lineIndexRef.current = 0;
          charIndexRef.current = 0;

          typeNext();
        }, 3000);

        return;
      }

      const currentLine = HIGHLIGHTED_CODE[lineIndex];

      if (currentLine.tokens.length === 0) {
        // Пустая строка
        setRenderedLines(prev => [...prev, []]);
        lineIndexRef.current++;
        charIndexRef.current = 0;
        setCurrentTokenIndex(0);
        setCurrentLineTokens([]);
        setCurrentText('');
      } else if (currentTokenIndex < currentLine.tokens.length) {
        const token = currentLine.tokens[currentTokenIndex];
        const chars = Array.from(token.text);

        if (charIndexRef.current < chars.length) {
          setCurrentText(prev => prev + chars[charIndexRef.current]);
          charIndexRef.current++;
        } else {
          // Токен завершен
          const newToken: Token = {
            type: token.type,
            text: token.text
          };

          setCurrentLineTokens(prev => [...prev, newToken]);
          setCurrentText('');
          setCurrentTokenIndex(prev => prev + 1);
          charIndexRef.current = 0;
        }
      } else {
        // Вся строка завершена
        setRenderedLines(prev => [...prev, currentLineTokens]);
        setCurrentLineTokens([]);
        setCurrentText('');
        setCurrentTokenIndex(0);
        lineIndexRef.current++;
        charIndexRef.current = 0;

        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }

      const boosted = isHovered || isActive || isScrolled;
      const baseDelay = boosted ? 20 : 40;
      const delay = baseDelay / speed;

      timeoutRef.current = window.setTimeout(typeNext, delay);
    };

    typeNext();

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [speed, isHovered, isActive, isScrolled, currentTokenIndex]);

  /* -----------------------------
     Floating motion
  ----------------------------- */
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(containerRef.current, {
      y: 12 * intensity,
      duration: 8 / speed,
      ease: 'sine.inOut'
    });

    tl.to(containerRef.current, {
      x: 3 * intensity,
      duration: 6 / speed,
      ease: 'sine.inOut'
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, [speed, intensity]);

  // Анимация кнопок сфетофора
  useEffect(() => {
    if (!terminalRef.current) return;

    const buttons = terminalRef.current.querySelectorAll(`.${styles.trafficLight}`);
    
    buttons.forEach((button, index) => {
      gsap.to(button, {
        scale: 1.1,
        opacity: 0.8,
        duration: 1.5 / speed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3
      });
    });
  }, [speed]);

  // Реакция на hover/active/scroll
  useEffect(() => {
    if (!terminalRef.current) return;

    const shouldAnimate = isHovered || isActive || isScrolled;
    
    gsap.to(terminalRef.current, {
      scale: shouldAnimate ? 1.02 : 1,
      boxShadow: shouldAnimate ? 
        'inset 0 0 0 2px rgba(86, 156, 254, 0.05), 0 50px 120px rgba(0, 0, 0, 0.05)' :
        'inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 40px 80px rgba(0, 0, 0, 0.05)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [isHovered, isActive, isScrolled]);

  return (
    <div
      ref={containerRef}
      className={styles.productContainer}
      data-hovered={isHovered}
      data-active={isActive}
      data-scrolled={isScrolled}
    >
      <div
        ref={terminalRef}
        className={styles.terminal}
      >
        {/* Header с кнопками сфетофора */}
        <div className={styles.terminalHeader}>
          <div className={styles.trafficLights}>
            <button className={`${styles.trafficLight} ${styles.close}`} 
                    aria-label="Close window" />
            <button className={`${styles.trafficLight} ${styles.minimize}`} 
                    aria-label="Minimize window" />
            <button className={`${styles.trafficLight} ${styles.maximize}`} 
                    aria-label="Maximize window" />
          </div>
          <div className={styles.terminalTitle}>
            product.tsx — sync/core
          </div>
        </div>

        {/* Контент терминала */}
        <div
          ref={contentRef}
          className={styles.terminalContent}
          translate="no"
          lang="en"
          data-no-translate
        >
          {/* Уже отрендеренные строки */}
          {renderedLines.map((tokens, lineIndex) => (
            <div key={`rendered-${lineIndex}`} className={styles.line}>
              {tokens.map((token, tokenIndex) => (
                <span key={`token-${lineIndex}-${tokenIndex}`} className={styles[token.type]}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}

          {/* Текущая строка в процессе печати */}
          {(currentLineTokens.length > 0 || currentText) && (
            <div className={styles.line}>
              {/* Уже напечатанные токены текущей строки */}
              {currentLineTokens.map((token, tokenIndex) => (
                <span key={`current-token-${tokenIndex}`} className={styles[token.type]}>
                  {token.text}
                </span>
              ))}
              
              {/* Текущий текст в процессе печати */}
              {currentText && (
                <span className={styles[currentLineTokens[currentTokenIndex]?.type || 'text']}>
                  {currentText}
                </span>
              )}
              
              {/* Курсор */}
              <span className={styles.cursor}>▮</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};