import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, isModalOpen }) => (
  <ul className="imageGallery">
    {images.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        tags={tags}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        isModalOpen={isModalOpen}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  isModalOpen: PropTypes.func.isRequired,
};
