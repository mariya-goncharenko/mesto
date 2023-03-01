// Объявление констант для POP-UP изменения профиля:
const popupEditProfile = document.querySelector(".popup_type_edit-profile");

// Объявление констант для полей ввода POP-UP изменения профиля:
const popupName = popupEditProfile.querySelector(".popup__input_type_name");
const popupJob = popupEditProfile.querySelector(".popup__input_type_job");

// Объявление констант для POP-UP добавления карточки:
const popupAddCard = document.querySelector(".popup_type_add-card");

// Объявление констант для POP-UP изменения аватара:
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

// Объявление констант для форм:
const formEditProfile = popupEditProfile.querySelector("#editForm");
const formCardNew = popupAddCard.querySelector("#addForm");
const formEditAvatar = popupEditAvatar.querySelector("#editAvatar");

// Объявление констант для кнопок:
const buttonEditProfile = document.querySelector(".profile__edit-profile");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__edit-avatar");

export { popupName, popupJob, formEditProfile, formCardNew, buttonEditProfile, buttonAddCard, buttonEditAvatar,formEditAvatar }