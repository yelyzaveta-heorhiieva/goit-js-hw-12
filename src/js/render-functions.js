import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderPhoto(arr) {
   const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
  </a>
   <div class="info">
    <p class="info-item">Likes: <span class="info-span">${likes}</span></p>
    <p class="info-item">Views: <span class="info-span">${views}</span></p>
    <p class="info-item">Comments: <span class="info-span">${comments}</span></p>
    <p class="info-item">Downloads: <span class="info-span">${downloads}</span></p>
  </div>
</li>`).join('');
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
  gallery.insertAdjacentHTML("beforeend", markup);
    const lightbox = new SimpleLightbox('.gallery-item a', { captionType: 'attr', captionPosition: 'bottom', captionsData: "alt", captionDelay: 250 });
  lightbox.refresh();
}


