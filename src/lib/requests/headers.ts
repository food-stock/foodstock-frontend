import Cookies from "js-cookie";

let access_token = Cookies.get('access_token');

let headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export default headers;