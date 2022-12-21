//Массив с карточками:
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ]

// Объявление констант для POP-UP изменения профиля:
const popupEditProfile = document.querySelector(".popup_type_edit-profile");

// Объявление констант для полей ввода POP-UP изменения профиля:
const popupName = document.querySelector(".popup__input_type_name");
const popupJob = document.querySelector(".popup__input_type_job");

// Объявление констант для POP-UP добавления карточки:
const popupAddCard = document.querySelector(".popup_type_add-card");

// Объявление констант для полей ввода POP-UP добавления карточки:
const popupCardImg = document.querySelector(".popup__input_type_img");
const popupCardLink = document.querySelector(".popup__input_type_link");

// Объявление констант для POP-UP с картинкой:
const popupImg = document.querySelector(".popup_type_img");

// Объявление констант для форм:
const popupSave = document.querySelector(".popup__form");
const formElement = document.querySelector(".popup__form");
const formProfileNew = document.querySelector("#addForm");

// Объявление констант для кнопок:
const buttoneEditProfile = document.querySelector(".profile__edit-profile");
const buttoneAddCard = document.querySelector(".profile__add-button");

// Объявление констант для кнопок закрытия:
const buttoneCloseEdit = document.querySelector(".popup__close");
const buttoneCloseAdd = popupAddCard.querySelector(".popup__close");
const buttoneCloseImg = popupImg.querySelector(".popup__close");

// Объявление констант для информации со страницы:
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Объявление констант для блока с карточками и POP-UP с картинкой:
const cardsSection = document.querySelector(".elements")
const template = document.querySelector("#element-template").content

const popupImageOpen = document.querySelector(".popup__img-container")
const popupImageClose = document.querySelector(".popup__close")
const popupImageImg = document.querySelector(".popup__img")
const popupImageTitle = document.querySelector(".popup__img-title")



//Функция для открытия POP-UP:
function openPopup(popup) {
    popup.classList.add("popup_opened")
  }
  
//Функция для закрытия POP-UP:
  function closePopup(popup) {
    popup.classList.remove("popup_opened")
  }

//Функции для POP-UP изменения профиля:  
  buttoneEditProfile.addEventListener("click", () => {
    popupName.value = profileName.textContent
    popupJob.value = profileJob.textContent
    openPopup(popupEditProfile)
  })
  
  buttoneCloseEdit.addEventListener("click", () => {
    closePopup(popupEditProfile)
  })

  function submitProfileForm(evt) {
    evt.preventDefault()
    profileName.textContent = popupName.value
    profileJob.textContent = popupJob.value
    closePopup(popupEditProfile)
  }

  formElement.addEventListener('submit', submitProfileForm);

//Функции для POP-UP добавления карточек:
  buttoneAddCard.addEventListener("click", () => {
    openPopup(popupAddCard)
  })
  
  buttoneCloseAdd.addEventListener("click", () => {
    closePopup(popupAddCard)
  })

  function createCard(value) {
    const card = template.querySelector(".element").cloneNode(true)
    if (card) {
      const title = card.querySelector(".element__title")
      const image = card.querySelector(".element__img")
      const deleteCard = card.querySelector(".element__delete-card")
      const like = card.querySelector(".element__like-photo")
      
      if (title && image && deleteCard && like) {
        title.textContent = value.name
        image.src = value.link

        image.addEventListener("click", () => {
          imageOpen(card, value.link)
        })

        deleteCard.addEventListener("click", () => {
          card.remove()
        })
  
        like.addEventListener("click", () => {
            const likeAct = "element__like-photo_active"
            if (like)
              if (like.classList.contains(likeAct)) {
                like.classList.remove(likeAct)
              } else {
                like.classList.add(likeAct)
              }
          })
        }
      }
      return card
    }
  
  function renderCard(card, container) {
    container.prepend(card)
  }
  
  function render() {
    initialCards.reverse().forEach((value) => {
      const newCard = createCard(value)
      if (newCard) renderCard(newCard, cardsSection)
    })
  }
  
  render()
  
  function submitCardForm(evt) {
    evt.preventDefault()
    const name = popupCardImg.value
    const link = popupCardLink.value
    const newCard = createCard({ name, link })
    if (newCard) renderCard(newCard, cardsSection)
    closePopup(popupAddCard)
    formProfileNew.reset()
  }
  
  formProfileNew.addEventListener("submit", submitCardForm)
  
  
//Функции для POP-UP картинки:  
  buttoneCloseImg.addEventListener("click", () => {
    closePopup(popupImg)
  })

  function imageOpen(card, link) {
    const cardTitle = card.querySelector(".element__title").textContent
    popupImageImg.src = link
    popupImageImg.alt = cardTitle
    popupImageTitle.textContent = cardTitle
    openPopup(popupImg)
  }




    

//buttoneEditProfile.addEventListener('click', openPopup);
//buttoneCloseEdit.addEventListener('click', closePopup);





