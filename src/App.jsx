import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages from 'services/imagesApi';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    loading: false,
    largeImageURL: '',
    tags: '',
    total: 0,
    error: null,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages(searchQuery, page);
    }
  }

  fetchImages = async (searchQuery, page) => {
    try {
      this.setState({ loading: true });

      const data = await getImages(searchQuery, page);

      if (data.hits.length === 0) {
        return toast.error('There is nothing for this search. Try again!');
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ isModalOpen: true, largeImageURL, tags });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false, largeImageURL: '', tags: '' });
  };

  render() {
    const { images, loading, total, error, largeImageURL, tags, isModalOpen } =
      this.state;
    const totalPage = total / images.length;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} isModalOpen={this.openModal} />
        )}
        {images.length > 0 && totalPage > 1 && !loading && (
          <LoadMoreButton onClick={this.loadMore} />
        )}
        {isModalOpen && (
          <Modal
            onClose={this.closeModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
        {error && <p>There is nothing for this search. Try again!</p>}
        <ToastContainer />
      </div>
    );
  }
}
export default App;
