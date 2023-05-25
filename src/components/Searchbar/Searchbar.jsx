import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Fill in the search field, please!');
    }
    onSubmit(searchQuery);

    setSearchQuery('');
  };

  return (
    <header className="searchbar">
      <form onSubmit={handleSubmit} className="searchForm">
        <button type="submit" className="searchForm__button">
          <span className="searchForm__button__label">Search</span>
        </button>

        <input
          className="searchForm__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
