'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { getBestMove, getWinningLine, type BoardCell, type Player } from '@/lib/xo-bot'
import Image from 'next/image'
import { type MouseEvent, useEffect, useMemo, useState } from 'react'

interface ProfilePictureGameProps {
    src: string
    alt: string
    enabled?: boolean
}

type GamePhase = 'flipping' | 'loading' | 'game'

const createEmptyBoard = (): BoardCell[] => Array<BoardCell>(9).fill(null)
const flipDuration = 500
const loadingDuration = 2000

export const ProfilePictureGame = ({ src, alt, enabled = true }: ProfilePictureGameProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [isInfoPinned, setIsInfoPinned] = useState(false)
    const [phase, setPhase] = useState<GamePhase>('flipping')
    const [board, setBoard] = useState<BoardCell[]>(createEmptyBoard)
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
    const [lastMove, setLastMove] = useState<number | null>(null)

    const winningLine = useMemo(() => getWinningLine(board), [board])
    const winner = winningLine ? board[winningLine[0]] : null
    const isDraw = !winner && board.every(Boolean)
    const status = winner
        ? winner === 'O'
            ? 'VT - Genesis Won'
            : `${winner} won!`
        : isDraw
          ? 'Draw game!'
          : currentPlayer === 'X'
            ? 'Your Turn (X)'
            : "VT-Genesis AI's Turn"

    useEffect(() => {
        if (!isOpen || phase !== 'flipping') {
            return
        }

        const flipTimer = window.setTimeout(() => {
            setPhase('loading')
        }, flipDuration)

        return () => window.clearTimeout(flipTimer)
    }, [isOpen, phase])

    useEffect(() => {
        if (!isOpen || phase !== 'loading') {
            return
        }

        const loadingTimer = window.setTimeout(() => {
            setPhase('game')
        }, loadingDuration)

        return () => window.clearTimeout(loadingTimer)
    }, [isOpen, phase])

    useEffect(() => {
        if (!isOpen || phase !== 'game' || currentPlayer !== 'O' || winner || isDraw) {
            return
        }

        const botTimer = window.setTimeout(() => {
            setBoard((previousBoard) => {
                if (getWinningLine(previousBoard) || previousBoard.every(Boolean)) {
                    return previousBoard
                }

                const botMove = getBestMove(previousBoard)

                if (botMove === null) {
                    return previousBoard
                }

                const nextBoard = [...previousBoard]
                nextBoard[botMove] = 'O'
                setLastMove(botMove)

                if (!getWinningLine(nextBoard) && !nextBoard.every(Boolean)) {
                    setCurrentPlayer('X')
                }

                return nextBoard
            })
        }, 450)

        return () => window.clearTimeout(botTimer)
    }, [currentPlayer, isDraw, isOpen, phase, winner])

    const resetGame = () => {
        setBoard(createEmptyBoard())
        setCurrentPlayer('X')
        setLastMove(null)
    }

    const openGame = () => {
        resetGame()
        setPhase('flipping')
        setIsOpen(true)
    }

    const closeGame = () => {
        setIsOpen(false)
        setIsInfoOpen(false)
        setIsInfoPinned(false)
        setPhase('flipping')
        resetGame()
    }

    const showInfo = () => {
        setIsInfoOpen(true)
    }

    const hideInfo = () => {
        if (!isInfoPinned) {
            setIsInfoOpen(false)
        }
    }

    const toggleInfo = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (isInfoPinned) {
            setIsInfoPinned(false)
            setIsInfoOpen(false)
            return
        }

        setIsInfoPinned(true)
        setIsInfoOpen(true)
    }

    const playCell = (index: number) => {
        if (phase !== 'game' || currentPlayer !== 'X' || board[index] || winner || isDraw) {
            return
        }

        const nextBoard = [...board]
        nextBoard[index] = 'X'
        setBoard(nextBoard)
        setLastMove(index)

        if (!getWinningLine(nextBoard) && !nextBoard.every(Boolean)) {
            setCurrentPlayer('O')
        }
    }

    if (!enabled) {
        return (
            <Image
                src={src}
                alt={alt}
                width={500}
                height={500}
                className="size-[300px] rounded-xl md:size-[450px] lg:size-[500px]"
                priority
            />
        )
    }

    return (
        <div className="size-[300px] [perspective:1200px] md:size-[450px] lg:size-[500px]">
            <div
                className={cn(
                    'relative size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none',
                    isOpen && '[transform:rotateY(180deg)]',
                )}
            >
                <button
                    type="button"
                    className={cn(
                        'group absolute inset-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [backface-visibility:hidden]',
                        isOpen && 'pointer-events-none',
                    )}
                    onClick={openGame}
                    aria-label="Open XO mini game"
                    aria-hidden={isOpen}
                    tabIndex={isOpen ? -1 : 0}
                >
                    <Image src={src} alt={alt} width={500} height={500} className="size-full object-cover" priority />
                    <span className="absolute inset-x-0 bottom-6 mx-auto w-max rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Click me
                    </span>
                </button>

                <div
                    className={cn(
                        'absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-xl border bg-card p-3 text-card-foreground shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5',
                        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
                    )}
                    aria-hidden={!isOpen}
                >
                    <div className="flex items-start justify-between gap-3">
                        {phase === 'game' ? (
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-semibold text-muted-foreground">XO Game</p>
                                    <Popover
                                        open={isInfoOpen}
                                        onOpenChange={(open) => {
                                            setIsInfoOpen(open)

                                            if (!open) {
                                                setIsInfoPinned(false)
                                            }
                                        }}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="size-6 shrink-0 text-muted-foreground hover:text-foreground"
                                                onMouseEnter={showInfo}
                                                onMouseLeave={hideInfo}
                                                onFocus={showInfo}
                                                onBlur={hideInfo}
                                                onClick={toggleInfo}
                                                aria-label="Show XO game AI information"
                                                tabIndex={isOpen ? 0 : -1}
                                            >
                                                <span className="icon-[tabler--info-circle] size-4" aria-hidden="true" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            align="start"
                                            side="bottom"
                                            sideOffset={6}
                                            className="w-56 p-3 text-sm leading-relaxed"
                                        >
                                            You are facing an advanced AI agent powered by quantum computing, high-speed neural reasoning, and inscrutable intelligence beyond human comprehension.
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <p className="text-lg font-bold text-primary sm:text-2xl">{status}</p>
                            </div>
                        ) : (
                            <span aria-hidden="true" />
                        )}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={closeGame}
                            aria-label="Close XO mini game"
                            tabIndex={isOpen ? 0 : -1}
                        >
                            <span className="icon-[tabler--x] size-5" aria-hidden="true" />
                        </Button>
                    </div>

                    {phase !== 'game' ? (
                        <div className="flex min-h-0 flex-col items-center justify-center gap-4 py-2 text-center sm:gap-5">
                            <p className="text-sm font-semibold text-foreground sm:text-base">
                                Loading VT - Genesis AI
                            </p>
                            <span className="logo-mark">
                                <span className="logo-mark-inner">
                                    <Image
                                        src="/android-chrome-192x192.png"
                                        alt=""
                                        width={96}
                                        height={96}
                                        className="size-16 object-contain sm:size-24"
                                    />
                                </span>
                            </span>
                            <div className="h-2 w-40 overflow-hidden rounded-full bg-zinc-200 dark:bg-secondary sm:w-56">
                                <div
                                    className={cn(
                                        'h-full w-full origin-left rounded-full bg-primary',
                                        phase === 'loading' ? 'vt-loading-bar' : 'scale-x-0',
                                    )}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex min-h-0 items-center justify-center py-2 sm:py-4">
                            <div className="grid aspect-square h-full max-h-full max-w-full grid-cols-3 gap-2 sm:gap-3">
                                {board.map((cell, index) => {
                                    const isWinningCell = winningLine?.includes(index)

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className={cn(
                                                'flex aspect-square items-center justify-center rounded-md border border-zinc-400 bg-zinc-200 text-3xl font-bold transition-colors hover:bg-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-100 dark:border-border dark:bg-background dark:hover:bg-accent sm:text-5xl',
                                                cell === 'X' && 'text-primary',
                                                cell === 'O' && 'text-emerald-700 dark:text-emerald-300',
                                                currentPlayer === 'O' &&
                                                    !cell &&
                                                    'hover:bg-zinc-200 dark:hover:bg-background',
                                                lastMove === index && 'xo-tile-placed',
                                                isWinningCell &&
                                                    'border-primary bg-primary/15 dark:border-primary dark:bg-primary/10',
                                            )}
                                            onClick={() => playCell(index)}
                                            disabled={
                                                currentPlayer === 'O' || Boolean(cell) || Boolean(winner) || isDraw
                                            }
                                            aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ''}`}
                                            tabIndex={isOpen ? 0 : -1}
                                        >
                                            {cell}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={resetGame}
                            disabled={phase === 'loading'}
                            tabIndex={isOpen ? 0 : -1}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
