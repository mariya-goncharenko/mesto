// Импорты
import './index.css';
import Api from '../components/Api';
import { Card } from '../components/Card.js';
//import { initialCards } from '../utils/initialCards.js';
import { validationConfig } from '../utils/validationConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import {popupName,
        popupJob,
        formEditProfile,
        formCardNew,
        buttonEditProfile,
        buttonAddCard,
        buttonEditAvatar,
        formEditAvatar} from '../utils/constants.js'

// API:

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'dcf4edee-ca14-49b3-93d1-3710d22ba9f3',
    'Content-Type': 'application/json'
  }
});

export {api}

// Валидация форм
const enableValidationEdit = new FormValidator(formEditProfile, validationConfig);
enableValidationEdit.enableValidation(formEditProfile)

const enableValidationAddCard = new FormValidator(formCardNew, validationConfig);
enableValidationAddCard.enableValidation(formCardNew)

const enableValidationEditAvatar= new FormValidator(formEditAvatar, validationConfig);
enableValidationEditAvatar.enableValidation(formEditAvatar)

//Новая секция:
let contentCards 

//Открытие большой картинки: 
const openBigImage = new PopupWithImage(".popup_type_img");
openBigImage.setEventListeners()

//Информация о пользователе:
const userInfo = new UserInfo({
  name: '.profile__name',
  info: '.profile__job',
  avatar: '.profile__avatar'
});

// Информация о пользователе:
api.getUserInfo().then((userInfoApi) => {
  console.log(userInfoApi)
  userInfo.setUserInfo(userInfoApi.name, userInfoApi.about, userInfoApi._id, userInfoApi.avatar)
  userInfo.setUserAvatar(userInfoApi.avatar)
})
.catch((err) => {
  console.log(err)});

// Информация о карточках:
api.getInitialCards().then((сardsApi) => {
  console.log(сardsApi)
  contentCards = new Section ({ items:сardsApi.reverse() , renderer: createCard }, ".elements" );
  contentCards.renderItems()
})
.catch((err) => {
  console.log(err)});

//Форма удаления карточки: 
const popupDeleteCard = new PopupWithConfirmation(".popup_type_delete");
popupDeleteCard.setEventListeners()
export {popupDeleteCard}

//Форма Edit: 
const popupEditForm = new PopupWIthForm(".popup_type_edit-profile", submitProfileForm);
popupEditForm.setEventListeners()

buttonEditProfile.addEventListener("click", () => {
  const {info, user} = userInfo.getUserInfo()
  popupName.value = user
  popupJob.value = info
  enableValidationEdit.resetValidation()
  popupEditForm.open()
})

function submitProfileForm(inputValues) {
  api.setEditUserInfo(inputValues)
  const {_id, avatar} =  userInfo.getUserInfo()
  userInfo.setUserInfo(inputValues.nameInput , inputValues.jobInput, _id, avatar)
  popupEditForm.close()
}

//Форма Avatar: 

const popupEditAvatarForm = new PopupWIthForm(".popup_type_edit-avatar", submitAvatarForm);
popupEditAvatarForm.setEventListeners()

buttonEditAvatar.addEventListener("click", () => {
  enableValidationEditAvatar.resetValidation()
  popupEditAvatarForm.open()
})

function submitAvatarForm(inputValues) {
  api.setEditAvatar(inputValues)
  userInfo.setUserAvatar(inputValues.AvatarInput)
  popupEditAvatarForm.close()
}

//Форма Add: 
const popupAddForm = new PopupWIthForm ( ".popup_type_add-card", submitCardForm );
popupAddForm.setEventListeners()

function submitCardForm(inputValues) {
  const name = inputValues.imgInput
  const link = inputValues.linkInput

  api.setNewCard({ name, link }).then((cardData) => {
    const newCard = createCard(cardData)
    contentCards.addItem(newCard)
  })
  .catch((err) => {
    console.log(err)});
  popupAddForm.close()
}

buttonAddCard.addEventListener("click", () => {
  enableValidationAddCard.resetValidation()
  popupAddForm.open()
})

// Отрисовка карточек:

function createCard(value) {
  const card = new Card(value, userInfo.getUserInfo(), ".element-template", handleCardClick).generateCard();
  return card
}

// Открытие большой картинки:
function handleCardClick (name,link) {
  openBigImage.open(name, link)
}