import { getProperties } from "../services/PropertiesServices.js"
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";
import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

import { PropertyData } from "../Data/userId.js";

export default async function apiDestCall() {
	const {CodigoUsuarioMaestro,companyId,realtorId} = PropertyData;

    let {data} = await getProperties(1,10,CodigoUsuarioMaestro,1,companyId, realtorId);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );

    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
      

    data = data.map(item => {
      // Reemplazar "\\" por "//" en la propiedad "image"
      item.image = item.image.replace(/\\/g, "//");
      return item;
    });
    if(filtrado.length != 0){
    document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
        `<li class="splide__slide" style="padding:1rem;">
          <div class="col-property-item" >
            <div class="property-item">
              <div class="bg-success property-item-img"  style="height:272px">
                <a href="/detalle_propiedad.html?$${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">
									${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid imgPropsCard">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid imgPropsCard">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid imgPropsCard">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid imgPropsCard">`}              
                </a>
              </div>
  
              <div class="card-body">
                <div class="principal-info">
                  <small>${data.operation}</small>
                  <a class="card-title" href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}"
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
                    <span> <i class="fa-sharp fa-solid fa-toilet"></i> ${data.bathrooms != undefined  && data.bathrooms != "" && data.bathrooms != "" && data.bathrooms != null ? data.bathrooms : "0"} </span>
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
            perPage : 3,
            autoplay: 'play',
            // autoWidth: true,
            drag:true,
            breakpoints: {
              1399: {
                perPage: 2,
              },
              991: {
                perPage: 1,
              }
            }
            
        });
        splide.mount();
  }else{
		document.getElementById('container-prop-destacada').innerHTML = `
    	<li class="splide__slide" style="width:100% !important;">
			  <p class="message-no-resgiter">No registra propiedades destacadas</p>
		  </li>`;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});

apiDestCall()