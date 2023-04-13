import React from 'react';
import { instApi } from '../utils/api.js';
import Card from './Card.js';

function Main(props) {

   const [userName, setUserName] = React.useState("");
   const [userDescription, setUserDescription] = React.useState("");
   const [userAvatar, setUserAvatar] = React.useState("");
   const [cards, setCards] = React.useState([]);

   React.useEffect(() => {

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


   }, [setUserName, setCards]);




   return (
      <main className="content">
         <section className="profile">
            <div className="profile__info">
               <div className="profile__conteiner-avatar">
                  <img alt="Аватарка" className="profile__avatar" src={userAvatar}></img>
                  <button type="button" onClick={props.onEditAvatar} className="profile__avatar-edit"></button>
               </div>

               <div className="profile__content">
                  <div className="profile__text">
                     <div className="profile__block-name">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" aria-label="Редактировать" onClick={props.onEditProfile} className="profile__button-edit"></button>
                     </div>
                     <p className="profile__subname">{userDescription}</p>
                  </div>
               </div>
            </div>
            <button type="button" aria-label="Добавить" onClick={props.onAddPlace} className="profile__button-add"></button>
         </section>
         <div className="photo">
            <ul className="photo__container">
               {cards.map((element) => {
                  return (
                     <Card key={element._id} card={element} onCardClick={props.onCardClick}/>
                  );
               })}
            </ul>

         </div>




      </main>


   );
}

export default Main;