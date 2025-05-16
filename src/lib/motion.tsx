import React from 'react';

// Create types for the motion properties
type MotionProps = {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: any;
};

export const motion = {
  div: React.forwardRef<HTMLDivElement, MotionProps>(
    ({ 
      animate, 
      transition = { duration: 0.3 }, 
      whileHover,
      whileTap,
      style = {},
      className = '',
      children,
      ...props 
    }, ref) => {
      const [isHovering, setIsHovering] = React.useState(false);
      const [isTapping, setIsTapping] = React.useState(false);
      
      const getStyles = () => {
        const transitionStr = `all ${transition.duration}s ${transition.ease || 'ease'} ${transition.delay || 0}s`;
        
        let combinedStyles: React.CSSProperties = {
          ...style,
          transition: transitionStr,
        };
        
        if (animate) {
          combinedStyles = { ...combinedStyles, ...animate };
        }
        
        if (isHovering && whileHover) {
          combinedStyles = { ...combinedStyles, ...whileHover };
        }
        
        if (isTapping && whileTap) {
          combinedStyles = { ...combinedStyles, ...whileTap };
        }
        
        return combinedStyles;
      };
      
      return (
        <div
          ref={ref}
          className={className}
          style={getStyles()}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseDown={() => setIsTapping(true)}
          onMouseUp={() => setIsTapping(false)}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
};