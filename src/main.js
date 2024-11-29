import { galleryCreate, errorAlert } from "./js/pixabay-api";

const form = document.querySelector('.search-form');

form.addEventListener('submit', formSubmit);


function formSubmit(event) {
    event.preventDefault();
    form.nextElementSibling.innerHTML = '';
    if (!event.target.elements.searchQuery.value) {
        return;
    }
    const searchParams = new URLSearchParams({
        key: '47184565-fb8804c1f628caa9d6cc17425',
        q: event.target.elements.searchQuery.value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    const URL = `https://pixabay.com/api/?${searchParams}`;

    form.insertAdjacentHTML('afterend', '<div class="load"><span class="loader"></span>....Loading....Please, wait!</div>');
    const load = document.querySelector('.load');
    return fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((data) => {
            load.remove();
            galleryCreate(data);
        })

        .catch((error) => {
            load.remove();
            errorAlert(error);
        });
}

    