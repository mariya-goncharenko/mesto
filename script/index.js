// Объявление констант для POP-UP изменения профиля:
const popupEditProfile = document.querySelector(".popup_type_edit-profile");

// Объявление констант для полей ввода POP-UP изменения профиля:
const popupName = popupEditProfile.querySelector(".popup__input_type_name");
const popupJob = popupEditProfile.querySelector(".popup__input_type_job");

// Объявление констант для POP-UP добавления карточки:
const popupAddCard = document.querySelector(".popup_type_add-card");

// Объявление констант для полей ввода POP-UP добавления карточки:
const popupCardImg = popupAddCard.querySelector(".popup__input_type_img");
const popupCardLink = popupAddCard.querySelector(".popup__input_type_link");

// Объявление констант для POP-UP с картинкой:
const popupImg = document.querySelector(".popup_type_img");

// Объявление констант для форм:
const formEditProfile = popupEditProfile.querySelector("#editForm");
const formCardNew = popupAddCard.querySelector("#addForm");

// Объявление констант для кнопок:
const buttonEditProfile = document.querySelector(".profile__edit-profile");
const buttonAddCard = document.querySelector(".profile__add-button");

// Объявление констант для кнопок закрытия:
const buttonCloseEdit = popupEditProfile.querySelector(".popup__close");
const buttonCloseAdd = popupAddCard.querySelector(".popup__close");
const buttonCloseImg = popupImg.querySelector(".popup__close");

// Объявление констант для информации со страницы:
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Объявление констант для блока с карточками и POP-UP с картинкой:
const cardsSection = document.querySelector(".elements")
const template = document.querySelector("#element-template").content
const cardElement = template.querySelector(".element")

const popupImageOpen = popupImg.querySelector(".popup__img-container")
const popupImageImg = popupImg.querySelector(".popup__img")
const popupImageTitle = popupImg.querySelector(".popup__img-title")

//Функция для открытия POP-UP:
function openPopup(popup) {
    popup.classList.add("popup_opened")
  }
  
//Функция для закрытия POP-UP:
  function closePopup(popup) {
    popup.classList.remove("popup_opened")
  }

//Функции для POP-UP изменения профиля:  
  buttonEditProfile.addEventListener("click", () => {
    popupName.value = profileName.textContent
    popupJob.value = profileJob.textContent
    openPopup(popupEditProfile)
  })
  
  buttonCloseEdit.addEventListener("click", () => {
    closePopup(popupEditProfile)
  })

  function submitProfileForm(evt) {
    evt.preventDefault()
    profileName.textContent = popupName.value
    profileJob.textContent = popupJob.value
    closePopup(popupEditProfile)
  }

  formEditProfile.addEventListener('submit', submitProfileForm);

//Функции для POP-UP добавления карточек:

  buttonAddCard.addEventListener("click", () => {
    openPopup(popupAddCard)
  })
  
  buttonCloseAdd.addEventListener("click", () => {
    closePopup(popupAddCard)
  })

  function createCard(value) {
    const card = cardElement.cloneNode(true)
    const title = card.querySelector(".element__title") 
    const image = card.querySelector(".element__img") 
    const deleteCard = card.querySelector(".element__delete-card") 
    const like = card.querySelector(".element__like-photo")

    title.textContent = value.name
    image.src = value.link
    image.alt = value.name

    image.addEventListener("click", () => {
      openBigImage(value)
    })

    deleteCard.addEventListener("click", () => {
      card.remove()
    })

    like.addEventListener("click", () => {
      like.classList.toggle("element__like-photo_active");
    })
        
    return card
    }
  
  function renderCard(card, container) {
    container.prepend(card)
  }
  
  function render() {
    initialCards.reverse().forEach((value) => {
      const newCard = createCard(value)
      renderCard(newCard, cardsSection)
    })
  }
  
  render()
  
  function submitCardForm(evt) {
    evt.preventDefault()
    const name = popupCardImg.value
    const link = popupCardLink.value
    const newCard = createCard({ name, link })
    renderCard(newCard, cardsSection)
    closePopup(popupAddCard)
    formCardNew.reset()
  }
  
  formCardNew.addEventListener("submit", submitCardForm)
  
//Функции для POP-UP картинки:  
  buttonCloseImg.addEventListener("click", () => {
    closePopup(popupImg)
  })

  function openBigImage({name, link}) {
    popupImageImg.src = link
    popupImageImg.alt = name
    popupImageTitle.textContent = name
    openPopup(popupImg)
  }
