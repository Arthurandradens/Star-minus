<template>
  <p class="title">Up Coming</p>
  <v-carousel
    class="movie-container"
    v-model="moviePage"
    hideDelimiters
    hide-delimiter-background
    height="200"
  >
    <template v-slot:prev>
      <v-btn icon @click="prevSlide()">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
    </template>
    <v-row justify="center">
      <v-col v-for="(card, indice) in paginateCard" :key="indice">
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="180"
            :image="imageUrl + card.backdrop_path"
            max-width="400"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
            variant="text"
            @click="moveToCard(card.id, 'movie')"
          >
            <v-card-title
              class="mx-auto title align-center"
              v-if="!card.backdrop_path"
              >Image <br />
              Not <br />
              available</v-card-title
            >
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <template v-slot:next>
      <v-btn icon @click="nextSlide()">
        <v-icon> mdi-chevron-right </v-icon>
      </v-btn>
    </template>
  </v-carousel>
</template>


<script>
import axios from "axios";
export default {
  name: "TopŔatedMovies",

  components: {},

  computed: {
    paginateCard() {
      const startIndex = (this.moviePage - 1) * 4;
      const endIndex = startIndex + 4;

      return this.movies.slice(startIndex, endIndex);
    },
    movieCarousel() {
      return this.movies.length / 4 - 1;
    },
  },

  data() {
    return {
      moviesURL: import.meta.env.VITE_API_MOVIE,
      imageUrl: import.meta.env.VITE_IMG,
      ApiKey: import.meta.env.VITE_API_KEY,
      movies: [],
      moviePage: 1,
    };
  },

  methods: {
    async getUpComingMovies() {
      try {
        const url = `${this.moviesURL}upcoming?${this.ApiKey}`;

        const response = await axios.get(url);
        this.movies = response.data.results;
        return this.movies;
      } catch (error) {
        console.error(error);
      }
    },

    nextSlide() {
      if (this.moviePage > this.movieCarousel) {
        this.moviePage = 0;
      }
      return this.moviePage++;
    },

    prevSlide() {
      if (this.moviePage == 1) {
        this.moviePage = this.movieCarousel + 2;
      }
      return this.moviePage--;
    },

    moveToCard(id, type) {
      this.$router.push({ path: `/card/${id}`, query: { type: type } });
    },
  },
  created() {
    this.getUpComingMovies();
  },
};
</script>
<style>
</style>
