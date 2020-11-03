/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  const upper = str.toLocaleUpperCase();

  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    result += alphabet[(alphabet.indexOf(upper[i]) + n) % alphabet.length];
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  const strUpper = str.toLocaleUpperCase();
  let strO = '';
  let pos;
  let index;
  for (let i = 0; i < str.length; i += 1) {
    pos = alphabet.indexOf(strUpper[i]) - n;
    if (pos < 0) {
      index = alphabet.length + pos;
    } else {
      index = pos;
    }
    strO += alphabet[index];
  }
  return strO;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  let inp;

  let strOut;

  function init(el) {
    // Setja event handlera á viðeigandi element
    const form = el;

    // update output on every change
    form.addEventListener('change', () => {
      inp = form.input.value;
      if (type === 'decode') {
        strOut = decode(inp, shift, alphabet);
      } else {
        strOut = encode(inp, shift, alphabet);
      }
      document.getElementsByClassName('result')[0].innerHTML = strOut;
    });

    el.alphabet.addEventListener('change', () => {
      alphabet = el.alphabet.value;
      form.shift.max = alphabet.length;
      shift = Number.parseInt(form.shift.value, 10);
      document.getElementsByClassName('shiftValue')[0].innerHTML = shift;
    });

    el.encode.addEventListener('change', () => {
      type = 'encode';
    });

    el.decode.addEventListener('change', () => {
      type = 'decode';
    });

    el.shift.addEventListener('change', () => {
      shift = Number.parseInt(form.shift.value, 10);
      document.getElementsByClassName('shiftValue')[0].innerHTML = shift;
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
