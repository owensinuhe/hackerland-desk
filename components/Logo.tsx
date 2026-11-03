export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-emerald-500"
    >
      <path d="M2 12a10 10 0 0 1 20 0" />
      <path d="M5.5 12a6.5 6.5 0 0 1 13 0" />
      <path d="M9 12a3 3 0 0 1 6 0" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}