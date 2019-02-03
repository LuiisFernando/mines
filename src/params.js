import { Dimensions } from 'react-native'

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, // proporção do painel superior da tela
    dificultLevel: 0.1,
    getQuantidadeColuna() {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getQuantidadeLinhas() {
        const totalHeight = Dimensions.get('window').height
        const borderHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(borderHeight / this.blockSize)
    }
}

export default params