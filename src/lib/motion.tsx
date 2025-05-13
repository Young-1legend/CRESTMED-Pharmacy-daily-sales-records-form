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

// Create a simple motion div that applies animations using CSS transitions
export const motion = {
  div: React.forwardRef<HTMLDivElement, MotionProps>(
    ({ 
      initial, 
      animate, 
      transition = { duration: 0.3 }, 
      whileHover,
      whileTap,
      style = {},
      className = '',
      children,
      ...props 
    }, ref) => {
      const initialRef = React.useRef(initial);
      const [isHovering, setIsHovering] = React.useState(false);
      const [isTapping, setIsTapping] = React.useState(false);
      
      // Convert motion properties to CSS styles
      const getStyles = () => {
        const transitionStr = `all ${transition.duration}s ${transition.ease || 'ease'} ${transition.delay || 0}s`;
        
        let combinedStyles: React.CSSProperties = {
          ...style,
          transition: transitionStr,
        };
        
        // Apply animate styles
        if (animate) {
          combinedStyles = { ...combinedStyles, ...animate };
        }
        
        // Apply hover styles
        if (isHovering && whileHover) {
          combinedStyles = { ...combinedStyles, ...whileHover };
        }
        
        // Apply tap styles
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