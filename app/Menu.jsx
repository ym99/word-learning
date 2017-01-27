import React from 'react';

export default class Menu extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <div
        style={({
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: '100%',
        })}
      >
        <ul className="nav nav-tabs">
          <li role="presentation"><a href="/a">Word Learning</a></li>
          <li role="presentation" className="active"><a href="/a">Home</a></li>
          <li role="presentation"><a href="/a">Profile</a></li>
          <li role="presentation"><a href="/a">Messages</a></li>
        </ul>
      </div>
    );
  }
}
