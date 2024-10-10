import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create the API with Redux Toolkit Query
export const genreMovieApi = createApi({
  reducerPath: 'genreMovieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/', // Your API base URL
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllMovieGenre: builder.query({
      query: () => `/api/movieGenre`,
    }),

    getGenresByMovie: builder.query({
      query: (id) => `/api/movie/${id}/genres`,
    }),

    getMoviesByGenre: builder.query({
      query: (id) => `/api/genre/${id}/movies`,
    }),

    addGenresToMovie: builder.mutation({
      query: ({ movieId, genreIds }) => ({
        url: `/api/movie/${movieId}/genres`,
        method: 'POST',
        body: { genreIds },
      }),
    }),

    removeGenreFromMovie: builder.mutation({
      query: ({ movieId, genreId }) => ({
        url: `/api/movie/${movieId}/genre/${genreId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
  useGetAllMovieGenreQuery,
  useAddGenresToMovieMutation,
  useRemoveGenreFromMovieMutation,
  useGetGenresByMovieQuery,
  useGetMoviesByGenreQuery,
  usePatchGenresForMovieMutation,
} = genreMovieApi;
