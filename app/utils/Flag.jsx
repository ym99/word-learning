export function flagStyle(lang) {
  let backgroundImage;
  switch (lang) {
    case 'spanish': backgroundImage = 'url("es.svg")'; break;
    case 'english': backgroundImage = 'url("us.svg")'; break;
    default: backgroundImage = null; break;
  }

  return {
    backgroundImage,
    backgroundSize: '43px 32px',
    backgroundRepeat: 'no-repeat',
  };
}
