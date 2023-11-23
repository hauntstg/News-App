'use strict';

const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY, '[]'));
const KEY_CURRENTUSER = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(KEY_CURRENTUSER, '[]'));
let indexCurrentUser; // index của user đang login thành công để truy xuất lấy thông tin từ userArr, đăng nhập thất bại indexCurrentUser = undefinded

const validate = function (data) {
  indexCurrentUser = undefined; // Gán lại giá trị cho biến indexCurrentUser mỗi khi hàm validate được gọi
  for (let i = 0; i < userArr.length; i++) {
    if (data.username === userArr[i].username) {
      indexCurrentUser = i;
    }
  }

  if (data.username === '' || data.password === '') {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return false;
  } else if (indexCurrentUser === undefined) {
    alert('Người dùng không tồn tại!');
    return false;
  } else if (data.username !== userArr[indexCurrentUser].username) {
    alert('Tài khoản hoặc mật khẩu không đúng!');
    return false;
  } else if (data.password !== userArr[indexCurrentUser].password) {
    alert('Tài khoản hoặc mật khẩu không đúng!');
    return false;
  } else return true;
};

loginBtn.addEventListener('click', function () {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  if (validate(data)) {
    saveToStorage(KEY_CURRENTUSER, JSON.stringify(userArr[indexCurrentUser]));
    window.location.href = '../index.html';
  }
});
