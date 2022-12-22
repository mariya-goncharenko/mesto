//Массив с карточками:
const initialCards = [
    {
      name: "Хайфа",
      link: "https://images.unsplash.com/photo-1558447710-bc1bbd144ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Мёртвое море",
      link: "https://images.unsplash.com/photo-1478028336919-e8e8dcee1975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Яффо",
      link: "https://images.unsplash.com/photo-1521450530321-12c602b95c67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Тель-Авив",
      link: "https://images.unsplash.com/photo-1544971621-cf3d7cfff894?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
      name: "Иерусалим",
      link: "https://images.unsplash.com/photo-1574513828599-a4fefc82fe7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Рош Ха-Никра",
      link: "https://images.unsplash.com/photo-1506183915311-3c4749d0ac8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
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
const formCardNew = document.querySelector("#addForm");

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
    formCardNew.reset()
  }
  
  formCardNew.addEventListener("submit", submitCardForm)
  
  
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





