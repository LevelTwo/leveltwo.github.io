import React, { PropTypes, Component } from 'react'
import CheckIcon from 'material-ui/lib/svg-icons/navigation/check'

export default class CorrectListItem extends Component {

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
    const { accent2Color } = this.context.muiTheme.baseTheme.palette

    return (
      <div>
<<<<<<< HEAD
        <span style={{verticalAlign: "middle", paddingRight: 10, color: accent2Color}}>{this.props.primaryText}</span>
=======
        <span style={{verticalAlign: "middle", paddingRight: 10, color: accent2Color}}>{this.props.label}</span>
>>>>>>> 3fc8605ccb9c55698b863dbdcc28e9b00fb0124a
        <CheckIcon color={accent2Color} style={{verticalAlign: "middle"}} />
      </div>
    )
  }
}
