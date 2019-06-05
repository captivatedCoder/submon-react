import http from "./httpService";

const apiEndpoint = `/subscriptions`;

export function getSubscriptions(token) {
  return http.get(apiEndpoint, {
    'headers': {
      'x-auth-token': token
    }
  });
}

export function getSubscription(subId) {
  const token = localStorage.getItem('token');
  return http.get(`${apiEndpoint}/${subId}`, {
    'headers': {
      'x-auth-token': token
    }
  });
}