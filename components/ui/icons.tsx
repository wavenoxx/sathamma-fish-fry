import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function PhoneIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2c-5.5 0-9.98 4.47-9.98 9.97 0 1.76.46 3.48 1.34 5L2 22l5.19-1.36c1.47.8 3.13 1.23 4.85 1.23 5.5 0 9.98-4.47 9.98-9.97 0-5.5-4.48-9.9-9.98-9.9zm5.82 14.07c-.24.68-1.4 1.25-1.92 1.28-.52.03-1.04.14-3.41-.78-2.85-1.12-4.68-4.04-4.83-4.23-.14-.19-1.16-1.55-1.16-2.95 0-1.41.73-2.1 1-2.39.26-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.02.9 2.17.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.18-.31.39-.45.53-.15.14-.3.3-.13.6.17.29.77 1.27 1.64 2.05 1.13 1.01 2.08 1.32 2.37 1.47.3.15.47.13.65-.08.18-.21.78-.9.98-1.21.2-.31.41-.26.69-.15.28.11 1.78.84 2.08.99.3.15.51.23.58.36.07.12.07.72-.17 1.4z" />
    </svg>
  );
}

export function DirectionsIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

export function StarIcon({ className = "w-3.5 h-3.5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
