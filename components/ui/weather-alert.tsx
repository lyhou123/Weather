import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-orange-500/50 text-orange-900 bg-orange-50 dark:border-orange-500 dark:text-orange-400 dark:bg-orange-950 [&>svg]:text-orange-600",
        info: "border-blue-500/50 text-blue-900 bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:bg-blue-950 [&>svg]:text-blue-600",
        success:
          "border-green-500/50 text-green-900 bg-green-50 dark:border-green-500 dark:text-green-400 dark:bg-green-950 [&>svg]:text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const WeatherAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
WeatherAlert.displayName = "WeatherAlert"

const WeatherAlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
WeatherAlertTitle.displayName = "WeatherAlertTitle"

const WeatherAlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
WeatherAlertDescription.displayName = "WeatherAlertDescription"

export { WeatherAlert, WeatherAlertTitle, WeatherAlertDescription }
