import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

let lightbox = null;

function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function createGallery(images) {
  if (!galleryContainer) {
    console.error('Gallery container not found');
    return;
  }

  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img
          src="${image.webformatURL}"
          alt="${image.tags}"
          loading="lazy"
          width="360"
          height="200"
        />
        <div class="image-info">
          <p class="info-item">
            <b>Likes</b>
            ${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${image.downloads}
          </p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  initLightbox();
  if (lightbox) {
    lightbox.refresh();
  }
}

export function clearGallery() {
  if (!galleryContainer) {
    return;
  }
  galleryContainer.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}

