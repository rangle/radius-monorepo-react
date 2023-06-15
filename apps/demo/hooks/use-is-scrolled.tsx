import { useEffect, useState } from 'react';

/**
 * A hook that returns true if the window has been scrolled, false otherwise.
 */
export const useIsScrolled = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Call handleScroll immediately after the component mounts
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
};
