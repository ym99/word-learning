export function flagStyle(lang) {
  let backgroundImage;
  switch (lang) {
    case 'spanish': backgroundImage = 'url("images/es.svg")'; break;
    case 'russian': backgroundImage = 'url("images/ru.svg")'; break;
    case 'english': backgroundImage = 'url("images/us.svg")'; break;
    default: backgroundImage = null; break;
  }

  return {
    backgroundImage,
    backgroundSize: '43px 32px',
    backgroundRepeat: 'no-repeat',
  };
}
