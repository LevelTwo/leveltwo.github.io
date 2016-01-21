import React, { PropTypes, Component } from 'react'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

export default class IncorrectListItem extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <span style={{verticalAlign: "middle", paddingRight: 10}}>{this.props.label}</span>
        <CloseIcon style={{verticalAlign: "middle"}} />
      </div>
    )
  }
}
