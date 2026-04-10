import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieDetails from '../components/movieDetails/movieDetails';
const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <MovieDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
