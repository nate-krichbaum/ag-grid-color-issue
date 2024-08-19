import * as React from "react";

import { cn } from "@/lib/utils";

const ComponentWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div className="rounded-xl border text-card-foreground shadow bg-secondary mb-4">
        <div className="m-4 mb-2">
            <h1 className="font-semibold leading-none tracking-tight mb-1.5">
                {props.title}
            </h1>
            <p className="text-sm text-muted-foreground">{props.about}</p>
        </div>
        <div
            ref={ref}
            className={cn(
                "rounded-b-lg text-card-foreground bg-card/65",
                className
            )}
            {...props}
        />
    </div>
));
ComponentWrapper.displayName = "Card";

export { ComponentWrapper };
