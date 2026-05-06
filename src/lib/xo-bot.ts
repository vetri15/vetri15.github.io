export type Player = 'X' | 'O'
export type BoardCell = Player | null
type WinningLine = readonly [number, number, number]

export const winningLines: WinningLine[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] as const

const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7]

export const getWinningLine = (board: BoardCell[]) => {
    return winningLines.find(([first, second, third]) => {
        const player = board[first]
        return player && player === board[second] && player === board[third]
    })
}

const scoreBoard = (board: BoardCell[], depth: number) => {
    const winningLine = getWinningLine(board)

    if (!winningLine) {
        return null
    }

    return board[winningLine[0]] === 'O' ? 10 - depth : depth - 10
}

const minimax = (board: BoardCell[], isBotTurn: boolean, depth: number): number => {
    const score = scoreBoard(board, depth)

    if (score !== null) {
        return score
    }

    if (board.every(Boolean)) {
        return 0
    }

    if (isBotTurn) {
        let bestScore = -Infinity

        preferredMoves.forEach((move) => {
            if (board[move]) {
                return
            }

            board[move] = 'O'
            bestScore = Math.max(bestScore, minimax(board, false, depth + 1))
            board[move] = null
        })

        return bestScore
    }

    let bestScore = Infinity

    preferredMoves.forEach((move) => {
        if (board[move]) {
            return
        }

        board[move] = 'X'
        bestScore = Math.min(bestScore, minimax(board, true, depth + 1))
        board[move] = null
    })

    return bestScore
}

export const getBestMove = (board: BoardCell[]) => {
    let bestMove: number | null = null
    let bestScore = -Infinity

    preferredMoves.forEach((move) => {
        if (board[move]) {
            return
        }

        const nextBoard = [...board]
        nextBoard[move] = 'O'
        const score = minimax(nextBoard, false, 0)

        if (score > bestScore) {
            bestScore = score
            bestMove = move
        }
    })

    return bestMove
}
