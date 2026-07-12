import { VT_LOADING_CYCLE_DURATION } from '@/components/loading/loading-constants'
import { cn } from '@/lib/utils'
import { type CSSProperties, type SVGProps } from 'react'

type VtLoadingMarkStyle = CSSProperties & {
    '--vt-loading-cycle-duration': string
}

export const VtLoadingMark = ({ className, style, ...props }: SVGProps<SVGSVGElement>) => {
    const loadingMarkStyle: VtLoadingMarkStyle = {
        ...style,
        '--vt-loading-cycle-duration': `${VT_LOADING_CYCLE_DURATION}ms`,
    }

    return (
        <svg
            viewBox="0 0 1045 565"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('vt-loading-mark', className)}
            style={loadingMarkStyle}
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <g className="vt-loading-letter vt-loading-v" fill="currentColor">
                <path d="M0 0h149l161 295L468 0h156L313 565 0 0Z" />
            </g>
            <g className="vt-loading-letter vt-loading-t" fill="currentColor">
                <path d="M678 0h367l-63 112h-93L661 563H528l224-451H620L678 0Z" />
            </g>
        </svg>
    )
}
