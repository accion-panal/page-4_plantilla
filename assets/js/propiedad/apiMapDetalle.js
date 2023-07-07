import { getPropertiesForId } from "../services/PropertiesServices.js";


export default async function apiCallMapDetail(id,realtorId, statusId, companyId){

let {data} = await getPropertiesForId(id,realtorId, statusId, companyId );


const LngLat = data.LngLat.replace("{", "")
		.replace("}", "")
		.replace(",", "")
		.replace("Lat", "")
		.replace("Lng:", "")
		.replace(" ", "")
		.split(":");

console.log(id)

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
const map = new mapboxgl.Map({
    
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [parseFloat(LngLat[0]), parseFloat(LngLat[1])],
    zoom: 15,
    
});

	const UbiProp = [parseFloat(LngLat[0]), parseFloat(LngLat[1])];

            // create the popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(`
            ${data.title}`)
            
            // create DOM element for the marker
            const ubicacion = document.createElement('div');
            ubicacion.id = 'marker';
            // el.style.backgroundImage = `${data.img != null && data.img != '' && data.img != undefined ? data.img : "images/Sin.png"}`;
            // el.style.width = `${50}px`;
            // el.style.height = `${50}px`;
            // el.style.backgroundSize = "100%";
        
            new mapboxgl.Marker({
                color: '#000',
                scale: .8
            })
                .setLngLat(UbiProp)
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);


            }