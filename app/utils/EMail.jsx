import React from 'react';

export default class EMail extends React.Component {
  static propTypes = {
    subject: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
  };

  componentWillMount() {
    window.open(`mailto:?subject=${escape(this.props.subject)}&body=${escape(this.props.body)}`);
  }

  render() {
    return null;
  }
}
