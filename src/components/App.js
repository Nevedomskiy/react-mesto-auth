import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setCardPopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setCardPopupOpen(false);
  }

  return (
    <div className="bodywork">
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm name={'place'} title={"Новое место"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
          <>
            <input id="place-name" required type="text" minLength="2" maxLength="30" name="name" placeholder="Название"
              className="popup__input popup__input_type_name-place" ></input >
            <span id="place-name-error" className="popup__text-error"></span>
            <input id="place-url" required type="url" name="link" placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_link-place"></input>
            <span id="place-url-error" className="popup__text-error"></span>
            <button type="submit" className="popup__submit-btn popup__submit-btn_action_add-place">
              Создать
            </button>
          </>} />
        <PopupWithForm name={'profile'} title={"Редактировать профиль"} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
          <>
            <input id="profile-name" placeholder="Имя" required type="text" minLength="2" maxLength="40" name="name"
              className="popup__input popup__input_type_name-profile"></input>
            <span id="profile-name-error" className="popup__text-error"> </span>
            <input id="profile-profession" placeholder="Вид деятельности" required type="text" minLength="2"
              maxLength="200" name="about" className="popup__input popup__input_type_profession-profile"></input>
            <span id="profile-profession-error" className="popup__text-error"></span>
            <button type="submit" className="popup__submit-btn popup__submit-btn_action_add-profile">
              Сохранить
            </button>
          </>} />
        <PopupWithForm name={'avatar'} title={"Обновить аватар"} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} children={
          <>
            <input id="avatar-url" required type="url" name="avatar" placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_link-avatar"></input>
            <span id="avatar-url-error" className="popup__text-error"></span>
            <button type="submit" className="popup__submit-btn popup__submit-btn_action_edit-avatar">
              Сохранить
            </button>
          </>} />

        <PopupWithForm name={'confirmation'} onClose={closeAllPopups} title={"Вы уверены?"} children={
          <>
            <button type="submit" className="popup__submit-btn popup__submit-btn_remove-card">
              Да
            </button>
          </>} />

        <ImagePopup isOpen={isCardPopupOpen} card={selectedCard} onClose={closeAllPopups} />
      </div>


    </div >
  );
}

export default App;