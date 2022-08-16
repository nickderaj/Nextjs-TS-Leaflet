export interface IButton {
  title: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Reusable styled button with a primary and secondary variant, could add others like 'error' and 'warning' if needed
export default function Button({ title, onClick, variant = 'primary', type = 'button', disabled = false }: IButton) {
  let primaryClasses =
    'bg-indigo-500 text-white hover:brightness-125 border-indigo-500 disabled:bg-neutral-500 disabled:border-neutral-500';
  let secondaryClasses = ' border-indigo-500 text-indigo-500 disabled:border-neutral-500 disabled:text-neutral-500';
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${variant === 'primary' ? primaryClasses : secondaryClasses}
      border hover:shadow-md px-4 py-1 text-center text-sm rounded-full duration-300 transition-all`}
    >
      {title}
    </button>
  );
}
