import {  errorAlert } from "./js/pixabay-api";
import { renderPhoto } from "./js/render-functions"
import axios from 'axios';

let totalPages;
let request;
let page = 1;
const limit = 15;

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');


form.addEventListener('submit', formSubmit);
loadBtn.addEventListener('click', loadMore); 

async function formSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    loadBtn.classList.add('visually-hidden');
   request = event.target.elements.searchQuery.value.trim();
    if (!request) {
        return;
    }
    gallery.insertAdjacentHTML('afterend', '<div class="load"><span class="loader"></span>Loading images, please wait...</div>');
    const load = document.querySelector('.load');
    try {
        page = 1;
        const photos = await fetchPhoto(request);
        totalPages = Math.ceil(photos.totalHits / limit);
           if (!photos.hits.length) {
               errorAlert("Sorry, there are no images matching your search query. Please try again!");
               load.remove();
                return;
            };
        renderPhoto(photos.hits);
           if (gallery.nextElementSibling.classList.contains('load')) {
            load.remove();
        };
        loadBtn.classList.remove('visually-hidden');
 if (totalPages === page) {
            loadBtn.classList.add('visually-hidden');
        }
           
    } catch (error) {
           load.remove();
		 errorAlert(error);
    } 
    form.reset();
};

async function fetchPhoto(content) {
    const searchParams = new URLSearchParams({
        key: '47184565-fb8804c1f628caa9d6cc17425',
        q: content,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: limit,
    });
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        return response.data;
};

async function loadMore() {
    loadBtn.classList.add('visually-hidden');
    gallery.insertAdjacentHTML('afterend', '<div class="load"><span class="loader"></span>Loading images, please wait...</div>');
    const load = document.querySelector('.load');
    try {
        page += 1;
        const loadPhoto = await fetchPhoto(request);
       load.remove();
        renderPhoto(loadPhoto.hits);
        if (page === totalPages) {
            loadBtn.classList.add('visually-hidden');
            errorAlert("We're sorry, but you've reached the end of search results.")
            return;
    }
        const coord = gallery.firstElementChild.getBoundingClientRect();
        scrollBy({
            top: Math.ceil(coord.height * 2),
            behavior: "smooth",
        });
        loadBtn.classList.remove('visually-hidden');
    } catch (error) {
          load.remove();
        errorAlert(error);
    }
};