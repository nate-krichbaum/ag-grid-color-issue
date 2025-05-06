import React, { useEffect, useState } from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
} from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "bg-opacity-80 text-white rounded-lg p-4 flex items-center gap-3",
  {
    variants: {
      variant: {
        default: "bg-black hover:bg-primary/70",
        secondary: "bbg-secondary hover:bg-secondary/70",
        error:
          "bg-destructive text-destructive-foreground hover:bg-destructive/70",
        success: "bg-success text-success-foreground hover:bg-success/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
  onClose?: () => void;
  duration?: number;
}

export const CustomToast: React.FC<ToastProps> = ({
  className,
  variant,
  open,
  setOpen,
  title,
  description,
  actionLabel,
  onActionClick,
  onClose,
  duration,
}) => {
  const [show, setShow] = useState(open);
  const toastDuration = duration || 3000;

  const onToastClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setShow(open);
    if (open === true) {
      setTimeout(() => {
        setShow(false);
        onToastClose();
      }, toastDuration);
    }
  }, [open]);

  return (
    <>
      {show && (
        <Toast className={cn(chipVariants({ variant }), className)}>
          <ToastTitle className="font-medium text-lg">{title}</ToastTitle>
          <ToastDescription className="text-base">
            {description}
          </ToastDescription>
          {actionLabel && onActionClick && (
            <ToastAction
              altText=""
              onClick={onActionClick}
              className="text-violet-600 bg-transparent border-none cursor-pointer"
            >
              {actionLabel}
            </ToastAction>
          )}
        </Toast>
      )}
    </>
  );
};
