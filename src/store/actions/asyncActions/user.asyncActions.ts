import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../api/axios/axiosApi';
import { ILoginUser } from '../../../interfaces/userInterface';
import { AxiosError } from 'axios';
import { saveDataUser } from '../../../asyncStorage/asyncStorage';

export const loginUser = createAsyncThunk(
  'auth/logIn',
  async (loginData: ILoginUser, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/login', loginData);
      const { userData, tokenUser } = response.data;

      await saveDataUser({ userData, tokenUser });

      return response.data;
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
