'use strict';

const loginForm = document.getElementById('login-modal');
const mainForm = document.getElementById('main-content');
const logoutBtn = document.getElementById('btn-logout');
const welcomeHtml = document.getElementById('welcome-message');

const KEY_CURRENTUSER = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(KEY_CURRENTUSER, '[]'));

// Check Object có empty không
if (Object.keys(currentUser).length !== 0) {
  const html = `Welcome ${currentUser.firstName}`;
  loginForm.style.display = 'none';
  welcomeHtml.append(html);
} else mainForm.style.display = 'none';

logoutBtn.addEventListener('click', function () {
  localStorage.removeItem(KEY_CURRENTUSER);
  window.location.href = 'index.html';
});
