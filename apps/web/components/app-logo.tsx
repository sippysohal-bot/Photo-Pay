import Link from 'next/link';

import { cn } from '@kit/ui/utils';

export function AppLogo({
  href = '/',
  label,
  className,
}: {
  href?: string | null;
  label?: string;
  className?: string;
}) {
  const logoContent = (
    <span className={cn('font-bold text-xl tracking-tight text-foreground', className)}>
      {label ?? 'Studio Management System'}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center space-x-2">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}