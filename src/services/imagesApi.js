import axios from 'axios';

const API_KEY = '34552003-c041c4010936caa6c4fdbe25f';
const BASE_URL = `https://pixabay.com/api`;

const getImages = async (searchQuery, page) => {
  const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getImages;
