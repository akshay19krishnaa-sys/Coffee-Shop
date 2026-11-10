import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none bg-black/40">
      <div
        className="h-full bg-gradient-to-r from-[#F5C518] via-[#FFDF40] to-[#F5C518] shadow-[0_0_10px_#F5C518] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
