import { useState, useEffect, useCallback } from 'react';

export interface Route {
  name: 'home' | 'story' | 'search' | 'waitlist-results';
  id?: string;
}

function parseHash(): Route {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('/story/')) {
    return { name: 'story', id: hash.slice(7) };
  }
  if (hash === '/search') return { name: 'search' };
  if (hash === '/waitlist-results') return { name: 'waitlist-results' };
  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((r: Route) => {
    if (r.name === 'story' && r.id) {
      window.location.hash = `/story/${r.id}`;
    } else if (r.name === 'search') {
      window.location.hash = '/search';
    } else if (r.name === 'waitlist-results') {
      window.location.hash = '/waitlist-results';
    } else {
      window.location.hash = '/';
    }
  }, []);

  return { route, navigate };
}

export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: Route;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (to.name === 'story' && to.id) {
      window.location.hash = `/story/${to.id}`;
    } else if (to.name === 'search') {
      window.location.hash = '/search';
    } else if (to.name === 'waitlist-results') {
      window.location.hash = '/waitlist-results';
    } else {
      window.location.hash = '/';
    }
    onClick?.();
  };

  let href = '#/';
  if (to.name === 'story' && to.id) href = `#/story/${to.id}`;
  else if (to.name === 'search') href = '#/search';
  else if (to.name === 'waitlist-results') href = '#/waitlist-results';

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
