<template>
  <p class="text-h5 font-weight-bold mb-2">Popular Movies</p>
  <v-carousel
    v-model="currentPage"
    hideDelimiters
    hide-delimiter-background
  >
    <template v-slot:prev>
      <v-btn icon @click="prevSlide(currentPage, movieCarousel, 'movie')">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
    </template>
    <v-row justify="center">
      <v-col v-for="(card, indice) in paginateCard" :key="indice">
        <card :card="card"></card>
      </v-col>
    </v-row>
    <template v-slot:next>
      <v-btn icon @click="nextSlide(currentPage, movieCarousel, 'movie')">
        <v-icon> mdi-chevron-right </v-icon>
      </v-btn>
    </template>
  </v-carousel>

</template>


<script>
import Card from "@/card/Card.vue";
import axios from "axios";
export default {
  name: 'PopularMovie',

  components: {
    Card,
  },

  computed: {
    paginateCard() {
      const startIndex = (this.moviePage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.popularMovies.slice(startIndex, endIndex);
    },
    movieCarousel() {
      return this.popularMovies.length / 4;
    },
  },

  data() {
    return {
      moviesURL: import.meta.env.VITE_API_MOVIE,
      ApiKey: import.meta.env.VITE_API_KEY,
      popularMovies: [],
      currentPage: 1,
      moviePage: 1,
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

    nextSlide() {
      if (this.currentPage > this.movieCarousel - 1) {
        this.currentPage = 1;
      }
      return this.MoviePage++;
    },

    prevSlide() {
      if (this.currentPage <= 1) {
        this.currentPage = this.movieCarousel - 1;
      }
      return this.MoviePage--;
    },
  },
  created() {
    this.getPopularMovies();
  },
};
</script>
