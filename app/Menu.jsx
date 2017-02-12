import React from 'react';
import DateEx from './utils/DateEx';

export default class Menu extends React.Component {
  static propTypes = {
    mode: React.PropTypes.string.isRequired,
    changeMode: React.PropTypes.func.isRequired,
  }

  render() {
    const date = new DateEx();

    return (
      <div
        className="well well-sm"
        style={({
          textAlign: 'center',
        })}
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
            >Word<br />Learning</a>
          </li>
          <li
            role="presentation"
            className={this.props.mode === 'new' ? 'active' : ''}
          >
            <a
              href="#"
              onClick={() => { this.props.changeMode('new'); return false; }}
            >
              New<br />Words
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
              Test<br />All
            </a>
          </li>
          <li
            role="presentation"
            className="disabled"
          >
            <a href="#">
              <div
                style={({
                  cursor: 'default',
                  fontSize: 'x-small',
                })}
              >
                {`${date.getDay()}`}
              </div>
              <div
                style={({
                  cursor: 'default',
                  fontSize: 'x-small',
                })}
              >
                {`${date.getDate()}`}
              </div>
              <div
                style={({
                  cursor: 'default',
                  fontSize: 'small',
                })}
              >
                {`${date.getTime()}`}
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
