import React, { PropTypes, Component } from 'react'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

export default class IncorrectListItem extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    const { accent3Color } = this.context.muiTheme.baseTheme.palette

    return (
      <div>
        <span style={{verticalAlign: "middle", paddingRight: 10, color: accent3Color}}>{this.props.label}</span>
        <CloseIcon color={accent3Color} style={{verticalAlign: "middle"}} />
      </div>
    )
  }
}
