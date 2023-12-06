// const checkCookie = (key) => {
//   return document.cookie.split(';').some((cookie) => {
//     const [cookieKey, value] = cookie.split('=');
//     return cookieKey === key;
//   });
// };

// const modal = document.getElementById('modalId');

// if (!checkCookie('ssapi')) {
//   modal.style.display = 'block';
// } else {
//   modal.style.display = 'none';
// }

const checkCookie = (key) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieKey, value] = cookie.split('=');
    if (cookieKey.trim() === key.trim()) {
      return true;
    }
  }
  return false;
};

const modal = document.getElementById('modalId');

if (!checkCookie('ssapi')) {
  modal.style.display = 'block';
} else {
  modal.style.display = 'none';
  console.log('logged');
}
