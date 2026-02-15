import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Link } from "react-router-dom"

export interface BreadcrumbItem {
    label: string | React.ReactNode
    href?: string
    active?: boolean
    icon?: React.ReactNode
}

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
    items: BreadcrumbItem[]
    separator?: React.ReactNode
}

export const Breadcrumb = ({
    items,
    separator = <ChevronRight className="h-4 w-4 text-muted-foreground/40" />,
    className,
    ...props
}: BreadcrumbProps) => {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn(
                "flex items-center p-3 px-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 shadow-sm w-fit animate-in fade-in slide-in-from-left-4 duration-500",
                className
            )}
            {...props}
        >
            <ol className="flex items-center gap-2">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <li className="flex items-center">
                            {item.href && !item.active ? (
                                <Link
                                    to={item.href}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300 group"
                                >
                                    {item.icon && <span className="group-hover:scale-110 transition-transform">{item.icon}</span>}
                                    <span>{item.label}</span>
                                </Link>
                            ) : (
                                <div className={cn(
                                    "flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300",
                                    item.active ? "text-primary scale-105" : "text-muted-foreground/60"
                                )}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            )}
                        </li>
                        {index < items.length - 1 && (
                            <li className="flex items-center mx-1 select-none">
                                {separator}
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    )
}
