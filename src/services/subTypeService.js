import http from "./httpService";

const apiEndpoint = `/subtypes`;
const token = localStorage.getItem('token');
const header = {
  'x-auth-token': token
}

export function getSubTypes(){
  return http.get(apiEndpoint, {'headers': header});
}