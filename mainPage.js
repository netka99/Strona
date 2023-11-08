const checkCookie = (key) => {
  return document.cookie.split(';').some((cookie) => {
    const [cookieKey, value] = cookie.split('=');
    return cookieKey === key;
  });
};

const modal = document.getElementById('modalId');

if (!checkCookie('ssapi')) {
  modal.style.display = 'block';
} else {
  modal.style.display = 'none';
}
