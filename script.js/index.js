const profileName = document.querySelector(".profile__name");

const profileJob = document.querySelector(".profile__job");

const buttoneEditProfile = document.querySelector(".profile__edit-profile");

const buttoneClosePopup = document.querySelector(".popup__close");

const popupName = document.querySelector(".popup__input_type_name");

const popupJob = document.querySelector(".popup__input_type_job");

const popup = document.querySelector(".popup");

const popupSave = document.querySelector(".popup__form");

const formElement = document.querySelector(".popup__form");

function openPopup() { 
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
};

function closePopup() {
     popup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup()
};

formElement.addEventListener('submit', handleFormSubmit);
    

buttoneEditProfile.addEventListener('click', openPopup);
buttoneClosePopup.addEventListener('click', closePopup);



