import { getProperties } from "../services/PropertiesServices.js"


export default async function apiDestCall() {
    let {data} = await getProperties(0,1,1);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );
  
          document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<div class="col-property-item">
            <div class="property-item">
              <div class="bg-success property-item-img">
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                  ><img
                    class="img-fluid"
                    src="${filtrado.image != undefined && filtrado.image != "" && filtrado.image != null ? filtrado.image : "assets/img/Sin.png" }"
                    alt=""
                /></a>
              </div>
  
              <div class="card-body">
                <div class="principal-info">
                  <small>${filtrado.operation}</small>
                  <a class="card-title" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                    >${filtrado.title}</a
                  >
                  <p>
                    <i class="bi bi-pin-map"></i>${filtrado.address != null && filtrado.address != undefined && filtrado.address != "" ? filtrado.address : "No registra dirección"},${filtrado.commune != null & filtrado.commune != undefined && filtrado.commune != "" ? filtrado.commune : "No registra comuna"}
                  </p>
                </div>
                <div class="secundary-info">
                  <small>${filtrado.id}</small>
                  <div>
                    <span> <i class="fa-sharp fa-solid fa-bed"></i> ${filtrado.bedroom != undefined && filtrado.bedroom != "" && filtrado.bedroom != null ? filtrado.bedroom : "0"} </span>
                    <span> <i class="fa-sharp fa-solid fa-toilet"></i> ${filtrado.bathrooms != undefined  && filtrado.bathrooms != "" && filtrado.bathrooms != "null" && filtrado.bathrooms != null ? filtrado.bathrooms : "0"} </span>
                  </div>
                </div>
                <div class="more-info">
                  <p>UF ${clpToUf(filtrado.price, ufValueAsNumber)} - ${parseToCLPCurrency(filtrado?.price)}</p>
                </div>
              </div>
            </div>
          </div>`
          ).join('');
}