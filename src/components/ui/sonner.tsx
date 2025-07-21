import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

function succesToast(message:string, duration:number) {
    console.log("function succesToast");
    
    toast.success(message, {
        duration: duration,
        position: 'bottom-right',
    })
}

function errorToast(message:string, duration:number) {
    console.log("function succesToast");
    
    toast.error(message, {
        duration: duration,
        position: 'bottom-right',
    })
}

export { Toaster, succesToast, errorToast }
