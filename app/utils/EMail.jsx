export default class EMail {
  static send({ subject, body }) {
    let mailTo = `mailto:?subject=${encodeURI(subject)}&body=${encodeURI(body)}`;
    const iframe = document.createElement('iframe');
    iframe.width = '0px';
    iframe.height = '0px';
    iframe.src = mailTo;

    document.body.appendChild(iframe);

    window.setTimeout(() => document.body.removeChild(iframe), 0);
  }
}
