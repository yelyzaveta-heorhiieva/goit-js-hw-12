import { galleryCreate, errorAlert, errorLoad } from "./js/pixabay-api";
import axios from 'axios';


const limit = 15;
let page = 1;
let request;
let totalPages;


const form = document.querySelector('.search-form');
form.addEventListener('submit', formSubmit);
const gallery = document.querySelector('.gallery');
export const loadBtn = document.querySelector('.load-btn');
loadBtn.addEventListener('click', loadMore); 


async function formSubmit(event) {
    event.preventDefault();
    form.nextElementSibling.innerHTML = '';
    loadBtn.classList.add('visually-hidden');
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
        loadBtn.classList.remove('visually-hidden');
        galleryCreate(response);
        if (page === totalPages) {
            loadBtn.classList.add('visually-hidden');
            errorLoad();
            return;
        } 
           
    } catch (error) {
        load.remove();
		return errorAlert(error);
    } 
};

async function loadMore(evt) {
    loadBtn.classList.add('visually-hidden');
    try {
        page += 1;
        await fetchPhoto();
        const coord = gallery.firstElementChild.getBoundingClientRect();
        scrollBy({
            top: Math.ceil(coord.height * 2),
            behavior: "smooth",
        });
        loadBtn.classList.remove('visually-hidden');
    } catch (error) {
        errorAlert(error);
    }
};