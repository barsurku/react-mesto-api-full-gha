 const apiConfig = {
  url: 'http://localhost:3000',
  // headers: {
  //   authorization: '32119456-426d-4754-a261-d86b8af5b953',
  //   "content-type": "application/json"
//   }
};

class Api {
  #url;
  constructor(apiConfig) {
    this.#url = apiConfig.url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/users/me`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => this._getResponse(res))
  }

  editProfile(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({name: data.name, about: data.about})
    })
    .then((res) => this._getResponse(res))
  }

  changeProfileAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data
      })
    })
    .then((res) => this._getResponse(res))
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => this._getResponse(res))
  }

  addNewCard(cardData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({name: cardData.name, link: cardData.link})
    })
    .then((res) => this._getResponse(res))
  }

  deleteMyCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => this._getResponse(res))
  }

  setCardLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => this._getResponse(res))
  }

  removeCardLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => this._getResponse(res))
  }
}

export const api = new Api(apiConfig);