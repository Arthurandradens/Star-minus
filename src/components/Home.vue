<template>
  <v-container>
    <p class="text-h5 font-weight-bold mb-2">Popular Movies</p>
    <v-carousel
      v-model="currentMoviePage"
      hideDelimiters
      hide-delimiter-background
    >
      <template v-slot:prev>
        <v-btn
          icon
          @click="prevSlide(currentMoviePage, movieCarousel, 'movie')"
        >
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </template>
      <v-row justify="center">
        <v-col v-for="(card, indice) in paginateMovieCard" :key="indice">
          <card :card="card"></card>
        </v-col>
      </v-row>
      <template v-slot:next>
        <v-btn
          icon
          @click="nextSlide(currentMoviePage, movieCarousel, 'movie')"
        >
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
      </template>
    </v-carousel>

    <p class="text-h5 font-weight-bold mb-2">Popular Series</p>
    <v-carousel
      v-model="currentSeriesPage"
      hideDelimiters
      hide-delimiter-background
    >
      <template v-slot:prev>
        <v-btn
          icon
          @click="prevSlide(currentSeriesPage, seriesCarousel, 'series')"
        >
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </template>
      <v-row justify="center">
        <v-col v-for="(card, indice) in paginateSeriesCard" :key="indice">
          <card :card="card"></card>
        </v-col>
      </v-row>
      <template v-slot:next>
        <v-btn
          icon
          @click="nextSlide(currentSeriesPage, seriesCarousel, 'series')"
        >
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
      </template>
    </v-carousel>
    <p class="text-h5 font-weight-bold mb-2">Live Now</p>
    <v-carousel
      v-model="currentLiveMoviePage"
      hideDelimiters
      hide-delimiter-background
    >
      <template v-slot:prev>
        <v-btn
          icon
          @click="prevSlide(currentLiveMoviePage, liveMovieCarousel, 'live')"
        >
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </template>
      <v-row justify="center">
        <v-col v-for="(card, indice) in paginateLiveMovieCard" :key="indice">
          <card :card="card"></card>
        </v-col>
      </v-row>
      <template v-slot:next>
        <v-btn
          icon
          @click="nextSlide(currentLiveMoviePage, liveMovieCarousel, 'live')"
        >
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
      </template>
    </v-carousel>


      <!-- <popular-movie ></popular-movie> -->

  </v-container>
</template>


<script>
import Card from "@/components/card/Card.vue";
// import PopularMovie from "@/components/movie/PupularMovie.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Card,
    // PopularMovie,
  },

  computed: {
    paginateMovieCard() {
      const startIndex = (this.currentMoviePage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.popularMovies.slice(startIndex, endIndex);
    },

    paginateLiveMovieCard() {
      const startIndex = (this.currentLiveMoviePage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.liveMovies.slice(startIndex, endIndex);
    },

    paginateSeriesCard() {
      const startIndex = (this.currentSeriesPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.popularSeries.slice(startIndex, endIndex);
    },

    movieCarousel() {
      return this.popularMovies.length / this.pageSize;
    },

    liveMovieCarousel() {
      return this.liveMovies.length / this.pageSize;
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
      liveMovies: [],
      currentMoviePage: 1,
      currentLiveMoviePage: 1,
      currentSeriesPage: 1,
      pageSize: 4,
    };
  },

  methods: {
    async getPopularMovies() {
      try {
        const url = `${this.moviesURL}popular?${this.ApiKey}`;

        const response = await axios.get(url);
        this.popularMovies = response.data.results;
        return this.popularMovies;
      } catch (error) {
        console.error(error);
      }
    },

    async getLiveMovies() {
      try {
        const url = `${this.moviesURL}now_playing?${this.ApiKey}`;

        const response = await axios.get(url);
        this.liveMovies = response.data.results;
        return this.liveMovies;
      } catch (error) {
        console.error(error);
      }
    },

    async getPopularSeries() {
      try {
        const url = `${this.seriesURL}popular?${this.ApiKey}`;

        const response = await axios.get(url);
        this.popularSeries = response.data.results;
        return this.popularSeries;
      } catch (error) {
        console.error(error);
      }
    },

    nextSlide(currentPage, carousel, type) {
      if (currentPage > carousel - 1) {
        switch (type) {
          case "movie":
            this.currentMoviePage = 1;
            break;
          case "series":
            this.currentSeriesPage = 1;
            break;
          case "live":
            this.currentLiveMoviePage = 1;
            break;

          default:
            break;
        }
      } else {
        switch (type) {
          case "movie":
            this.currentMoviePage++;
            break;
          case "series":
            this.currentSeriesPage++;
            break;
          case "live":
            this.currentLiveMoviePage++;
            break;

          default:
            break;
        }
      }
    },

    prevSlide(currentPage, carousel, type) {
      if (currentPage <= 1) {
        switch (type) {
          case "movie":
            this.currentMoviePage = carousel - 1;
            break;
          case "series":
            this.currentSeriesPage = carousel;
            break;
          case "live":
            this.currentLiveMoviePage = carousel;
            break;

          default:
            break;
        }
      } else {
        switch (type) {
          case "movie":
            this.currentMoviePage--;
            break;
          case "series":
            this.currentSeriesPage--;
            break;
          case "live":
            this.currentLiveMoviePage--;
            break;

          default:
            break;
        }
      }
    },

    moveToMovie() {
      this.$router.push("/movie/1");
    },
  },

  created() {
    this.getPopularMovies();
    this.getPopularSeries();
    this.getLiveMovies();
  },
};
</script>
<style>
</style>
