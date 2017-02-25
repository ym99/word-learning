export default class EMail {
  static send({ subject, body }) {
    let mailTo = `mailto:?subject=${encodeURI(subject)}&body=${encodeURI(body)}`;
    if (mailTo.length > 2048) {
      mailTo = `${mailTo.substr(0, 2040)}${encodeURI('\r\n...')}`;
    }

    const iframe = document.createElement('iframe');
    iframe.width = '0px';
    iframe.height = '0px';
    iframe.src = mailTo;

    document.body.appendChild(iframe);

    window.setTimeout(() => document.body.removeChild(iframe), 0);
  }
}
