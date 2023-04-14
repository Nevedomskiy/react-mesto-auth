function Card({ card, onCardClick }) {
   const handleCardClick = () => {
      onCardClick(card);
   };
   return (
      <li className="photo__element" >
         <img className="photo__img" onClick={handleCardClick} src={card.link} alt={card.name} ></img>
         <div className="photo__name">
            <h3 className="photo__title">{card.name}</h3>
            <div className="photo__like-container">
               <button type="button" aria-label="Лайк" className="photo__like"></button>
               <p className="photo__like-counter">{card.likes.length}</p>
            </div>
         </div>
         <button type="button" aria-label="Удалить" className="photo__delete"></button>
      </li>
   );
}

export default Card;