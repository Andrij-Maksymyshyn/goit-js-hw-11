import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function showPictures(data) {      
        
    const markupPicture = data.hits
      .map((card) => {
      return `<div class="photo-card">
      <a class="link-card" href="${card.largeImageURL}">
      <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" width="300" height="220"/>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${card.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
         <span>${card.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${card.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${card.downloads}</span>
        </p>
      </div>
      </a>
    </div>`;    
  })
  .join("");
  
  gallery.insertAdjacentHTML('beforeend', markupPicture);
      
  
  let lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
        });
 lightbox.refresh();

 const { height: cardHeight } = document
 .querySelector('.gallery')
 .firstElementChild.getBoundingClientRect();
 
 window.scrollBy({
 top: cardHeight * 2,
 behavior: 'smooth',
 });
  }
