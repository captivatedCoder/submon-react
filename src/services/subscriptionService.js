import http from "./httpService";

const apiEndpoint = `/subscriptions`;
const token = localStorage.getItem('token');

function subscriptionUrl(id) {
  if (!id) return apiEndpoint;

  return `${apiEndpoint}/${id}`;
}

export function getSubscriptions() {
  return http.get(apiEndpoint, {
    headers: {
      'x-auth-token': token
    }
  });
}

export function getSubscription(subId) {
  return http.get(subscriptionUrl(subId), {
    headers: {
      'x-auth-token': token
    }
  });
}

export function saveSubscription(subscription) {
  console.log(subscription);
  if (subscription._id) {
    const body = {
      ...subscription
    };
    delete body._id;

    return http.put(subscriptionUrl(subscription._id), body, {
      headers: {
        'x-auth-token': token
      }
    });
  }

  return http.post(subscriptionUrl(subscription._id), subscription, {
    headers: {
      'x-auth-token': token
    }
  });
}

export function deleteSubscription(subscriptionId) {
  return http.delete(subscriptionUrl(subscriptionId), {
    headers: {
      'x-auth-token': token
    }
  });
}