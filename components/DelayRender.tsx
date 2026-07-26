"use client";

import { useState, useEffect, useRef } from "react";

export function DelayRender({
  children,
  timeout = 1000,
}: {
  children: React.ReactNode;
  timeout?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const timer = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setMounted(true);
    }, timeout);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return <>{mounted ? children : null}</>;
}
