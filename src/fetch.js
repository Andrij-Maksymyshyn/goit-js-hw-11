import axios from 'axios';
import { Notify } from 'notiflix';

const input = document.querySelector('input');
const load_more = document.querySelector('.load-more');
let page = 1;
const pageSize = 40;

export async function fetchPicture (value) {
    try {
       const url = `?key=24382748-1dfb63c81149146d5ea200f75&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${pageSize}`;
       const response = await axios.get(url);
       page += 1;
       
       if (response.data.total <= pageSize) {
       load_more.classList.add('is-hidden');
       }
      
      
      if ((page <= 2) && response.data.total !== 0) {   
        Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
                }
                
    return response.data;
    } catch (error) {
      console.error(error);
    }        
      };

      input.addEventListener('input', () => {
        page = 1;
      }) 
    