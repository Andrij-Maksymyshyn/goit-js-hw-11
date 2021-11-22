import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

const search_form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const load_more = document.querySelector('.load-more');
const input = document.querySelector('input');
let page = 1;
const totalHits = 500;
const pageSize = 40;
const totalPages = totalHits / pageSize;


axios.defaults.baseURL = 'https://pixabay.com/api';
load_more.classList.add('is-hidden');

//////////////////////////////////////////////////////////////////////////////////////

search_form.addEventListener('submit', (e) => {
  const value = search_form.elements.searchQuery.value;
  e.preventDefault();
   if (value.trim() === '') {
     gallery.innerHTML = '';
     load_more.classList.add('is-hidden');        
     return;
     };

fetchPicture(value).then(showPictures);
page += 1;

 load_more.classList.remove('is-hidden');

 
 if ([value] !== [value]) {
  gallery.innerHTML = '';
   }
  });

    
  input.addEventListener('input', () => {
    page = 1;
  }) 



  load_more.addEventListener('click', () => {
    
    const value = search_form.elements.searchQuery.value;
      fetchPicture(value).then(showPictures);
     
      page += 1;

        
      if (page > totalPages) {
       load_more.classList.add('is-hidden');
       Notify.info("We're sorry, but you've reached the end of search results.");
      }
      });
  
           
//////////////////////////////////////////////////////////////////////////

async function fetchPicture (value) {
  try {
    const url = `?key=24382748-1dfb63c81149146d5ea200f75&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${pageSize}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }        
    };

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   function showPictures(data) {
   
    if (data.total === 0) {
      load_more.classList.add('is-hidden');
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  
  if (data.hits[0].id && (page === 1 || page === 2)) {   
      Notify.info(`Hooray! We found ${data.totalHits} images.`);
   
         }       
    
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

  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 




 


