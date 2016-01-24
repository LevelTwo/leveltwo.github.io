import React, { PropTypes, Component } from 'react'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward'
import IconButton from 'material-ui/lib/icon-button'
import Progress from './Progress'

export default class QuizGrid extends Component {

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        maxWidth: 816,
        overflowY: 'auto',
        marginBottom: 24,
      },
      img: {
        maxHeight: '80%',
        maxWidth: '90%',
      },
    }
  }

  render() {
    const { quizzes, selectQuiz } = this.props

    const styles = this.getStyles()

    if (!Object.keys(quizzes).length) {
      return <Progress />
    }

    const quizArray = Object.keys(quizzes).map(key => quizzes[key])

    const tileElements = quizArray.map(tile => <GridTile
        key={tile.title}
        title={tile.title}
        onClick={() => selectQuiz(tile.id)}
        actionIcon={<IconButton><ArrowForward color="white"/></IconButton>}
        style={{backgroundColor: tile.background, textAlign: "center"}}
      >
        <img src={tile.img} style={styles.img} />
      </GridTile>
    )

    return (
      <div>
        <GridList
          cellHeight={300}
          padding={8}
        >
          {tileElements}
        </GridList>
      </div>
    )
  }
}
