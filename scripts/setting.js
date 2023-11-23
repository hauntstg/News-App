'use strict';

const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const saveBtn = document.getElementById('btn-submit');
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY, '[]'));
const KEY_CURRENTUSER = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(KEY_CURRENTUSER, '[]'));

if (Object.keys(currentUser).length !== 0) {
  // Lấy dữ liệu từ localStorage của user hiện tại
  pageSizeInput.value = currentUser.pageSize;
  categoryInput.value =
    currentUser.category[0].toUpperCase() + currentUser.category.slice(1);
} else {
  // Tham số mặc định khi không đăng nhập, pageSize = 10 và category = 'General'
  pageSizeInput.value = 10;
  categoryInput.value = 'General';
}

// Xử lý sự kiện khi click vào nút save
saveBtn.addEventListener('click', function () {
  if (pageSizeInput.value === '') {
    alert('Vui lòng nhập đầy đủ thông tin!');
  } else {
    currentUser.pageSize = pageSizeInput.value;
    currentUser.category = categoryInput.value;
    userArr.forEach(user => {
      if (user.username === currentUser.username) {
        user.pageSize = pageSizeInput.value;
        user.category = categoryInput.value;
      }
    });
    saveToStorage(KEY_CURRENTUSER, JSON.stringify(currentUser));
    saveToStorage(KEY, JSON.stringify(userArr));
    alert('Lưu thành công!');
  }
});
