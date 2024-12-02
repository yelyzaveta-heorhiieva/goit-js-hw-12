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
    if (gallery.nextElementSibling) {
         gallery.nextElementSibling.remove();
    }
    request = event.target.elements.searchQuery.value.trim();
    if (!request) {
        return;
    }
    page = 1;
    await fetchPhoto();
};

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

    gallery.insertAdjacentHTML('afterend', '<div class="load"><span class="loader"></span>Loading images, please wait...</div>');
    const load = document.querySelector('.load');

    try {
        const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        load.remove();
        totalPages = Math.ceil(response.data.totalHits / limit);
        galleryCreate(response);
        if (page < totalPages) {
           gallery.insertAdjacentHTML('afterend', '<button type="button" class="load-btn">Load more</button>');
           const loadBtn = document.querySelector('.load-btn');
           loadBtn.addEventListener('click', loadMore); 
        } else if(response.data.hits.length) {
             errorLoad();
        };
    } catch (error) {
        load.remove();
		return errorAlert(error);
    } 
};

async function loadMore(evt) {
    evt.target.remove();
    try {
        page += 1;
        await fetchPhoto();
        const coord = gallery.firstElementChild.getBoundingClientRect();
        scrollBy({
            top: Math.ceil(coord.height * 2),
            behavior: "smooth",
        });
    } catch (error) {
        errorAlert(error);
    }
};