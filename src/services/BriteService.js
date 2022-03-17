import axios from 'axios'

// var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // targetUrl =  "https://www.eventbriteapi.com/v3"
    // getEventUrl = "https://www.eventbriteapi.com/v3/me/?token=MYTOKEN"
// let client_id = 'api-key';
let client_secret = 'FYE26YJH3ZU4ULOYNERD';
// let code = 'access_code';
// let redirect_uri = 'redirect_uri'


const config = {
    method: 'post',
    url: null,
    data: null,
    headers: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + client_secret
    }
};

// const getConfig = {
//     method: 'get',
//     url: null,
//     data: null,
//     headers: {
//         "content-type": "application/json",
//         "Authorization": 'Bearer ' + client_secret
//     }
// };


export const getEvents = async ( organization_id ) => {
    config.method = 'get';
    config.url = "https://www.eventbriteapi.com/v3/organizations/" + organization_id + "/events/"
    // config.data = {

    // };
    return await axios(config);
}


export const getOrganizations = async ( personal_token ) => {
    config.method = 'get';
    config.url =  'https://www.eventbriteapi.com/v3/users/me/organizations/'
    config.headers = {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + personal_token
    }
    return await axios(config);
}

// export const buyDomain = async (domain) => {
//     config.method = 'POST';
//     config.url = proxyUrl + "https://api.dev.name.com/v4/domains"
//     config.data = {
//         "domain":{
//             "domainName":domain.domainName
//         },
//         "purchasePrice":domain.purchasePrice
//     };
//     return await axios(config);
// }