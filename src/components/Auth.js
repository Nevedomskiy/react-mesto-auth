export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "password": password,
         "email": email
      })
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         }
         return Promise.reject(`Что-то пошло не так: ${response.status}`);
      })
      .then((res) => {
         return res;
      })
};

export const authorize = (email, password) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "password": password,
         "email": email
      })
   })
      .then((response => response.json()))
      .then((data) => {
         if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
         }
      })
};

export const getContent = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      }
   })
      .then(res => res.json())
      .then(data => data)
} 