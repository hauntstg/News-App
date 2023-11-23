'use strict';

const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const passwordConfirmInput = document.getElementById('input-password-confirm');
const registerBtn = document.getElementById('btn-submit');

const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY, '[]'));

const validate = function (data) {
  for (let i = 0; i < userArr.length; i++) {
    if (data.username === userArr[i].username) {
      alert('Đã tồn tại tên username này!');
      return false;
    }
  }

  if (
    data.firstName === '' ||
    data.lastName === '' ||
    data.username === '' ||
    data.password === '' ||
    data.passwordConfirm === ''
  ) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return false;
  } else if (data.password !== data.passwordConfirm) {
    alert('Mật khẩu xác nhận không khớp!');
    return false;
  } else if (data.password.length < 8) {
    alert('Mật khẩu phải từ 8 ký tự!');
    return false;
  } else {
    return true;
  }
};

// Khởi tạo đối tượng, mặc định pageSize = 10, category = general
registerBtn.addEventListener('click', function () {
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
    pageSize: 10,
    category: 'general',
  };

  const newUser = parseUser(data);
  if (validate(data)) {
    userArr.push(newUser);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = '../pages/login.html';
  }
});
