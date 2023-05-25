import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages from 'services/imagesApi';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchQuery !== '' || page !== 1) {
      fetchImages(searchQuery, page);
    }
  }, [searchQuery, page]);

  const fetchImages = async (searchQuery, page) => {
    try {
      setLoading(true);

      const data = await getImages(searchQuery, page);

      if (data.hits.length === 0) {
        return toast.error('There is nothing for this search. Try again!');
      }
      setImages(images => [...images, ...data.hits]);
      setTotal(data.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageURL('');
    setTags('');
  };

  const totalPage = total / images.length;

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} isModalOpen={openModal} />
      )}
      {images.length > 0 && totalPage > 1 && !loading && (
        <LoadMoreButton onClick={loadMore} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal} largeImageURL={largeImageURL} tags={tags} />
      )}
      {error && <p>There is nothing for this search. Try again!</p>}
      <ToastContainer />
    </div>
  );
};

export default App;
