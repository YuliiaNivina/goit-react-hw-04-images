import PropTypes from 'prop-types';

const LoadMoreButton = ({ onClick }) => (
  <button className="loadMore" type="button" onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreButton;

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
