import React, {Component} from 'react'
import { StyleSheet, Text, View, Alert} from 'react-native'

import params from './src/params'
import MineField from './src/components/MineField'
import { 
  createMinedBoard,
  cloneBoard, 
  abrirField,
  hadExplosion,
  ganhouJogo,
  exibeMinas,
  invertFlag
} from './src/functions'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  quantidadeMinas = () => {
    const cols = params.getQuantidadeColuna();
    const linhas = params.getQuantidadeLinhas();

    return Math.ceil(cols * linhas * params.dificultLevel)
  }

  createState = () => {
    const cols = params.getQuantidadeColuna();
    const linhas = params.getQuantidadeLinhas();
    
    return {
      board: createMinedBoard(linhas, cols, this.quantidadeMinas()),
      ganhou: false,
      perdeu: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    abrirField(board, row, column)
    const perdeu = hadExplosion(board)
    const ganhou = ganhouJogo(board)

    if(perdeu) {
      exibeMinas(board)
      Alert.alert('Pedeeeeu', 'Quee burro !!')
    }

    if (ganhou) {
      Alert.alert('Parabéns!', 'ganhou!')
    }

    this.setState({board, perdeu, ganhou})

  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const ganhou = ganhouJogo(board)

    if (ganhou) {
      Alert.alert('Parabens', 'Voce Venceu!!')
    }

    this.setState({board, ganhou})
  }

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={styles.welcome}>Iniciando o Mines !!</Text>

        <Text style={styles.instructions}> Tamanho da grade:
           {params.getQuantidadeLinhas()} x {params.getQuantidadeColuna()}</Text>
    
        <View style={styles.board}>
          <MineField board={this.state.board} OpenField={this.onOpenField}
            SelectField={this.onSelectField}/>
        </View>
            
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
})
