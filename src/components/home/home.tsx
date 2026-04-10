import React, { useCallback, useEffect, useState } from 'react';
import { getPopularMovies } from '../../store/actions/asyncActions/movies.asyncActions';
import { IMovie } from '../../interfaces/movie.interface';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  selectMovie,
  setPopularMovies,
  setLoading,
  setTotalPages,
  saveErrors,
} from '../../store/reducers/movieReducer';
import { getPopularMoviesAPi, searchMovie } from '../../api/moviesApi';
const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, selectedMovie, loading, total_pages } = useSelector(
    (state: RootState) => state.movie,
  );
  const { token } = useSelector((state: RootState) => state.auth);

  const navigation = useNavigation();
  useEffect(() => {
    hanldeReoaldMovies();
  }, [currentPage]);

  const hanldeReoaldMovies = () => {
    setSearchQuery('');
    setCurrentPage(1);
    dispatch(setLoading(true));
    if (token && token !== '') {
      getPopularMoviesAPi({ token, page: currentPage })
        .then(data => {
          dispatch(setPopularMovies(data.results));
          dispatch(setTotalPages(data.total_pages));
          dispatch(setLoading(false));
        })
        .catch(error => {
          dispatch(setLoading(false));
          console.error('Error fetching movies:', error);
          Alert.alert('Error', 'Failed to fetch movies. Please try again.');
          dispatch(saveErrors('Error fetching movies: ' + String(error)));
        });
    }
  };

  const handleSelectMovie = (movie: IMovie) => {
    try {
      dispatch(selectMovie(movie));
      if (selectedMovie) {
        navigation.navigate('DetalleMovie' as never);
      } else {
        Alert.alert(
          'Error',
          'No se pudo seleccionar la película. Inténtalo de nuevo.',
        );
      }
    } catch (error) {
      console.error('Error selecting movie:', error);
      dispatch(saveErrors('Error selecting movie: ' + String(error)));
    }
  };

  const handleSearchMovie = () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Error', 'Please enter a search query.');
      return;
    }
    try {
      dispatch(setLoading(true));
      searchMovie({ token, search: searchQuery })
        .then(data => {
          dispatch(setPopularMovies(data.results));
          dispatch(setTotalPages(data.total_pages));
          dispatch(setLoading(false));
        })
        .catch(error => {
          dispatch(setLoading(false));
          console.error('Error searching movie:', error);
          Alert.alert('Error', 'Failed to search movies. Please try again.');
          dispatch(saveErrors('Error searching movie: ' + String(error)));
        });
    } catch (error) {
      console.error('Error searching movie:', error);
      dispatch(saveErrors('Error searching movie: ' + String(error)));
    }
  };
  const handleSetPage = (page: number) => {
    if (page >= 1 && page <= total_pages) {
      setCurrentPage(page);
      hanldeReoaldMovies();
    }
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120, width: '100%' }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.movieTitle}>Popular Movies</Text>
        <TouchableOpacity
          onPress={hanldeReoaldMovies}
          disabled={loading}
          style={styles.buttonRefresh}
        >
          <Text style={{ color: '#fff' }}>
            {loading ? 'Loading...' : 'Refresh Movies'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: 18,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={handleSearchMovie}
          style={styles.buttonSearch}
        >
          <Text style={{ color: '#fff' }}>Search</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* Pagination Controls */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Button
            title="Previous"
            onPress={() => handleSetPage(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          />
          <Text style={{ marginHorizontal: 20, fontSize: 16 }}>
            Page {currentPage} of {total_pages}
          </Text>
          <Button
            title="Next"
            onPress={() => handleSetPage(currentPage + 1)}
            disabled={currentPage === total_pages || loading}
          />
        </View>
      </View>
      {loading && (
        <View>
          <Text>Loading movies...</Text>
        </View>
      )}
      {!loading && movies?.length === 0 && (
        <View>
          <Text>No movies available.</Text>
        </View>
      )}
      {!loading && movies?.length > 0 && (
        <View style={styles.movieContainer}>
          {movies.map(movie => (
            <TouchableOpacity
              key={movie.title}
              onPress={() => handleSelectMovie(movie)}
              style={styles.movieCard}
            >
              <Text style={styles.movieTitle}>{movie.title}</Text>
              {movie.backdrop_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                  }}
                  style={styles.movieImage}
                />
              )}
              <Text style={styles.movieTitle}>Titulo: {movie.title}</Text>
              <Text style={styles.movieReleaseDate}>
                Fecha de lanzamiento: {String(movie.release_date)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonRefresh: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonSearch: {
    backgroundColor: '#007BFF',
    padding: 10,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  movieImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieReleaseDate: {
    fontSize: 14,
    color: 'gray',
  },
  movieCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '60%',
  },
});

export default Home;
