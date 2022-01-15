import { useState } from 'react';
import toast from 'react-hot-toast';
import { SearchbarSt, SearchFormSt, Input } from './Searchbar.style';
import PropTypes from 'prop-types';

function Searchbar(props) {
  const [imageQuery, setImageGuery] = useState('');

  const onImageChange = event => {
    setImageGuery(event.currentTarget.value.toLowerCase());
  };

  const onSubmit = event => {
    event.preventDefault();

    if (imageQuery.trim() === '') {
      toast.error(`Enter a search word`);
      return;
    }
    props.onSubmit(imageQuery);
    setImageGuery('');
  };

  return (
    <SearchbarSt className="searchbar">
      <SearchFormSt className="form" onSubmit={onSubmit}>
        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageQuery}
          onChange={onImageChange}
        />
      </SearchFormSt>
    </SearchbarSt>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func };

export default Searchbar;
