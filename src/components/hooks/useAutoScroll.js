import { useRef, useEffect } from "react";

export function useAutoScroll(dependency) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [dependency]);

  return scrollRef;
}