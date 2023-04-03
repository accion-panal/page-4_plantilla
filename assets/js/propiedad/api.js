import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";


export default async function apiCall() {
const response = await getProperties(0, 1, 1);
const data = response.data;

console.log(data)

const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

  document.getElementById('container-propiedad').innerHTML = data.map(data => 
      `<div class="col-property-item">
        <div class="property-item">
          <div class="bg-success property-item-img">
            <a href="detalle_propiedad.html"
              ><img
                class="img-fluida"
                src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "assets/img/Sin.png" }"
                alt=""
            /></a>
          </div>
          <div class="card-body">
            <div class="principal-info">
              <small>VENTA</small>
              <a class="card-title" href="detalle_propiedad.html"
                >${data.title}</a
              >
              <p>
                <i class="bi bi-pin-map"></i> ${data.address  != undefined && data.address != "" && data.address != null ? data.address : "No registra Dirección"}, ${data.commune  != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra Comuna"}, ${data.city  != undefined && data.city != "" && data.city != null ? data.city : "No registra Ciudad"}, Chile
              </p>
            </div>
            <div class="secundary-info">
              <small>REF: ${data.id}</small>
              <div>
                <span>
                  <i class="fa-sharp fa-solid fa-bed"></i> ${data.bedroom != undefined && data.bedroom != "" && data.bedroom != null ? data.bedroom : "0"}
                </span>
                <span>
                  <i class="fa-sharp fa-solid fa-toilet"></i> ${data.bathrooms != undefined  && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}
                </span>
              </div>
            </div>
            <div class="more-info">
              <p> UF ${clpToUf(data.price, ufValueAsNumber)} - ${parseToCLPCurrency(data?.price)}</p>
            </div>
          </div>
        </div>
      </div>`
      ).join('');


}

