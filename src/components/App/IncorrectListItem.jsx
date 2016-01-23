import React, { PropTypes, Component } from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

export default class IncorrectListItem extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    onTouchTap: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    const { accent3Color } = this.context.muiTheme.baseTheme.palette
    const { index, onTouchTap } = this.props
    const questionName = `Q${index + 1}`

    return (
      <ListItem
        primaryText={questionName}
        rightIcon={<CloseIcon color={accent3Color} />}
        onTouchTap={onTouchTap}
        style={{color: accent3Color}}
      />
    )
  }
}
