import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt => {
    this.setState({ searchQuery: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      return toast.error('Fill in the search field, please!');
    }
    this.props.onSubmit(searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="searchForm">
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
