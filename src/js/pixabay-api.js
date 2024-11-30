import { renderPhoto } from "./render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../error.svg';

export function galleryCreate(response) {
    if (!response.data.hits.length) {
                iziToast.error({
                    backgroundColor: 'red',
                    iconUrl: errorIcon,
                    theme: 'dark',
                    overlay: false,
                    position: 'topRight',
                    title: 'Error',
                    titleColor: 'white',
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    messageColor: 'white',
                    overlayColor: 'rgba(0, 0, 0, 0.6)',
                });   
    };   
    return renderPhoto(response.data.hits);

}

export function errorAlert(error) {
   return iziToast.error({
            backgroundColor: 'red',
            iconUrl: errorIcon,
            theme: 'dark',
            overlay: false,
            position: 'topRight',
            title: 'Error',
            titleColor: 'white',
            message: `${error}`,
            messageColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
   });   
}


export function errorLoad() {
    return iziToast.error({
            backgroundColor: 'red',
            iconUrl: errorIcon,
            theme: 'dark',
            overlay: false,
            position: "topRight",
            message: "We're sorry, but you've reached the end of search results.",
            titleColor: 'white',
            messageColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
    });
}