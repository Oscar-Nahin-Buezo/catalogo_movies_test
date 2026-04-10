import axiosApi from '../axios/axiosApi';

export const getPopularMoviesAPi = async ({
  token,
  page,
}: {
  token: string;
  page: number;
}) => {
  if (!token || token === '') {
    throw new Error('Token is required');
  }
  try {
    const response = await axiosApi.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { data } = response;
    console.log('Movies fetched:', response.data);
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovie = async ({
  token,
  search,
}: {
  token: string;
  search: string;
}) => {
  if (!token || token === '') {
    throw new Error('Token is required');
  }
  try {
    const response = await axiosApi.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { data } = response;
    console.log('Movies fetched:', response.data);
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
