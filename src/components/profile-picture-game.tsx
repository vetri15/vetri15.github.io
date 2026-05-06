'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useMemo, useState } from 'react'

type Player = 'X' | 'O'
type BoardCell = Player | null

interface ProfilePictureGameProps {
    src: string
    alt: string
    enabled?: boolean
}

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const createEmptyBoard = (): BoardCell[] => Array<BoardCell>(9).fill(null)

const findWinner = (board: BoardCell[]) => {
    return winningLines.find(([first, second, third]) => {
        const player = board[first]
        return player && player === board[second] && player === board[third]
    })
}

export const ProfilePictureGame = ({ src, alt, enabled = true }: ProfilePictureGameProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [board, setBoard] = useState<BoardCell[]>(createEmptyBoard)
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X')

    const winningLine = useMemo(() => findWinner(board), [board])
    const winner = winningLine ? board[winningLine[0]] : null
    const isDraw = !winner && board.every(Boolean)
    const status = winner ? `${winner} won!` : isDraw ? 'Draw game!' : `${currentPlayer}'s turn`

    const resetGame = () => {
        setBoard(createEmptyBoard())
        setCurrentPlayer('X')
    }

    const closeGame = () => {
        setIsOpen(false)
        resetGame()
    }

    const playCell = (index: number) => {
        if (board[index] || winner || isDraw) {
            return
        }

        const nextBoard = [...board]
        nextBoard[index] = currentPlayer
        setBoard(nextBoard)

        if (!findWinner(nextBoard) && !nextBoard.every(Boolean)) {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
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
                    onClick={() => setIsOpen(true)}
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
                        <div>
                            <p className="text-sm font-semibold text-muted-foreground">XO Game</p>
                            <p className="text-lg font-bold text-primary sm:text-2xl">{status}</p>
                        </div>
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
                                            isWinningCell &&
                                                'border-primary bg-primary/15 dark:border-primary dark:bg-primary/10',
                                        )}
                                        onClick={() => playCell(index)}
                                        disabled={Boolean(cell) || Boolean(winner) || isDraw}
                                        aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ''}`}
                                        tabIndex={isOpen ? 0 : -1}
                                    >
                                        {cell}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={resetGame}
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
