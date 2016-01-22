import React, { PropTypes, Component } from 'react'
import CheckIcon from 'material-ui/lib/svg-icons/navigation/check'

export default class CorrectListItem extends Component {

  static propTypes = {
    primaryText: PropTypes.string.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    const { accent2Color } = this.context.muiTheme.baseTheme.palette

    return (
      <div>
        <span style={{verticalAlign: "middle", paddingRight: 10, color: accent2Color}}>{this.props.primaryText}</span>
        <CheckIcon color={accent2Color} style={{verticalAlign: "middle"}} />
      </div>
    )
  }
}
