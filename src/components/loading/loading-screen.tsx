import { VtLoadingMark } from '@/components/loading/vt-loading-mark'
import { cn } from '@/lib/utils'

export interface LoadingScreenProps {
    variant?: 'page' | 'section'
    label?: string
    className?: string
}

export const LoadingScreen = ({ variant = 'section', label = 'Loading', className }: LoadingScreenProps) => {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className={cn(
                'flex w-full items-center justify-center bg-background text-foreground',
                variant === 'page' ? 'min-h-[100dvh]' : 'min-h-48',
                className,
            )}
        >
            <VtLoadingMark className={variant === 'page' ? 'w-40 sm:w-52' : 'w-24 sm:w-32'} />
            <span className="sr-only">{label}</span>
        </div>
    )
}
