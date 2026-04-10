import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
const MovieDetails = () => {
  const { selectedMovie } = useSelector((state: RootState) => state.movie);

  return (
    <View>
      {!selectedMovie && <Text>No movie selected.</Text>}
      {selectedMovie && (
        <View style={styles.cardDetails}>
          <Text style={styles.movieTitle}>Title: {selectedMovie.title}</Text>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`,
            }}
            style={styles.movieImage}
          />
          <Text style={styles.movieOverview}>
            Overview: {selectedMovie.overview}
          </Text>
          <Text style={styles.movieRating}>
            Rating: {String(selectedMovie.vote_average)}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 14,
    marginBottom: 10,
  },
  movieRating: {
    fontSize: 14,
    marginBottom: 10,
  },
  movieImage: {
    width: '90%',
    height: 300,
    marginBottom: 20,
  },

  cardDetails: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MovieDetails;
