const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row, // o mesmo que row: row
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, qtdeMinas) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while(minesPlanted < qtdeMinas) {
        const linhaSelecionada = parseInt(Math.random() * rows, 10)
        const colunaSelecionada = parseInt(Math.random() * columns, 10)

        if (!board[linhaSelecionada][colunaSelecionada].mined) {
            board[linhaSelecionada][colunaSelecionada].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, qtdeMinas) => {
    const board = createBoard(rows, columns)
    spreadMines(board, qtdeMinas)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getVizinhos = (board, row, column) => {
    const vizinhos = [];
    const linhas = [row - 1, row, row + 1];
    const colunas = [column - 1, column, column + 1]

    linhas.forEach(r => {
        colunas.forEach(c => {
            const diferente = r !== row || c !== column
            const linhaValida = r >= 0 && r < board.length
            const colunaValida = c >= 0 && c < board[0].length

            if (diferente && linhaValida && colunaValida) {
                vizinhos.push(board[r][c])
            }
        })
    })

    return vizinhos;
}

const vizinhancaSegura = (board, row, column) => {
    const safes = (result, vizinho) => result && !vizinho.mined
    return getVizinhos(board, row, column).reduce(safes, true)
}

const abrirField = (board, row, column) => {
    const field = board[row][column]

    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (vizinhancaSegura(board, row, column)) {
            getVizinhos(board, row, column).forEach(n => abrirField(board, n.row, n.column))
        } else {
            const vizinho = getVizinhos(board, row, column)
            field.nearMines = vizinho.filter(x => x.mined).length
        }
    }
}

const fields = board => [].concat(...board)
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const ganhouJogo = board => fields(board).filter(pendding).length === 0
const exibeMinas = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

export {
    createMinedBoard,
    cloneBoard,
    abrirField,
    hadExplosion,
    ganhouJogo,
    exibeMinas,
    invertFlag 
}