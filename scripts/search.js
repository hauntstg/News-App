'use strict';

const keywordsInput = document.getElementById('input-query');
const searchBtn = document.getElementById('btn-submit');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY, '[]'));
const KEY_CURRENTUSER = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(KEY_CURRENTUSER, '[]'));
// https://newsapi.org/v2/everything?q=javascipt&pageSize=10&page=1&sortBy=popularity&apiKey=eb70434c70444da98e4f2252bcd71db9

// Các tham số mặc định
const language = 'en';
const pageSize = 5;
let page = 1;
const sortBy = 'popularity';

searchBtn.addEventListener('click', async function () {
  try {
    if (keywordsInput.value === '') {
      alert('Vui lòng nhập từ khóa!');
    } else {
      let searchContainer = document.getElementById('search-body');
      searchContainer.innerHTML = '';
      const resSearch = await fetch(
        `https://newsapi.org/v2/everything?q=${keywordsInput.value}&language=${language}&pageSize=${pageSize}&page=${page}&sortBy=${sortBy}&apiKey=9ddea5b4c23d41fab68d0e9779d87815`
      );
      const dataSearch = await resSearch.json();
      console.log(dataSearch);

      // Hàm phân trang, VD: Math.ceil(3.1) => 4, Math.ceil(dataNews.totalResults / pageSize) => sẽ là số lượng trang tối đa
      paging(Math.ceil(dataSearch.totalResults / pageSize));
      console.log(
        dataSearch.totalResults,
        Math.ceil(dataSearch.totalResults / pageSize)
      );

      if (!resSearch.ok) throw new Error('Đã có lỗi xảy ra!');

      let text = '';
      for (let i = 0; i < dataSearch.articles.length; i++) {
        text += `
    <div class="row border mb-3 rounded">
              <div class="col-4">
                <img
                  src="${dataSearch.articles[i].urlToImage}"
                  alt=""
                  class="search-thumbnail"
                />
              </div>
              <div class="col-8">
                <div class="search-title mb-2">
                  <strong
                    >${dataSearch.articles[i].title}</strong
                  >
                </div>
                <div class="search-description mb-2">
                ${dataSearch.articles[i].description}
                </div>
                <button class="search-url">
                  <a
                    href="${dataSearch.articles[i].url}"
                    target="_blank">View</a
                  >
                </button>
              </div>
            </div>
    `;
      }
      searchContainer.innerHTML = text;
    }
  } catch (err) {
    console.error(`${err.message} 💥💥`);
  }
});

// Hàm ẩn đi nút Prev và Next
const paging = function (pageNumber) {
  document.getElementById('page-num').textContent = page;

  if (page == 1) btnPrev.style.visibility = 'hidden';
  else btnPrev.style.visibility = 'visible';

  if (page == pageNumber) btnNext.style.visibility = 'hidden';
  else btnNext.style.visibility = 'visible';
};

// Xử lý sự click vào nút Next hoặc Prev
btnNext.addEventListener('click', function () {
  page++;
  searchBtn.click();
});

btnPrev.addEventListener('click', function () {
  page--;
  searchBtn.click();
});
