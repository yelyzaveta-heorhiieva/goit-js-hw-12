import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../error.svg';

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
    };
