
import Swal from 'sweetalert2';

const Alert = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        background: '#f0f9ff', 
        color: '#1e3a8a', 
        confirmButtonColor: '#2563eb', 
        customClass: {
            title: 'font-bold text-xl', 
            htmlContainer: 'text-base', 
            confirmButton: 'px-4 py-2 rounded-md text-white', 
        },
    });
};

export default Alert;
