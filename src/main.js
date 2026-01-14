import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// ВАЖЛИВО: Шукаємо форму по класу .form, як вимагає автоперевірка
const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

// Обробка пошуку (Submit)
searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements['searchQuery'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  // Скидаємо змінні
  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader(); // Ховаємо лоадер одразу після отримання відповіді

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    // Логіка показу кнопки: якщо знайдено більше картинок, ніж ми показали (15)
    if (totalHits > perPage) {
      showLoadMoreButton();
    }
    
    // Очищаємо поле вводу (за бажанням)
    event.target.reset();

  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
});

// Обробка кнопки "Load More"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  
  hideLoadMoreButton(); // Ховаємо кнопку, щоб не клікали під час завантаження
  showLoader(); // Показуємо лоадер

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    createGallery(data.hits); // Домальовуємо нові

    // Плавний скрол
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Перевірка: чи дійшли ми до кінця колекції
    // (поточна сторінка * кількість на сторінці) >= загальної кількості
    const totalLoaded = currentPage * perPage;
    
    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton(); // Якщо ще є картинки, повертаємо кнопку
    }

  } catch (error) {
    hideLoader();
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    // Якщо помилка - повертаємо кнопку, щоб можна було спробувати ще раз
    showLoadMoreButton(); 
  }
});