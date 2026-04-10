import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  name: string;
  email: string;
  age: number;
  dni: string;
  cellPhone: string;
}
interface ITokenUser {
  token: string;
}
export const saveDataUser = async ({
  userData,
  tokenUser,
}: {
  userData?: UserData;
  tokenUser?: ITokenUser;
}) => {
  // Implementation
  try {
    if (userData) {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }
    if (tokenUser) {
      await AsyncStorage.setItem('tokenUser', JSON.stringify(tokenUser));
    }
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const getDataUser = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    const tokenUserString = await AsyncStorage.getItem('tokenUser');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const tokenUser = tokenUserString ? JSON.parse(tokenUserString) : null;
    return { userData, tokenUser };
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    return { userData: null, tokenUser: null };
  }
};

export const clearDataUser = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('tokenUser');
  } catch (error) {
    console.error('Error clearing data from AsyncStorage:', error);
  }
};
