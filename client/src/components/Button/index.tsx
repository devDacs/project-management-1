import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  label?: string;
  icon?: LucideIcon;
  iconClassname?: string;
  onClick: () => void;
  withLabel?: boolean;
};

const Button = ({
  label,
  onClick,
  icon: Icon,
  iconClassname,
  withLabel = false,
}: Props) => {
  return (
    <button
      className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
      onClick={onClick}
    >
      {!withLabel && label}
      {withLabel && label && Icon && (
        <>
          <Icon className={iconClassname} /> {label}
        </>
      )}
    </button>
  );
};

export default Button;
