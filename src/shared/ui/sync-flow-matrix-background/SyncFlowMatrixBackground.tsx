// src/shared/ui/sync-flow-matrix-background/SyncFlowMatrixBackground.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './SyncFlowMatrixBackground.module.scss';

interface SyncFlowMatrixBackgroundProps {
  cellSize?: number;
  lineWidth?: number;
  gridColor?: string;
  gridOpacity?: number;
  speed?: number;
  
  // Sync Matrix properties
  flowLinesCount?: number;
  flowLineOpacity?: number;
  
  nodesCount?: number;
  nodeSize?: number;
  
  highlightCount?: number;
  highlightColors?: string[];
  
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
  points: { x: number; y: number }[];
  color: string;
  animated: boolean;
}

interface SyncNode {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'pulse' | 'static' | 'ring';
  color: string;
}

interface HighlightSquare {
  id: number;
  col: number;
  row: number;
  color: string;
  size: 1 | 2 | 3;
  type: 'border' | 'fill' | 'pulse';
}

export const SyncFlowMatrixBackground: React.FC<SyncFlowMatrixBackgroundProps> = ({
  // Grid defaults
  cellSize = 64,
  lineWidth = 1,
  gridColor = 'rgba(12, 140, 233, 0.04)',
  gridOpacity = 0.04,
  speed = 0.12,
  
  // Sync Matrix defaults
  flowLinesCount = 8,
  flowLineOpacity = 0.15,
  
  nodesCount = 6,
  nodeSize = 6,
  
  highlightCount = 20,
  highlightColors = [
    'rgba(12, 140, 233, 0.1)',
    'rgba(127, 231, 196, 0.08)',
    'rgba(155, 109, 255, 0.12)',
  ],
  
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
  const [highlights, setHighlights] = useState<HighlightSquare[]>([]);
  const [flowLines, setFlowLines] = useState<FlowLine[]>([]);
  const [syncNodes, setSyncNodes] = useState<SyncNode[]>([]);

  // Параллакс эффект
  const y = useTransform(scrollY, [0, 10000], [0, 10000 * speed]);

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate highlight squares
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

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
        type
      });
    }

    setHighlights(newHighlights);
  }, [dimensions, cellSize, highlightCount, highlightColors]);

  // Generate flow lines
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newFlowLines: FlowLine[] = [];
    const lineColors = [colors.primary, colors.secondary, colors.accent];
    
    for (let i = 0; i < flowLinesCount; i++) {
      const points: { x: number; y: number }[] = [];
      const numPoints = 3 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < numPoints; j++) {
        points.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height
        });
      }
      
      newFlowLines.push({
        id: i,
        points,
        color: lineColors[Math.floor(Math.random() * lineColors.length)],
        animated: Math.random() < 0.3
      });
    }

    setFlowLines(newFlowLines);
  }, [dimensions, flowLinesCount, colors]);

  // Generate sync nodes
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newSyncNodes: SyncNode[] = [];
    const nodeTypes: SyncNode['type'][] = ['pulse', 'static', 'ring'];
    const nodeColors = [colors.primary, colors.secondary, colors.accent];
    
    for (let i = 0; i < nodesCount; i++) {
      newSyncNodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: nodeSize * (0.5 + Math.random()),
        type: nodeTypes[Math.floor(Math.random() * nodeTypes.length)],
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)]
      });
    }

    setSyncNodes(newSyncNodes);
  }, [dimensions, nodesCount, nodeSize, colors]);

  // Set CSS variables
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.style.setProperty('--grid-cell-size', `${cellSize}px`);
    container.style.setProperty('--grid-line-width', `${lineWidth}px`);
    container.style.setProperty('--grid-color', gridColor);
    container.style.setProperty('--grid-opacity', `${gridOpacity}`);
  }, [cellSize, lineWidth, gridColor, gridOpacity]);

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

      {/* Layer 2: Highlight Squares */}
      <motion.div 
        className={styles.highlightsLayer}
        style={{ y }}
      >
        {highlights.map((highlight) => {
          const top = highlight.row * cellSize;
          const left = highlight.col * cellSize;
          const width = highlight.size * cellSize;
          const height = highlight.size * cellSize;

          return (
            <div
              key={highlight.id}
              className={`${styles.highlightSquare} ${styles[highlight.type]}`}
              style={{
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                height: `${height}px`,
                '--highlight-color': highlight.color,
                '--highlight-size': highlight.size,
              } as React.CSSProperties}
            />
          );
        })}
      </motion.div>

      {/* Layer 3: Flow Lines */}
      <div className={styles.flowLinesLayer}>
        {flowLines.map((line) => (
          line.animated ? (
            <motion.div
              key={line.id}
              className={styles.flowLine}
              style={{
                '--flow-line-color': line.color,
                left: `${line.points[0].x}px`,
                top: `${line.points[0].y}px`,
              } as React.CSSProperties}
              animate={{
                left: [
                  `${line.points[0].x}px`,
                  `${line.points[1]?.x || line.points[0].x}px`,
                  `${line.points[0].x}px`
                ],
                top: [
                  `${line.points[0].y}px`,
                  `${line.points[1]?.y || line.points[0].y}px`,
                  `${line.points[0].y}px`
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ) : (
            <div
              key={line.id}
              className={styles.flowLine}
              style={{
                '--flow-line-color': line.color,
                left: `${line.points[0].x}px`,
                top: `${line.points[0].y}px`,
              } as React.CSSProperties}
            />
          )
        ))}
      </div>

      {/* Layer 4: Sync Nodes */}
      <div className={styles.syncNodesLayer}>
        {syncNodes.map((node) => (
          <div
            key={node.id}
            className={`${styles.syncNode} ${styles[node.type]}`}
            style={{
              '--node-color': node.color,
              '--node-size': `${node.size}px`,
              left: `${node.x}px`,
              top: `${node.y}px`,
            } as React.CSSProperties}
          />
        ))}
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