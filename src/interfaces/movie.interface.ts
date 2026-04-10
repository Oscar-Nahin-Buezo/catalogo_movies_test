export interface IMovie {
  backdrop_path: string;
  title: string;
  release_date: Date;
  vote_average: number;
  overview: string;
}

export interface IPopularMovie {
  movies: IMovie[];
  total_pages: number;
  selectedMovie: IMovie | undefined;
  loading: boolean;
  errors: string[];
}
