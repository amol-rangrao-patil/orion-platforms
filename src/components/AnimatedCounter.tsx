import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1600 }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const hasAnimated = useRef(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Extract numeric portion and prefix/suffix
    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    // Fallback if IntersectionObserver is not available
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? match[2].split('.')[1].length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = numericTarget * easeOutProgress;

            const formattedNumber = isDecimal
              ? currentNumber.toFixed(decimalPlaces)
              : Math.round(currentNumber).toString();

            setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={elementRef}>{displayValue}</span>;
};
