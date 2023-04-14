import { useEffect, useState } from 'react';
import { instApi } from '../utils/api.js';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

   const [userName, setUserName] = useState("");
   const [userDescription, setUserDescription] = useState("");
   const [userAvatar, setUserAvatar] = useState("");
   const [cards, setCards] = useState([]);

   useEffect(() => {

      instApi.getDataProfile()
         .then((result) => {
            setUserName(result.name);
            setUserDescription(result.about);
            setUserAvatar(result.avatar);
         })
         .catch((err) => {
            console.log(err);
         });

      instApi.getDataCards()
         .then((result) => {
            setCards(result)
         })
         .catch((err) => {
            console.log(err);
         });

   }, []);

   return (
      <main className="content">
         <section className="profile">
            <div className="profile__info">
               <div className="profile__conteiner-avatar">
                  <img alt="Аватарка" className="profile__avatar" src={userAvatar}></img>
                  <button type="button" onClick={onEditAvatar} className="profile__avatar-edit"></button>
               </div>
               <div className="profile__content">
                  <div className="profile__text">
                     <div className="profile__block-name">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" aria-label="Редактировать" onClick={onEditProfile} className="profile__button-edit"></button>
                     </div>
                     <p className="profile__subname">{userDescription}</p>
                  </div>
               </div>
            </div>
            <button type="button" aria-label="Добавить" onClick={onAddPlace} className="profile__button-add"></button>
         </section>

         <div className="photo">
            <ul className="photo__container">
               {cards.map((element) => {
                  return (
                     <Card key={element._id} card={element} onCardClick={onCardClick} />
                  );
               })}
            </ul>
         </div>
      </main>
   );
}

export default Main;