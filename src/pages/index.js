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
        formEditAvatar} from '../utils/constants.js';

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
const formProfileValidator = new FormValidator(formEditProfile, validationConfig);
formProfileValidator.enableValidation()

const formAddCardValidator = new FormValidator(formCardNew, validationConfig);
formAddCardValidator.enableValidation()

const formAvatarValidator= new FormValidator(formEditAvatar, validationConfig);
formAvatarValidator.enableValidation()

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
  formProfileValidator.resetValidation()
  popupEditForm.open()
})

function submitProfileForm(inputValues) {
  const {_id, avatar} =  userInfo.getUserInfo()
  popupEditForm.renameButtonSave()
  api.setEditUserInfo(inputValues).then(() => {
    userInfo.setUserInfo(inputValues.nameInput , inputValues.jobInput, _id, avatar)
  })

  .catch((err) => {
    console.log(err)})
  
  .finally(() => {
    popupEditForm.close();
  });
}

//Форма Avatar: 

const popupEditAvatarForm = new PopupWIthForm(".popup_type_edit-avatar", submitAvatarForm);
popupEditAvatarForm.setEventListeners()

buttonEditAvatar.addEventListener("click", () => {
  formAvatarValidator.resetValidation()
  popupEditAvatarForm.open()
})

function submitAvatarForm(inputValues) {
  popupEditAvatarForm.renameButtonSave()
  api.setEditAvatar(inputValues).then(() => {
    userInfo.setUserAvatar(inputValues.AvatarInput)
  })
  .catch((err) => {
    console.log(err)})

  .finally(() => {
    popupEditAvatarForm.close();
  });
}

//Форма Add: 
const popupAddForm = new PopupWIthForm ( ".popup_type_add-card", submitCardForm );
popupAddForm.setEventListeners()

function submitCardForm(inputValues) {
  const name = inputValues.imgInput
  const link = inputValues.linkInput
  popupAddForm.renameButtonSave()
  api.setNewCard({ name, link }).then((cardData) => {
    const newCard = createCard(cardData)
    contentCards.addItem(newCard)
  })
  
  .catch((err) => {
    console.log(err)})

  .finally(() => {
    popupAddForm.close();
  });
}

buttonAddCard.addEventListener("click", () => {
  formAddCardValidator.resetValidation()
  popupAddForm.open()
})

// Отрисовка карточек:

function createCard(value) {
  const card = new Card(value, userInfo.getUserInfo(), ".element-template", handleCardClick, deleteCard, likeCard, dislikeCard).generateCard();
  return card
}

// Удаление карточки:
function deleteCard(card, _id){
      popupDeleteCard.open(() => {
        api.deleeteCardMetod(_id).then(() => {
          //console.log(cardData)
          card.deleteCardElement()
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err)});
      })
    }

//Лайк карточки:

function likeCard(card,_id){
   api.addLike(_id).then((cardData) => {
        //console.log(cardData)
        card.likeElement(cardData)
      })
      .catch((err) => {
        console.log(err)});
}

//Дизлайк карточки:
function dislikeCard(card,_id){
  api.deleeteLike(_id).then((cardData) => {
       //console.log(cardData)
       card.dislikeElement(cardData)
     })
     .catch((err) => {
       console.log(err)});
}


// Открытие большой картинки:
function handleCardClick (name,link) {
  openBigImage.open(name, link)
}