import * as React from "react";

import { cn } from "@/lib/utils";

interface IContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  displayTitle?: string;
  additionalComponent?: React.ReactNode;
}

const ComponentWrapper = React.forwardRef<HTMLDivElement, IContentWrapperProps>(
  ({ className, ...props }, ref) => (
    <div className="rounded-xl border text-card-foreground shadow bg-secondary mb-4">
      <div className="m-4 mb-2 flex justify-between">
        <div>
          <h1 className="font-semibold leading-none tracking-tight mb-1.5">
            {props.displayTitle || props.title}
          </h1>
          <p className="text-sm text-muted-foreground">{props.about}</p>
        </div>
        {props.additionalComponent}
      </div>
      <div
        ref={ref}
        className={cn(
          "rounded-b-lg text-card-foreground bg-card/65",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
ComponentWrapper.displayName = "Card";

export { ComponentWrapper };
