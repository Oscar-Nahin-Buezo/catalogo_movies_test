import { createSlice } from '@reduxjs/toolkit';
import { IUserReducer } from '../../interfaces/userInterface';
import { loginUser } from '../actions/asyncActions/user.asyncActions';
import { IMovie, IPopularMovie } from '../../interfaces/movie.interface';
import { getPopularMovies } from '../actions/asyncActions/movies.asyncActions';
const initialState: IPopularMovie = {
  movies: [],
  total_pages: 1,
  selectedMovie: undefined,
  loading: false,
  errors: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.movies = action.payload;
    },
    setTotalPages: (state, action) => {
      state.total_pages = action.payload;
    },
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    saveErrors: (state, action) => {
      state.errors.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getPopularMovies.pending, state => {
      state.movies = [];
    });
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getPopularMovies.rejected, state => {
      state.movies = [];
    });
  },
});
export const {
  setPopularMovies,
  setTotalPages,
  selectMovie,
  setLoading,
  saveErrors,
} = movieSlice.actions;
export default movieSlice.reducer;
