import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyle } from './Modal.style';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', handlKeyDown);

    return () => {
      window.removeEventListener('keydown', handlKeyDown);
    };
  });

  const handlKeyDown = event => {
    if (event.code === 'Escape') {
      props.onClose();
    }
  };

  const handlBackdropClick = event => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handlBackdropClick}>
      <ModalStyle>{props.children}</ModalStyle>
    </Overlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
