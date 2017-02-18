export default class EMail {
  static send({ subject, body }) {
    window.open(`mailto:?subject=${escape(subject)}&body=${escape(body)}`);
  }
}
