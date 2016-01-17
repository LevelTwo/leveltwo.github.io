import React, { PropTypes, Component } from 'react'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward'
import IconButton from 'material-ui/lib/icon-button'
import Progress from './Progress'

class QuizGrid extends Component {

  getStyles() {
    return {
      img: {
        maxHeight: '80%',
        minHeight: '80%',
      },
    }
  }

  render() {
    const { quizzes, selectQuiz } = this.props

    let tileElements
    const styles = this.getStyles()

    const gridListStyle = {maxWidth: 816, overflowY: 'auto', marginBottom: 24}

    if (!quizzes) {
      return <Progress />
    } else {
      const quizArray = Object.keys(quizzes).map(key => quizzes[key])

      tileElements = quizArray.map(tile => <GridTile
          key={tile.title}
          title={tile.title}
          onClick={this.log}
          actionIcon={<IconButton onClick={() => selectQuiz(tile.id)}><ArrowForward color="white"/></IconButton>}
          style={{backgroundColor: tile.background, textAlign: "center"}}
        >
          <img src={tile.img} style={styles.img} />
        </GridTile>
      )
    }

    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <GridList
          cellHeight={200}
          style={gridListStyle}
        >
          {tileElements}
        </GridList>
      </div>
    )
  }
}

export default QuizGrid;
