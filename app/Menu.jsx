import React from 'react';

export default class Menu extends React.Component {
  static propTypes = {
    mode: React.PropTypes.string.isRequired,
    changeMode: React.PropTypes.func.isRequired,
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
        className="well well-sm"
      >
        <ul className="nav nav-pills">
          <li
            role="presentation"
            className="disabled"
          >
            <a
              href="#"
              style={({
                cursor: 'default',
                fontSize: 'large',
                fontWeight: 'bold',
              })}
            >Word Learning</a>
          </li>
          <li
            role="presentation"
            className={this.props.mode === 'new' ? 'active' : ''}
          >
            <a
              href="#"
              onClick={() => { this.props.changeMode('new'); return false; }}
            >
              New
            </a>
          </li>
          <li
            role="presentation"
            className={this.props.mode === 'mix' ? 'active' : ''}
          >
            <a
              href="#"
              onClick={() => { this.props.changeMode('mix'); return false; }}
            >
              Mix
            </a>
          </li>
          <li
            role="presentation"
            className={this.props.mode === 'test' ? 'active' : ''}
          >
            <a
              href="#"
              onClick={() => { this.props.changeMode('test'); return false; }}
            >
              Test
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
