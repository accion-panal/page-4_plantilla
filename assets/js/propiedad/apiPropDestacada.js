import { getProperties } from "../services/PropertiesServices.js"


export default async function apiDestCall() {
    let {data} = await getProperties();
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );
  
          document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<div class="col-property-item">
            <div class="property-item">
              <div class="bg-success property-item-img">
                <a href="detalle_propiedad.html"
                  ><img
                    class="img-fluid"
                    src="${filtrado.image != undefined && filtrado.image != "" && filtrado.image != null ? filtrado.image : "assets/img/Sin.png" }"
                    alt=""
                /></a>
              </div>
  
              <div class="card-body">
                <div class="principal-info">
                  <small>${filtrado.operation}</small>
                  <a class="card-title" href="detalle_propiedad.html"
                    >Casa amoblada excelente ubicación</a
                  >
                  <p>
                    <i class="bi bi-pin-map"></i> Lo Barnechea, LO BARNECHEA
                  </p>
                </div>
                <div class="secundary-info">
                  <small>REF: 232312</small>
                  <div>
                    <span> <i class="fa-sharp fa-solid fa-bed"></i> 3 </span>
                    <span> <i class="fa-sharp fa-solid fa-toilet"></i> 3 </span>
                  </div>
                </div>
                <div class="more-info">
                  <p>UF: 16.800 / CLP 56.500.000</p>
                </div>
              </div>
            </div>
          </div>`
          ).join('');
}