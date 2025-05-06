import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex rounded-sm items-center border p-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border-secondary text-secondary-foreground hover:bg-secondary/80",
        error:
          "text-destructive bg-none border-destructive hover:bg-destructive/20",
        success: "text-success bg-none border-success hover:bg-success/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  rounded?: boolean;
  label: React.ReactNode;
  deleteIcon?: React.ReactElement;
  onDelete?: React.EventHandler<any>;
}

function Chip({
  className,
  variant,
  rounded,
  label,
  deleteIcon,
  onDelete,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        chipVariants({ variant }),
        rounded && "rounded-full",
        className,
      )}
      {...props}
    >
      <div className={cn("h-full flex justify-center items-center")}>
        {label}
      </div>
      {deleteIcon && (
        <button className="ml-1.5" onClick={onDelete ? onDelete : undefined}>
          {deleteIcon}
        </button>
      )}
    </div>
  );
}

export { Chip };
