import apiCall from "./propiedad/api.js";
import paginationCall from "./utils/pagination.js"


apiCall();

localStorage.removeItem('countPage');
paginationCall();

// getProperties = () => {
//     axios({
//         method :" get",
//         url : "/properties"
//     }).then((res) => console.log(res));
// }