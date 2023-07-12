import { servicesInformation } from "../Data/userId.js";

const loadInformation = () => {

    localStorage.removeItem('globalQuery');
    let servicio = document.getElementById('servicio-info');
    if(servicio != null){
        servicio.innerHTML =`
        <h3>Nuestros Servicios</h3>
        <p>
            ${servicesInformation.nuestroServicio}
        </p>
        `;
    }

}

loadInformation();