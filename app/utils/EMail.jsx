export default class EMail {
  static send({ subject, body }) {
    window.open(`mailto:?subject=${encodeURI(subject)}&body=${encodeURI(body)}`);
  }
}
