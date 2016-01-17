import React from 'react'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

const names = [
  'Ada Lovelace',
  'Grace Hopper',
  'Marie Curie',
  'Carl Friedrich Gauss',
  'Nikola Tesla',
  'Claude Shannon',
];

export default class Leaderboard extends React.Component {
  constructor() {
    super();
    const Players = {};
  }
  componentWillMount() {
    for (let i = 0; i < names.length; i++) {
      Players[names[i]] = Math.floor(Math.random() * 10) * 5;
    }
  }
  render() {
    return (
      <List>
      {this.props.players.map((player) => {
        return [
          <ListItem key={player._id}
            primaryText={player.name}
            onClick={this.selectPlayer.bind(this, player._id)}
            leftAvatar={<Avatar src={'/' + player.name + '.png'}/>}
            secondaryText={'Current score: ' + player.score}
            style={style}/>,
          <ListDivider/>,
        ];
      })}
      </List>
    );
  }
};
