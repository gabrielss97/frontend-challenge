interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  isLoading,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg transition-colors disabled:opacity-50
        ${
          variant === "primary"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
