import React from 'react';
import DateEx from './utils/DateEx';

export default class Menu extends React.Component {
  static propTypes = {
    startTime: React.PropTypes.instanceOf(DateEx).isRequired,
    mode: React.PropTypes.oneOf([
      'new',
      'test',
    ]).isRequired,
    changeMode: React.PropTypes.func.isRequired,
  }

  render() {
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
                fontSize: 'normal',
                fontWeight: 'bold',
              })}
            >
              Word<br />Learning
            </a>
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
              Test<br />100
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
            className="disabled pull-right"
          >
            <a
              href="#"
              style={({
                cursor: 'default',
                fontSize: 'x-small',
                paddingLeft: '0',
                paddingRight: '0',
              })}
            >
              <div>
                {`${this.props.startTime.getDay()}`}
              </div>
              <div>
                {`${this.props.startTime.getDate()}`}
              </div>
              <div>
                {`${this.props.startTime.getTime()}`}
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
