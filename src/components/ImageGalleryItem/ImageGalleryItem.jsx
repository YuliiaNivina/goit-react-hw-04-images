import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  isModalOpen,
}) => (
  <li className="imageGalleryItem">
    <div onClick={() => isModalOpen(largeImageURL, tags)}>
      <img className="imageGalleryItem__img" src={webformatURL} alt={tags} />
    </div>
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  isModalOpen: PropTypes.func.isRequired,
};
