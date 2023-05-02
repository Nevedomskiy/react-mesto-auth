import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import { instApi } from '../utils/api.js';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import { CardsDataContext } from '../contexts/CardsDataContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([instApi.getDataProfile(), instApi.getDataCards()])
      .then(([userData, cardData]) => {
        setСurrentUser(userData);
        setCards(cardData)
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    instApi.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function handleUpdateUser(newDataUser) {
    instApi.patchDataProfile(newDataUser)
      .then((result) => {
        setСurrentUser(prev => {
          return {
            ...prev,
            name: result.name,
            about: result.about
          }

        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    instApi.patchAvatarProfile(newAvatar)
      .then((result) => {
        setСurrentUser(prev => {
          return {
            ...prev,
            avatar: result.avatar
          }

        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    instApi.postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    instApi.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item =>
          item !== card
        ))
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(prev => {
      return prev = true
    })
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(prev => {
      return prev = true
    })
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(prev => {
      return prev = true
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setCardPopupOpen(prev => {
      return prev = true
    });
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(prev => {
      return prev = false
    });
    setEditProfilePopupOpen(prev => {
      return prev = false
    });
    setEditAvatarPopupOpen(prev => {
      return prev = false
    });
    setSelectedCard({});
    setCardPopupOpen(prev => {
      return prev = false
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="bodywork">
        <div className="page">
          <Header />
          <CardsDataContext.Provider value={cards}>
            <Main onEditProfile={handleEditProfileClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
          </CardsDataContext.Provider>


          <Footer />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm buttonText={"Да"} name={'confirmation'} onClose={closeAllPopups} title={"Вы уверены?"}></PopupWithForm>

          <ImagePopup isOpen={isCardPopupOpen} card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;