import { ContactInformation } from "../Data/userId.js";

const loadInformation = () => {
    const {horarios}= ContactInformation;
    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let footerAddress = document.getElementById('footer-address-ContactInfo');
    if (footerAddress !== null) {
        footerAddress.innerHTML = `
        <i class="bi bi-geo-alt"></i>
        <span>${ContactInformation.footerAddress}</span>`;
    }

    let footerPhone = document.getElementById('footer-phone-ContactInfo');
    if (footerPhone !== null) {
        footerPhone.innerHTML = `
        <i class="bi bi-telephone"></i>
        <span>${ContactInformation.footerPhone}</span>`;
    }

    let footerEmail = document.getElementById('footer-email-ContactInfo');
    if (footerEmail !== null) {
        footerEmail.innerHTML = `
        <i class="bi bi-envelope-open mr-3"></i>
        <span>${ContactInformation.footerEmail}</span>
            `;
    }
    let address = document.getElementById('address-ContactInfo');
    if (address !== null) {
        address.innerHTML = `
        <p class="">
            <i class="fa fa-map-marker fa-lg  p-1"></i>
            ${ContactInformation.address}
        </p>
            `;
    }

    let phone = document.getElementById('phone-ContactInfo');
    if (phone !== null) {
        phone.innerHTML = `
        <p class="">
            <i class="fa fa-phone fa-lg  p-1"></i>
            ${ContactInformation.phone}
        </p>
            `;
    }

    let email = document.getElementById('email-ContactInfo');
    if (email !== null) {
        email.innerHTML = `
        <p class="">
            <i class="fa fa-envelope fa-lg  p-1"></i>
            ${ContactInformation.email}
        </p>
            `;
    }

    let horario = document.getElementById('horario-ContactInfo');
    if (horario !== null) {
        horario.innerHTML= horarios.map((data) => 
    `<li >
        <i class="bi bi-clock"></i>
        <span>${data.horario}</span>
    </li>`
    ).join('');
    }
}

loadInformation();