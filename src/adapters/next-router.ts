'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { RouterAdapter } from '../contracts/router';

export function createNextRouterAdapter(): RouterAdapter {
  const router = useRouter();
  const pathname = usePathname();

  return {
    push(path: string) {
      router.push(path);
    },
    replace(path: string) {
      router.replace(path);
    },
    pathname,
  };
}
