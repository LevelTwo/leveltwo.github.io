import React, { PropTypes, Component } from 'react'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

export default class IncorrectListItem extends Component {

  static propTypes = {
<<<<<<< HEAD
    primaryText: PropTypes.string.isRequired,
=======
    label: PropTypes.string.isRequired,
>>>>>>> 3fc8605ccb9c55698b863dbdcc28e9b00fb0124a
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    const { accent3Color } = this.context.muiTheme.baseTheme.palette

    return (
      <div>
<<<<<<< HEAD
        <span style={{verticalAlign: "middle", paddingRight: 10, color: accent3Color}}>{this.props.primaryText}</span>
=======
        <span style={{verticalAlign: "middle", paddingRight: 10, color: accent3Color}}>{this.props.label}</span>
>>>>>>> 3fc8605ccb9c55698b863dbdcc28e9b00fb0124a
        <CloseIcon color={accent3Color} style={{verticalAlign: "middle"}} />
      </div>
    )
  }
}
