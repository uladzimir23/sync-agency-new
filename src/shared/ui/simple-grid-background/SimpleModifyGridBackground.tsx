// SimpleModifyGridBackground.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './SimpleModifyGridBackground.module.scss';

interface Props {
  cellSize?: number;
  lineWidth?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  highlightCount?: number;
  highlightColors?: string[];
  fixed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface Highlight {
  id: number;
  col: number;
  row: number;
  color: string;
  size: 1 | 2 | 3;
  type: 'border' | 'fill' | 'pulse';
}

export const SimpleModifyGridBackground: React.FC<Props> = ({
  cellSize = 60,
  lineWidth = 1,
  color = 'rgba(12,140,233,0.12)',
  opacity = 0.08,
  speed = 0.12,
  highlightCount = 10,
  highlightColors = [
    'rgba(79,70,229,0.12)', 'rgba(147,51,234,0.10)',
    'rgba(236,72,153,0.09)', 'rgba(6,182,212,0.08)', 'rgba(34,197,94,0.07)'
  ],
  fixed = true,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [nodes, setNodes] = useState<{ x: number; y: number; color: string; id: number }[]>([]);

  // Parallax transform (vertical)
  const y = useTransform(scrollY, [0, 10000], [0, 10000 * speed]);

  // Update dimensions
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ width: Math.max(rect.width, 320), height: Math.max(rect.height, 400) });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Generate highlights (sparse)
  useEffect(() => {
    if (dims.width === 0 || dims.height === 0) return;
    const cols = Math.ceil(dims.width / cellSize);
    const rows = Math.ceil((dims.height * 2) / cellSize);
    const arr: Highlight[] = [];
    for (let i = 0; i < highlightCount; i++) {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      const color = highlightColors[Math.floor(Math.random() * highlightColors.length)];
      const size = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
      const tRand = Math.random();
      const type = tRand > 0.66 ? 'border' : (tRand > 0.33 ? 'fill' : 'pulse');
      arr.push({ id: i, col, row, color, size, type });
    }
    setHighlights(arr);
  }, [dims, cellSize, highlightCount, highlightColors]);

  // Generate decorative nodes (small dots along flows)
  useEffect(() => {
    if (dims.width === 0 || dims.height === 0) return;
    const nodeCount = Math.max(6, Math.floor(dims.width / 220));
    const arr: { x: number; y: number; color: string; id: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * dims.width;
      const y = Math.random() * dims.height;
      const color = highlightColors[Math.floor(Math.random() * highlightColors.length)] || color;
      arr.push({ x, y, color, id: i });
    }
    setNodes(arr);
  }, [dims, highlightColors]);

  // set CSS variables on container
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    el.style.setProperty('--grid-cell-size', `${cellSize}px`);
    el.style.setProperty('--grid-line-width', `${lineWidth}px`);
    el.style.setProperty('--grid-color', color);
    el.style.setProperty('--grid-opacity', `${opacity}`);
    el.style.setProperty('--flow-opacity', `${Math.min(0.3, opacity * 2)}`);
  }, [cellSize, lineWidth, color, opacity]);

  // Static SVG paths for flow-lines (kept simple and cheap)
  const FlowSVG = () => (
    <svg className={styles.flowSVG} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#0C8CE9" stopOpacity="1" />
          <stop offset="1" stopColor="#9B6DFF" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0" stopColor="#7FE7C4" stopOpacity="1" />
          <stop offset="1" stopColor="#0C8CE9" stopOpacity="1" />
        </linearGradient>
      </defs>

      <path d="M-200 180 C 160 40, 420 240, 720 220 S 1150 200, 1700 320"
        stroke="url(#g1)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M-160 520 C 240 420, 520 640, 860 600 S 1240 520, 1620 640"
        stroke="url(#g2)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M220 -60 C 380 120, 690 300, 980 420 S 1280 620, 1560 820"
        stroke="url(#g1)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${fixed ? styles.fixed : styles.absolute} ${className}`}
    >
      {/* Grid layer 1 */}
      <motion.div className={styles.gridLayer} style={{ y }}>
        <div className={styles.grid} />
      </motion.div>

      {/* Grid layer 2 (offset for infinite feel) */}
      <motion.div
        className={styles.gridLayer}
        style={{
          y: useTransform(scrollY, [0, 10000], [cellSize * 12, 10000 * speed + cellSize * 12])
        }}
      >
        <div className={styles.grid} />
      </motion.div>

      {/* Flow SVG layer (ambient drift applied via css class) */}
      <motion.div className={`${styles.flowLayer} ${styles.flowDrift}`} style={{ y }}>
        <FlowSVG />
      </motion.div>

      {/* nodes (small soft-glow dots) */}
      <motion.div className={styles.nodesLayer} style={{ y }}>
        {nodes.map(n => (
          <div
            key={n.id}
            className={styles.node}
            style={{
              left: `${(n.x / dims.width) * 100}%`,
              top: `${(n.y / dims.height) * 100}%`,
              background: n.color,
              boxShadow: `0 0 18px ${n.color}`
            }}
          />
        ))}
      </motion.div>

      {/* highlights (cards-like accents) */}
      <motion.div className={styles.highlightsLayer} style={{ y }}>
        {highlights.map(h => {
          const top = h.row * cellSize;
          const left = h.col * cellSize;
          const width = h.size * cellSize;
          const height = h.size * cellSize;

          return (
            <div
              key={h.id}
              className={`${styles.highlightSquare} ${styles[h.type] || ''}`}
              style={
                {
                  top: `${top}px`,
                  left: `${left}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  '--highlight-color': h.color
                } as React.CSSProperties
              }
            />
          );
        })}
      </motion.div>

      {/* content */}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default SimpleModifyGridBackground;
