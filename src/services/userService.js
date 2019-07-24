import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/users";
const token = localStorage.getItem('token');

export async function createUser(name, email, password){
  const isAdmin = false; //I'm the only admin
  const body = {name, email, password, isAdmin};
  
  const res = await http.post(apiEndpoint, body, {
    headers: {
      'x-auth-token': token
    }
  })
  console.log(res);
}