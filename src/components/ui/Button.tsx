'use client';

import { forwardRef } from 'react';
import { Link } from '@/i18n/navigation';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-racing-red to-racing-red-dark text-white hover:from-racing-red-dark hover:to-racing-red glow-red',
  secondary:
    'bg-gradient-to-r from-electric-blue to-electric-blue-dark text-white hover:from-electric-blue-dark hover:to-electric-blue glow-blue',
  outline:
    'border-2 border-racing-red text-racing-red hover:bg-racing-red hover:text-white',
  ghost:
    'text-foreground-muted hover:text-white hover:bg-white/5',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      href,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      onClick,
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold rounded-lg transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
      btn-racing overflow-hidden
      hover:scale-[1.02] active:scale-[0.98]
    `;

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
