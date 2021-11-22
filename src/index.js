import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix';
import {fetchPicture} from './fetch'
import {showPictures} from './show';

const search_form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const load_more = document.querySelector('.load-more');
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

////////////////////////////////////////////////////////////////////////////    
 
  load_more.addEventListener('click', () => {
    
    const value = search_form.elements.searchQuery.value;
      fetchPicture(value).then(showPictures);
     
      page += 1;
        
      if (page > totalPages) {
       load_more.classList.add('is-hidden');
       Notify.info("We're sorry, but you've reached the end of search results.");
      }
      });  
           
     
   
  


 




 


