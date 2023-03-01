export default class Api {
  constructor(options) {
    this._options = options
  }
  //Метод для информации о пользователе:
  getUserInfo() {
    return fetch( this._options.baseUrl + "/users/me", {
     headers: this._options.headers
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//Метод для подключения к массиву карточек:
  getInitialCards() {
    return fetch( this._options.baseUrl + "/cards", {
      headers: this._options.headers
   })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

// Метод для сохранения данных о пользователе:
  setEditUserInfo(data) {
  return fetch(this._options.baseUrl + "/users/me", {
  method: 'PATCH',
  headers: this._options.headers,
  body: JSON.stringify({
    name: data.nameInput,
    about: data.jobInput
  })
  
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
  }

  // Метод для добавления новой карточки на сервер:
  setNewCard(data) {
    return fetch(this._options.baseUrl + "/cards", {
    method: 'POST',
    headers: this._options.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
    
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Метод для постановки лайков:
  addLike(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId + "/likes", {
    method: 'PUT',
    headers: this._options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Метод для снятия лайков:
  deleeteLike(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId + "/likes", {
    method: 'DELETE',
    headers: this._options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Метод для удаления карточки:
  deleeteCardMetod(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId , {
    method: 'DELETE',
    headers: this._options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Метод для изменения аватара:
  setEditAvatar(data) {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
    method: 'PATCH',
    headers: this._options.headers,
    body: JSON.stringify({
      avatar: data.AvatarInput
    })
    
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
    }
  
}
