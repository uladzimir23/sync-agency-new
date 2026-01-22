// src/shared/ui/sync-flow-matrix-background/UnifiedSyncFlowMatrixBackground.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './SyncFlowMatrixBackground.module.scss';

interface UnifiedSyncFlowMatrixBackgroundProps {
  // Grid properties
  cellSize?: number;
  lineWidth?: number;
  gridColor?: string;
  gridOpacity?: number;
  
  // Flow lines properties
  flowLinesCount?: number;
  flowLineWidth?: number;
  flowLineOpacity?: number;
  
  // Node properties
  nodesCount?: number;
  nodeSize?: number;
  nodeGlow?: number;
  
  // Highlight squares properties
  highlightCount?: number;
  highlightColors?: string[];
  
  // Animation properties
  speed?: number;
  driftSpeed?: number;
  pulseInterval?: number;
  
  // Colors
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  
  fixed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

interface FlowLine {
  id: number;
  d: string;
  gradientId: string;
  animated: boolean;
  driftX: number;
  driftY: number;
}

interface SyncNode {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'pulse' | 'static' | 'ring';
  color: string;
  animated: boolean;
  pulseDelay: number;
  rotation: number;
}

interface HighlightSquare {
  id: number;
  col: number;
  row: number;
  color: string;
  size: 1 | 2 | 3;
  type: 'border' | 'fill' | 'pulse';
  pulseDelay: number;
}

export const UnifiedSyncFlowMatrixBackground: React.FC<UnifiedSyncFlowMatrixBackgroundProps> = ({
  // Grid defaults
  cellSize = 72,
  lineWidth = 1,
  gridColor = 'var(--primary-color)',
  gridOpacity = 0.04,
  
  // Flow lines defaults
  flowLinesCount = 12,
  flowLineWidth = 1,
  flowLineOpacity = 0.15,
  
  // Node defaults
  nodesCount = 8,
  nodeSize = 6,
  nodeGlow = 16,
  
  // Highlight squares defaults
  highlightCount = 15,
  highlightColors = [
    'rgba(12, 140, 233, 0.1)',   // #0C8CE9
    'rgba(127, 231, 196, 0.08)', // #7FE7C4
    'rgba(155, 109, 255, 0.12)', // #9B6DFF
  ],
  
  // Animation defaults
  speed = 0.12,
  driftSpeed = 20,
  pulseInterval = 6,
  
  // Colors
  colors = {
    primary: '#0C8CE9',
    secondary: '#7FE7C4',
    accent: '#9B6DFF'
  },
  
  fixed = true,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Параллакс эффект
  const y = useTransform(scrollY, [0, 10000], [0, 10000 * speed]);

  // Создаем стабильные IDs для градиентов
  const gradientIds = useMemo(() => {
    return {
      primarySecondary: `gradient-ps-${Math.random().toString(36).substring(7)}`,
      secondaryPrimary: `gradient-sp-${Math.random().toString(36).substring(7)}`,
      accentPrimary: `gradient-ap-${Math.random().toString(36).substring(7)}`
    };
  }, []);

  // Генерация flow lines
  const flowLines = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    
    const newFlowLines: FlowLine[] = [];
    const margin = 200;
    
    for (let i = 0; i < flowLinesCount; i++) {
      const startOnLeft = Math.random() > 0.5;
      const endOnRight = Math.random() > 0.5;
      
      const startX = startOnLeft ? -margin : dimensions.width + margin;
      const startY = Math.random() * dimensions.height;
      const endX = endOnRight ? dimensions.width + margin : -margin;
      const endY = Math.random() * dimensions.height;
      
      // Control points
      const cp1x = Math.random() * dimensions.width;
      const cp1y = Math.random() * dimensions.height;
      const cp2x = Math.random() * dimensions.width;
      const cp2y = Math.random() * dimensions.height;
      
      // Create Bezier curve path
      const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
      
      // Choose gradient
      const gradientIdsArray = [gradientIds.primarySecondary, gradientIds.secondaryPrimary, gradientIds.accentPrimary];
      const gradientId = gradientIdsArray[Math.floor(Math.random() * gradientIdsArray.length)];
      
      // Random drift values
      const driftX = (Math.random() - 0.5) * 6;
      const driftY = (Math.random() - 0.5) * 6;
      
      newFlowLines.push({
        id: i,
        d,
        gradientId,
        animated: Math.random() < 0.3,
        driftX,
        driftY
      });
    }

    return newFlowLines;
  }, [dimensions, flowLinesCount, gradientIds]);

