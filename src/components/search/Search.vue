<template>
  <v-container>
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
      @keyup.enter="getSearch()"
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
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="400"
            :image="imageUrl + card.poster_path"
            max-width="400"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
            variant="text"
            @click="moveToCard(card.id)"
          >
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
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
      imageUrl: import.meta.env.VITE_IMG,
      moviesURL: import.meta.env.VITE_API_MOVIE,
      searchURL: import.meta.env.VITE_SEARCH,
      trendingUrl: import.meta.env.VITE_API_ALL,
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
      if (this.query === "") {
        return this.getAll();
      }
      try {
        const searchMovieQueryUrl = `${this.searchURL}movie?${this.apiKey}&query=${this.query}`;
        const searchSeriesQueryUrl = `${this.searchURL}tv?${this.apiKey}&query=${this.query}`;

        const response = await axios.get(searchMovieQueryUrl);
        const response2 = await axios.get(searchSeriesQueryUrl);
        this.movies = response.data.results.concat(response2.data.results);
        return this.movies;
      } catch (error) {
        console.error(error);
      }
    },

    async getAll() {
      const trendingAllUrl = `${this.trendingUrl}${this.apiKey}`;

      const response = await axios.get(trendingAllUrl);
      this.movies = response.data.results;
    },
    /**
     *
     * CORRIGIR ESSE METODO
     *
     */
    moveToCard(id, type) {
      console.log(this.movies)
      // this.$router.push({ path: `/card/${id}`, query: { type: type } });
    },
  },

  created() {
    this.getAll();
  },
};
</script>

