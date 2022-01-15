import './App.css';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import fetchImages from './components/services';
import Load from './components/Loader';
import Modal from './components/Modal';
import OnButton from './components/Button/Button';

import styled from 'styled-components';

function App() {
  const [imageQuery, setImageQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageUrl] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!imageQuery) {
      return;
    }
    setStatus('pending');
    fetchImages(imageQuery, 1)
      .then(data => {
        if (data.total === 0) {
          toast.error('Nothing found');
          return setStatus('idle');
        } else {
          setImages(data.hits);
          setPage(s => s + 1);
          setStatus('resolved');
        }
      })
      .catch(error => toast.error('Something wrong'));
  }, [imageQuery]);

  const toggleModal = () => {
    setShowModal(s => !s);
  };

  const onOpenModal = event => {
    setLargeImageUrl(event.target.dataset.source);
    setAlt(event.target.alt);
    toggleModal();
  };

  const onBtnClick = event => {
    fetchImages(imageQuery, page).then(data => {
      setPage(s => s + 1);
      setImages(s => [...s, ...data.hits]);
      setStatus('resolved');
    });
    scrollPage();
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 500);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={setImageQuery} />
      <Toaster />
      {status === 'idle' && <></>}
      {status === 'pending' && (
        <div>
          <Load />
        </div>
      )}
      {status === 'resolved' && <ImageGallery images={images} onOpenModal={onOpenModal} />}
      {images.length >= 12 && <OnButton onBtnClick={onBtnClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={alt} width="750" />
        </Modal>
      )}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export default App;
