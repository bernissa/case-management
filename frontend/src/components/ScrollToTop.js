import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollable = document.getElementById('scrollable-content');
    if (scrollable) {
      scrollable.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
