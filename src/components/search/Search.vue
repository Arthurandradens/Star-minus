<template>
  <v-container >
    <!-- <h1>
      Results for :
      <span style="color: #004d40" class="query-text">{{ query }}</span>
    </h1> -->
    <v-checkbox-btn v-model="custom" label="Searching"> </v-checkbox-btn>

    <v-text-field
      v-model="query"
      label="Search"
      loading
      append-inner-icon="mdi-magnify"
      @click:append-inner="getSearch()"


    >
      <template v-slot:loader>
        <v-progress-linear
          :active="custom"
          :model-value="progress"
          :color="color"
          height="7"
          indeterminate
        >
        </v-progress-linear>
      </template>
    </v-text-field>

    <v-row justify="center">
      <v-col
        v-for="(card, indice) in movies"
        :key="indice"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <card :card="card"></card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';
import Card from "../card/Card.vue";

export default {
  name: "Search",
  components: {
    Card,
  },

  data() {
    return {
      value: "",
      custom: false,
      movies: [],
      setMovies: [],
      query: "",
      moviesURL: import.meta.env.VITE_API_MOVIE,
      searchURL: import.meta.env.VITE_SEARCH,
      apiKey: import.meta.env.VITE_API_KEY,
    };
  },

  computed: {
    progress() {
      return Math.min(100, this.value.length * 10);
    },

    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    },
  },

  methods: {
    async getSearch() {
      try {
        const searchWithQueryUrl = `${this.searchURL}?${this.apiKey}&query=${this.query}`;
        // const searchWithQueryUrl = `${this.moviesURL}top_rated?${this.apiKey}`;

        const response = await axios.get(searchWithQueryUrl);
        this.movies = response.data.results;
        return this.movies;
      } catch (error) {
        console.error(error);
      }
    },

  },

  created() {

  },
};
</script>

