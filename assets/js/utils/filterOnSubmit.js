import { getPropertiesOnForm} from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf } from "./getExchangeRate.js";

const onFormSubmit = (
    statusId,
    companyId,
    operationType,
    typeOfProperty,
    region,
    commune,
    min_price,
    max_price,
    bathrooms,
    bedrooms,
    covered_parking_lots
  ) => {
    return getPropertiesOnForm(
      statusId,
      companyId,
      operationType,
      typeOfProperty,
      region,
      commune,
      min_price,
      max_price,
      bathrooms,
      bedrooms,
      covered_parking_lots 
    );
  };

  let query = {
    page:1,
    limit:10,
    realtorId: 0,
    statusId:1,
    companyId:1,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    covered_parking_lots: "",
  }

  let aux = new URLSearchParams(window.location.search);

  for (let p of aux) {
    query[`${p[0]}`] = p[1];
  }



  
document.getElementById('operationType').addEventListener('change',(element) =>{
    console.log(element.target.value)
    query.operationType = element.target.value;
    // const _operationType = operationType.length > 0 ? operationType : false;
    // return element.target.value;
    
 })
 document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
    // return element.target.value;
})
document.getElementById("region").addEventListener( "change", (element) => {
 query.region = element.target.value;  
 console.log(element.target.value)
      // return element.target.value;
})
document.getElementById("commune").addEventListener( "change", (element) => {
    query.commune =  element.target.value;
    console.log(element.target.value)
  
    // return element.target.value;

  })

 document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
     query.min_price = element.target.value;
})
  
 document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})
  
 document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
     query.bedrooms =  element.target.value;
     console.log(element.target.value)

  
  })
  
// document.getElementById("surface_m2").addEventListener( "change", (element) => {
//      query.surface_m2= element.target.value;
  
//   })

document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})


document.getElementById("buscar")?.addEventListener("click", async () => {
	window.open(
		window.location.origin +
			`/propiedad.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&surface_m2=${query.surface_m2}&bedrooms=${query.bedrooms}`
	);
});




 document.getElementById('buscar2')?.addEventListener('click', async() => {
  console.log('buscando');
  document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;
	// let  response  = await getProperties(0,1,1);
  // const data = response.data;
  let filtred = await onFormSubmit(
    1,
    1,
    query?.operationType,
    query?.typeOfProperty,
    query?.region,
    query?.commune,
    query?.min_price,
    query?.max_price,
    query?.bathrooms,
    query?.bedrooms,
    query?.covered_parking_lots
    )    

  
  const response2= await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor


  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  console.log(filtred);
	document.getElementById("total-prop").innerHTML = `<div>${filtred.meta.totalItems} Propiedades encontradas
	</div>`;
	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
   

  document.getElementById("container-prop-list").innerHTML = filtred.data.map((data) => 
        `<div class="col-lg-12" data-aos="fade-up" data-aos-delay="100">
        <div class="card-item">
          <div class="row">
            <div class="col-xl-5" style="height:330px">
              <a class="card-bg" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" >
                <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "assets/img/Sin.png"  }" alt="Image" class="img-fluid" style="height:100% !important;width:100%;">  
              </a>
            </div>
            <div class="col-xl-7 d-flex align-items-center" style="padding: 2px;">
              <div class="post-content text-center">
                <h3 class="post-title mb-4">${data.title}</h3>
                <div class="meta d-flex align-items-center">
                <div class="d-flex align-items-center">
                    <span class="ps-2">COD: ${data.id}</span>
                  </div>
                </div>
                <div class="meta d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="ps-2"> 
                      <i class='bx bx-map fs-4'style="color: rgb(92, 92, 92);"></i>
                      ${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</span>
                  </div>
                </div>
                <div class="meta d-flex align-items-center mt-5 mb-5">
                  <div class="d-flex align-items-center">
                    <span class="ps-2 precio-card-list"><b>UF ${clpToUf(data.price, ufValueAsNumber)}</b></span>
                  </div>
                  <span class="px-3 text-black-50">/</span>
                  <div class="d-flex align-items-center">
                    <span class="ps-2 precio-card-list"><b>CLP ${parseToCLPCurrency(data?.price)}</b></span>
                  </div>
                </div> 
                <span class="post-date">${data.operation}</span>
                <hr>                
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" class="readmore stretched-link"><span>Ver detalle</span><i class="bi bi-arrow-right"></i></a>             
              </div>
            </div>
          </div>
        </div>
    </div>`).join("");


	}, 3000);

  

    
   
  })
