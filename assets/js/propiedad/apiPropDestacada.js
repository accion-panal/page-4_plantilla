import { getProperties } from "../services/PropertiesServices.js"
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

export default async function apiDestCall() {
    let {data} = await getProperties(1,10,0,1,1);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );

    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
      
          document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<li class="splide__slide">
          <div class="col-property-item">
            <div class="property-item">
              <div class="bg-success property-item-img"  style="height:272px">
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                  ><img
                    class="img-fluid imgPropsCard"
                    src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "assets/img/Sin.png" }"
                    alt=""
                   
                /></a>
              </div>
  
              <div class="card-body">
                <div class="principal-info">
                  <small>${data.operation}</small>
                  <a class="card-title" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                    >${data.title}</a
                  >
                  <p>
                    <i class="bi bi-pin-map"></i>${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra dirección"},${data.commune != null & data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}
                  </p>
                </div>
                <div class="secundary-info">
                  <small>REF: ${data.id}</small>
                  <div>
                    <span> <i class="fa-sharp fa-solid fa-bed"></i> ${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"} </span>
                    <span> <i class="fa-sharp fa-solid fa-toilet"></i> ${data.bathrooms != undefined  && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"} </span>
                  </div>
                </div>
                <div class="more-info">
                  <p>UF ${clpToUf(data.price, ufValueAsNumber)} - ${parseToCLPCurrency(data?.price)}</p>
                </div>
              </div>
            </div>
          </div>
          </li>`
          ).join('');

          let splide = new Splide(".splide", {
            type    : 'loop',
            perPage : 3,
            autoplay: 'play',
            // autoWidth: true,
            drag:true,
            
        });
        splide.mount();
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});

apiDestCall()