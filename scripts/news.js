'use strict';

// https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&apiKey=eb70434c70444da98e4f2252bcd71db9
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY, '[]'));
const KEY_CURRENTUSER = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(KEY_CURRENTUSER, '[]'));
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const country = 'us';
const category = currentUser.category ?? 'general';
const pageSize = currentUser.pageSize ?? 10;
let page = 1;
User.getJSON = async function () {
  try {
    let newsContainer = document.getElementById('news-body');
    newsContainer.innerHTML = '';
    //const resNews = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=9ddea5b4c23d41fab68d0e9779d87815`
    );
    const resNews = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&page=1&apiKey=9ddea5b4c23d41fab68d0e9779d87815`
    );
    
    const dataNews = await resNews.json();

    // Hàm phân trang, VD: Math.ceil(3.1) => 4, Math.ceil(dataNews.totalResults / pageSize) => sẽ là số lượng trang tối đa
    paging(Math.ceil(dataNews.totalResults / pageSize));
    console.log(
      dataNews.totalResults,
      Math.ceil(dataNews.totalResults / pageSize)
    );

    if (!resNews.ok) throw new Error('Đã có lỗi xảy ra!');

    let text = '';
    for (let i = 0; i < dataNews.articles.length; i++) {
      text += `
    <div class="row border mb-3 rounded">
              <div class="col-4">
                <img
                  src="${dataNews.articles[i].urlToImage}"
                  alt=""
                  class="news-thumbnail"
                />
              </div>
              <div class="col-8">
                <div class="news-title mb-2">
                  <strong
                    >${dataNews.articles[i].title}</strong
                  >
                </div>
                <div class="news-description mb-2">
                ${dataNews.articles[i].description}
                </div>
                <button class="news-url">
                  <a
                    href="${dataNews.articles[i].url}"
                    target="_blank">View</a
                  >
                </button>
              </div>
            </div>
    `;
    }
    newsContainer.innerHTML = text;
  } catch (err) {
    console.error(`${err.message} 💥💥`);
  }
};
User.getJSON();

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
  User.getJSON();
});

btnPrev.addEventListener('click', function () {
  page--;
  User.getJSON();
});
