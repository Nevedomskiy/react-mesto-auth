import React from 'react';

function PopupWithForm(props) {
   return (
      <div className={`popup popup_type_${props.name}${props.isOpen ? ' popup_active' : ''}`}>
         <div className="popup__container">
            <h3 className="popup__title">{`${props.title}`}</h3>
            <form name={`${props.name}`} className="popup__form" noValidate>
               {props.children}
            </form>
            <button onClick={props.onClose} type="button" aria-label="Закрыть" className="btn-close"></button>
         </div>
      </div>
   );
}

export default PopupWithForm;