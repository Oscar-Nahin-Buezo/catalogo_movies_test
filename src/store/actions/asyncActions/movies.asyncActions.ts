import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../api/axios/axiosApi';
import { ILoginUser } from '../../../interfaces/userInterface';
import { AxiosError } from 'axios';
import { saveDataUser } from '../../../asyncStorage/asyncStorage';

export const getPopularMovies = createAsyncThunk(
  'movies/getPopularMovies',
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Movies fetched successfully:', response.data);
      return response.data.results;
    } catch (error: any) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('Network error');
      }
    }
  },
);