  // Генерация sync nodes
  const syncNodes = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    
    const newSyncNodes: SyncNode[] = [];
    const nodeTypes: SyncNode['type'][] = ['pulse', 'static', 'ring'];
    const nodeColors = [colors.primary, colors.secondary, colors.accent].filter(Boolean) as string[];
    
    for (let i = 0; i < nodesCount; i++) {
      let x = Math.random() * dimensions.width;
      let y = Math.random() * dimensions.height;
      
      // Try to place near flow lines
      if (flowLines.length > 0 && Math.random() > 0.3) {
        const line = flowLines[i % flowLines.length];
        // Approximate position near line
        x = Math.max(20, Math.min(dimensions.width - 20, x + (Math.random() - 0.5) * 100));
        y = Math.max(20, Math.min(dimensions.height - 20, y + (Math.random() - 0.5) * 100));
      }
      
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      const color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      const size = nodeSize * (0.5 + Math.random() * 1.5);
      
      newSyncNodes.push({
        id: i,
        x,
        y,
        size,
        type,
        color,
        animated: type === 'pulse',
        pulseDelay: Math.random() * 2,
        rotation: Math.random() * 360
      });
    }

    return newSyncNodes;
  }, [dimensions, nodesCount, flowLines, colors, nodeSize]);

  // Генерация highlight squares
  const highlights = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    
    const cols = Math.ceil(dimensions.width / cellSize);
    const rows = Math.ceil((dimensions.height * 2) / cellSize);
    const newHighlights: HighlightSquare[] = [];
    
    for (let i = 0; i < highlightCount; i++) {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      const color = highlightColors[Math.floor(Math.random() * highlightColors.length)];
      const size = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3;
      const type = Math.random() > 0.5 ? 'border' : Math.random() > 0.5 ? 'fill' : 'pulse';
      
      newHighlights.push({
        id: i,
        col,
        row,
        color,
        size,
        type,
        pulseDelay: Math.random() * 3
      });
    }

    return newHighlights;
  }, [dimensions, cellSize, highlightCount, highlightColors]);

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
        setIsInitialized(true);
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Set CSS variables
  useEffect(() => {
    if (!containerRef.current || !isInitialized) return;
    
    const container = containerRef.current;
    container.style.setProperty('--grid-cell-size', `${cellSize}px`);
    container.style.setProperty('--grid-line-width', `${lineWidth}px`);
    container.style.setProperty('--grid-color', gridColor);
    container.style.setProperty('--grid-opacity', `${gridOpacity}`);
    container.style.setProperty('--flow-line-opacity', `${flowLineOpacity}`);
    container.style.setProperty('--node-glow-blur', `${nodeGlow}px`);
    container.style.setProperty('--pulse-interval', `${pulseInterval}s`);
  }, [cellSize, lineWidth, gridColor, gridOpacity, flowLineOpacity, nodeGlow, pulseInterval, isInitialized]);

  // Рендер градиентов SVG
  const renderGradients = useCallback(() => (
    <defs>
      <linearGradient id={gradientIds.primarySecondary} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.primary} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
      
      <linearGradient id={gradientIds.secondaryPrimary} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.secondary} />
        <stop offset="100%" stopColor={colors.primary} />
      </linearGradient>
      
      <linearGradient id={gradientIds.accentPrimary} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={colors.accent} />
        <stop offset="100%" stopColor={colors.primary} />
      </linearGradient>
    </defs>
  ), [gradientIds, colors]);

  // Рендер линий потока
  const renderFlowLines = useCallback(() => (
    <>
      {flowLines.map((line) => (
        line.animated ? (
          <motion.path
            key={`line-${line.id}`}
            d={line.d}
            stroke={`url(#${line.gradientId})`}
            strokeWidth={flowLineWidth}
            fill="none"
            strokeLinecap="round"
            initial={{ 
              pathLength: 0,
              opacity: 0 
            }}
            animate={{ 
              pathLength: 1,
              opacity: 0.15,
              x: [0, line.driftX, 0],
              y: [0, line.driftY, 0]
            }}
            transition={{
              pathLength: { 
                duration: 2, 
                ease: "easeInOut",
                delay: line.id * 0.1 
              },
              opacity: { 
                duration: 1.5,
                delay: line.id * 0.05 
              },
              x: { 
                duration: driftSpeed, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              y: { 
                duration: driftSpeed * 1.2, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        ) : (
          <path
            key={`line-${line.id}`}
            d={line.d}
            stroke={`url(#${line.gradientId})`}
            strokeWidth={flowLineWidth}
            fill="none"
            strokeLinecap="round"
            opacity={0.12}
          />
        )
      ))}
    </>
  ), [flowLines, flowLineWidth, driftSpeed]);

  // Рендер узлов синхронизации
  const renderSyncNodes = useCallback(() => (
    <>
      {syncNodes.map((node) => (
        <div
          key={`node-${node.id}`}
          className={`${styles.syncNode} ${styles[node.type]}`}
          style={{
            '--node-color': node.color,
            '--node-size': `${node.size}px`,
            '--pulse-delay': `${node.pulseDelay}s`,
            left: `${node.x}px`,
            top: `${node.y}px`,
            transform: `translate(-50%, -50%) rotate(${node.rotation}deg)`
          } as React.CSSProperties}
        />
      ))}
    </>
  ), [syncNodes]);

  // Рендер квадратов
  const renderHighlights = useCallback(() => (
    <>
      {highlights.map((highlight) => {
        const top = highlight.row * cellSize;
        const left = highlight.col * cellSize;
        const width = highlight.size * cellSize;
        const height = highlight.size * cellSize;

        return (
          <div
            key={`highlight-${highlight.id}`}
            className={`${styles.highlightSquare} ${styles[highlight.type]}`}
            style={{
              top: `${top}px`,
              left: `${left}px`,
              width: `${width}px`,
              height: `${height}px`,
              '--highlight-color': highlight.color,
              '--highlight-size': highlight.size,
              '--highlight-pulse-delay': `${highlight.pulseDelay}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </>
  ), [highlights, cellSize]);

  if (!isInitialized) {
    return (
      <div 
        ref={containerRef}
        className={`${styles.container} ${fixed ? styles.fixed : styles.absolute} ${className}`}
      >
        {children && <div className={styles.content}>{children}</div>}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${fixed ? styles.fixed : styles.absolute} ${className}`}
    >
      {/* Layer 1: Structural Grid with Parallax */}
      <motion.div 
        className={styles.gridLayer}
        style={{ y }}
      >
        <div className={styles.grid} />
      </motion.div>

      {/* Second grid layer (offset for infinity) */}
      <motion.div 
        className={styles.gridLayer}
        style={{ 
          y: useTransform(
            scrollY, 
            [0, 10000], 
            [cellSize * 20, 10000 * speed + cellSize * 20]
          ) 
        }}
      >
        <div className={styles.grid} />
      </motion.div>

      {/* Layer 2: Highlight Squares with Parallax */}
      <motion.div 
        className={styles.highlightsLayer}
        style={{ y }}
      >
        {renderHighlights()}
      </motion.div>

      {/* Layer 3: Flow Lines (SVG) */}
      <svg
        className={styles.flowLinesLayer}
        width="100%"
        height="100%"
        style={{ opacity: flowLineOpacity }}
      >
        {renderGradients()}
        {renderFlowLines()}
      </svg>

      {/* Layer 4: Sync Nodes */}
      <div className={styles.syncNodesLayer}>
        {renderSyncNodes()}
      </div>

      {/* Content */}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};