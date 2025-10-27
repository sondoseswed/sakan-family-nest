import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-lift",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-warm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline:
          "border-2 border-primary/20 bg-background text-primary hover:bg-primary hover:text-primary-foreground shadow-soft",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        warm: "bg-gradient-warm text-white shadow-warm hover:shadow-elegant",
        hero: "bg-gradient-hero text-white font-semibold shadow-elegant hover:scale-105 transition-all",
        family:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft",
        success:
          "bg-success text-success-foreground hover:bg-success/90 shadow-soft",
        planning:
          "bg-gradient-primary text-primary-foreground hover:bg-gradient-warm shadow-soft hover:shadow-elegant border-0",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-10 text-lg font-semibold",
        xl: "h-16 rounded-xl px-12 text-xl font-bold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
