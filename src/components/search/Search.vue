<template>
  <v-container>
    <v-text-field
      v-model="query"
      label="Search"
      append-inner-icon="mdi-magnify"
      @click:append-inner="getSearch()"
      @keyup.enter="getSearch()"
    >
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
            <v-img
              v-if="card.poster_path"
              :src="imageUrl + card.poster_path"
            ></v-img>
            <v-card-title class="mx-auto title align-center" v-else
              >Imagem <br />
              Não <br />
              Disponível</v-card-title
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
      query: this.$route.query.value,
      imageUrl: import.meta.env.VITE_IMG,
      moviesURL: import.meta.env.VITE_API_MOVIE,
      searchURL: import.meta.env.VITE_SEARCH,
      trendingUrl: import.meta.env.VITE_API_ALL,
      apiKey: import.meta.env.VITE_API_KEY,
      id: null,
      genres: [],
      filtered:[]
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

      if ( this.query === undefined || this.query.trim() === '') {
        return this.getAll();
      }
      try {
        // const searchMovieQueryUrl = `${this.searchURL}movie?${this.apiKey}&query=${this.query}`;
        // const searchSeriesQueryUrl = `${this.searchURL}tv?${this.apiKey}&query=${this.query}`;
        const url = `${this.searchURL}multi?${this.apiKey}&query=${this.query}`;
        const response = await axios.get(url)
        this.movies = response.data.results
        this.filter(this.movies)
        // const response = await axios.get(searchMovieQueryUrl);
        // const response2 = await axios.get(searchSeriesQueryUrl);
        // this.movies = response.data.results.concat(response2.data.results);
      } catch (error) {
        console.error(error);
      }
    },

    async getAll() {
      const trendingAllUrl = `${this.trendingUrl}${this.apiKey}`;

      const response = await axios.get(trendingAllUrl);
      this.movies = response.data.results;
    },

    async getGenre() {
      const movieUrl = `https://api.themoviedb.org/3/genre/movie/list?${this.apiKey}`
      const tvUrl = `https://api.themoviedb.org/3/genre/tv/list?${this.apiKey}`
      const response = await axios.get(movieUrl)
      const response2 = await axios.get(tvUrl)

     const genres = response.data.genres.concat(response2.data.genres)
      for (let i = 0; i < genres.length; i++) {
          this.genres.push(genres[i].name)
      }
    },

    filter(array) {
      this.filtered = []
      for (let i = 0; i < array.length; i++) {

            this.filtered.push(array[i].genre_ids)
      }
      console.log(this.filtered)
    },

    getType(id) {
      // for (let i = 0; i < this.movies.length; i++) {
      //   if (this.movies[i].id === id) {
      //     if (this.movies[i].title) {
      //       return "movie";
      //     } else if (this.movies[i].name) {
      //       return "series";
      //     }
      //   }
      // }

      for (let i = 0; i < this.movies.length; i++) {
        if (this.movies[i].id === id) {
          if (this.movies[i].media_type === 'movie') {
            return "movie"
          }
          else if (this.movies[i].media_type === 'tv') {
            return "series"
          }
        }
      }
    },

    moveToCard(id) {
      const type = this.getType(id);
      this.$router.push({
        path: `/card/${id}`,
        query: {
          type: type,
          value: this.query,
          thisPath: window.location.pathname,
        },
      });
    },
  },

  created() {
    this.getSearch();
    this.getGenre()
  },
};
</script>
<style>
.title {
  font-size: 1.7rem;
  font-family: "Oswald", sans-serif;
  margin: 1rem;
}
</style>

