import React, { PropTypes, Component } from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import CheckIcon from 'material-ui/lib/svg-icons/navigation/check'

export default class CorrectListItem extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    onTouchTap: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    const { accent2Color } = this.context.muiTheme.baseTheme.palette
    const { index, onTouchTap } = this.props
    const questionName = `Q${index + 1}`

    return (
      <ListItem
        primaryText={questionName}
        rightIcon={<CheckIcon color={accent2Color} />}
        onTouchTap={onTouchTap}
        style={{color: accent2Color}}
      />
    )
  }
}
