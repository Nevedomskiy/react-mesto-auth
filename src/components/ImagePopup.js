import React from 'react';

function ImagePopup(props) {
   return (
      <div className={`popup popup_type_photo ${props.isOpen ? 'popup_active' : ""}`}>
         < div className="popup__container popup__container_type_photo" >
            <img className="popup__img"  alt={props.card.name} src={props.card.link}></img>
            <h3 className="popup__name">{props.card.name}</h3>
            <button type="button" aria-label="Закрыть" onClick={props.onClose} className="btn-close"></button>
         </div >
      </div >
   );
}

export default ImagePopup;