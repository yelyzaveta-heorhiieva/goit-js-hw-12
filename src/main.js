import { galleryCreate, errorAlert, errorLoad } from "./js/pixabay-api";
import axios from 'axios';


const limit = 15;
let page = 1;
let request;
let totalPages;


const form = document.querySelector('.search-form');
form.addEventListener('submit', formSubmit);
const gallery = document.querySelector('.gallery');

async function formSubmit(event) {
    event.preventDefault();
    form.nextElementSibling.innerHTML = '';
   request = event.target.elements.searchQuery.value.trim();
    if (!request) {
        return;
    }
    if (gallery.nextElementSibling) {
         gallery.nextElementSibling.remove();
    }
    page = 1;
    await fetchPhoto();
     if (gallery.firstElementChild) {
         gallery.insertAdjacentHTML('afterend', '<button type="button" class="load-btn">Load more</button>');
         const loadBtn = document.querySelector('.load-btn');
         loadBtn.addEventListener('click', loadMore); 
  }
}

async function fetchPhoto() {
   const searchParams = new URLSearchParams({
        key: '47184565-fb8804c1f628caa9d6cc17425',
        q: request,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: limit,
    });

    gallery.insertAdjacentHTML('afterend', '<div class="load"><span class="loader"></span>   Loading images, please wait...</div>');
    const load = document.querySelector('.load');

    try {
        const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        load.remove();
        totalPages = Math.ceil(response.data.totalHits / limit);
        return galleryCreate(response);
    } catch (error) {
        load.remove();
		return errorAlert(error);
    } 
}

async function loadMore(evt) {
    evt.target.style.display = 'none';
    if (page >= totalPages) {
             errorLoad();
            return;
        }
    try {
        page += 1;
        await fetchPhoto();
        const coord = gallery.firstElementChild.getBoundingClientRect();
        scrollBy(0, Math.ceil(coord.height * 2));
        evt.target.style.display = 'block';
    } catch (error) {
        errorAlert(error);
    }
}
