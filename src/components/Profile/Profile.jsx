import React, { PropTypes, Component } from 'react'
import Avatar from 'material-ui/lib/avatar'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import { Colors } from 'material-ui/lib/styles'
import { Link } from 'react-router'
import { setAvatar, setName } from '../../actions/actionCreators'
import { connect } from 'react-redux'

class Profile extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  getStyles() {
    const styles = {
      avatar: {
        length: 9,
        style: {
          height: '25%',
          width: '25%',
          margin: '10px',
        },
      },
      actions: {
        display: "flex",
        justifyContent: "space-between",
      },
      avatarGrid: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      card: {
        maxWidth: 700,
        margin: 'auto',
        padding: '2em',
      },
      cardHeader: {
        fontWeight: 300,
        backgroundColor: Colors.grey100,
      },
      centerText: {
        marginTop: '1em',
        marginBottom: '-1.5em',
        display: 'block',
        textAlign: 'center',
      },
    }

    return styles
  }

  getAvatars(count) {
    const { dispatch, avatar } = this.props
    let list = []
    for (let i = 0; i < count; i++) {
      const svg = `images/avatars/avatar${i+1}.svg`
      const avatarStyle = {
        height: "25%",
        width: "25%",
        margin: "10px",
        cursor: "pointer",
        opacity: 0.75 + 0.25 * (svg === avatar),
      }

      list.push(<Avatar
        id={`av${i+1}`}
        key={i}
        src={svg}
        style={avatarStyle}
        onTouchTap={() => dispatch(setAvatar(svg))}
      />)
    }
    return list
  }
  render() {
    const { dispatch, name, avatar } = this.props
    const palette = this.context.muiTheme.baseTheme.palette
    const styles = this.getStyles()

    return (
      <Card style={styles.card}>
        <CardHeader
          title={name}
          subtitle="Your Profile"
          avatar={avatar}
          style={styles.cardHeader}
        />
        <h2>Enter Name</h2>
        <TextField
          hintText="Anant Sahai"
          floatingLabelText="What Is Your Name?"
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <br/>
        <h2>Pick an Avatar</h2>
        <div style={styles.avatarGrid}>
          {this.getAvatars(styles.avatar.length)}
        </div>
        <a
          href='http://www.freepik.com/free-vector/character-faces-icons_777192.htm'
          style={styles.centerText}
        >
          Avatars Designed by Freepik
        </a>
        <br/>
        <h2 style={{marginBottom: "1em"}}>Continue?</h2>
        <div style={styles.actions}>
          <Link to="/app">
            <RaisedButton
              label="Okey"
              backgroundColor={palette.accent2Color}
              labelColor={palette.textColor}
            />
          </Link>
          <RaisedButton
            target="_blank"
            backgroundColor={palette.accent3Color}
            labelColor={palette.textColor}
            linkButton={true}
            href="http://bit.ly/1KaoD1P"
            label="Nooo Get Me Out Of Here!"
          />
        </div>
      </Card>
    )
  }
}

function select(state) {
  return {
    name: state.name,
    avatar: state.avatar,
  }
}

export default connect(select)(Profile)
