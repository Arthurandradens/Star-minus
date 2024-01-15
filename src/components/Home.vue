<template>
  <v-container >
    <p class="text-h5 font-weight-bold mb-2">Popular Movies</p>
    <v-carousel v-model="currentMoviePage" hideDelimiters hide-delimiter-background>
      <template v-slot:prev>
        <v-btn icon @click="prevMovieSlide()">
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </template>
      <v-row justify="center">
        <v-col v-for="(movie, indice) in paginateMovieCard" :key="indice">
          <movie-card :movie="movie"></movie-card>
        </v-col>
      </v-row>
      <template v-slot:next>
        <v-btn icon @click="nextMovieSlide(currentMoviePage, movieCarousel)">
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
      </template>
    </v-carousel>

    <p class="text-h5 font-weight-bold mb-2">Popular Series</p>
    <v-carousel v-model="currentSeriesPage" hideDelimiters hide-delimiter-background>
      <template v-slot:prev>
        <v-btn icon @click="prevSeriesSlide()">
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </template>
      <v-row justify="center">
        <v-col v-for="(movie, indice) in paginateSeriesCard" :key="indice">
          <movie-card :movie="movie"></movie-card>
        </v-col>
      </v-row>
      <template v-slot:next>
        <v-btn icon @click="nextSeriesSlide()">
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
      </template>
    </v-carousel>
  </v-container>
</template>


<script>
import MovieCard from "@/components/movie/MovieCard.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    MovieCard,
  },

  computed: {
    paginateMovieCard() {
      const startIndex = (this.currentMoviePage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.popularMovies.slice(startIndex, endIndex);
    },

    paginateSeriesCard() {
      const startIndex = (this.currentSeriesPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.popularSeries.slice(startIndex, endIndex);
    },


    movieCarousel() {
      return this.popularMovies.length / this.pageSize;
    },

    seriesCarousel() {
      return this.popularSeries.length / this.pageSize;
    },
  },

  data() {
    return {
      moviesURL: import.meta.env.VITE_API_MOVIE,
      seriesURL: import.meta.env.VITE_API_SERIES,
      ApiKey: import.meta.env.VITE_API_KEY,
      popularSeries: [],
      popularMovies: [],
      currentMoviePage: 1,
      currentSeriesPage: 1,
      pageSize: 4,
    };
  },

  methods: {
    async getPopularMovies() {
      try {
        const popularMoviesUrl = `${this.moviesURL}popular?${this.ApiKey}`;

        const response = await axios.get(popularMoviesUrl);
        this.popularMovies = response.data.results;
        return this.popularMovies;
      } catch (error) {
        console.error(error);
      }
    },

    async getPopularSeries() {
      try {
        const popularSeriesUrl = `${this.seriesURL}popular?${this.ApiKey}`;

        const response = await axios.get(popularSeriesUrl);
        this.popularSeries = response.data.results;
        return this.popularSeries;
      } catch (error) {
        console.error(error);
      }
    },

    nextMovieSlide(currentMoviePage,movieCarousel) {
      if (currentMoviePage > movieCarousel - 1) {
        return (currentMoviePage = 1);
      }
      return currentMoviePage++;
    },

    prevMovieSlide() {
      if (this.currentMoviePage <= 1) {
        return (this.currentMoviePage = this.movieCarousel);
      }
      return this.currentMoviePage--;
    },

    nextSeriesSlide() {
      if (this.currentSeriesPage > this.seriesCarousel - 1) {
        return (this.currentSeriesPage = 1);
      }
      return this.currentSeriesPage++;
    },

    prevSeriesSlide() {
      if (this.currentSeriesPage <= 1) {
        return (this.currentSeriesPage = this.seriesCarousel);
      }
      return this.currentSeriesPage--;
    },

    onPageChange(page) {
      this.currentMoviePage = page;
    },

    moveToMovie() {
      this.$router.push("/movie/1");
    },
  },

  created() {
    this.getPopularMovies();
    this.getPopularSeries();
  },
};
</script>
<style>


</style>
