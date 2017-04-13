export default class EMail {
  static send({ subject, body }) {
    let mailTo = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (mailTo.length > 2000) {
      mailTo = mailTo.substr(0, 2000);

      for (let tail = encodeURIComponent('\r\n'); tail.length > 0; tail = tail.substr(0, tail.length - 1)) {
        if (mailTo.substr(-tail.length, tail.length) === tail) {
          mailTo = mailTo.substr(0, mailTo.length - tail.length);
        }
      }

      mailTo = `${mailTo}${encodeURIComponent('\r\n...')}`;
    }

    const iframe = document.createElement('iframe');
    iframe.width = '0px';
    iframe.height = '0px';
    iframe.src = mailTo;

    document.body.appendChild(iframe);

    window.setTimeout(() => document.body.removeChild(iframe), 0);
  }
}
