import React from 'react';

export default class Flag extends React.Component {
  static propTypes = {
    lang: React.PropTypes.oneOf([
      'spanish',
      'english',
    ]),
  };

  render() {
    switch (this.props.lang) {
      case 'spanish': return (
        <img
          src="es.svg"
          alt="flag of Spain"
          style={({
            width: '43px',
            height: '32px',
          })}
        />
      );
      case 'english': return (
        <img
          src="us.svg"
          alt="flag of USA"
          style={({
            width: '43px',
            height: '32px',
          })}
        />
      );
      default: return null;
    }
  }
}
