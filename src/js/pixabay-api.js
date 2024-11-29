import { renderPhoto } from "./render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../error.svg';

export function galleryCreate(data) {
    if (!data.hits.length) {
                iziToast.error({
                    backgroundColor: 'red',
                    iconUrl: errorIcon,
                    theme: 'dark',
                    overlay: false,
                    position: 'topCenter',
                    title: 'Error',
                    titleColor: 'white',
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    messageColor: 'white',
                    overlayColor: 'rgba(0, 0, 0, 0.6)',
                });   
    };
    return renderPhoto(data.hits);
}

export function errorAlert(error) {
   return iziToast.error({
            backgroundColor: 'red',
            iconUrl: errorIcon,
            theme: 'dark',
            overlay: false,
            position: 'topCenter',
            title: 'Error',
            titleColor: 'white',
            message: `${error}`,
            messageColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
   });   
}
        