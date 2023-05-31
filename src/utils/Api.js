class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
          headers: this.headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
          });
      }
  
    editProfile(formValues) {
        return fetch(`${this.baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
            name: formValues.name,
            about: formValues.about})
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
          });
      }

    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    editAvatar({ avatar }) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    postCard({ name, link }) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
          })
      })
        .then(res => {
          // saveButton.textContent = 'Создание...';
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    
    setLike(_id) {
      return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLike(_id) {
      return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(_id) {
      return fetch(`${this.baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: 'f6782ace-7e7f-4677-87dd-7e360f6606a1',
      'Content-Type': 'application/json'
    }
  });