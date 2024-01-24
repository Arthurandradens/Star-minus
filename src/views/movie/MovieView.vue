<template>
  <v-container>
    <v-checkbox-btn v-model="custom" label="Filter"> </v-checkbox-btn>

    <v-autocomplete
    v-if="custom"
    :items="genres"
    chips
    multiple>

    </v-autocomplete>

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

<script >
import axios from 'axios';
import Card from "@/components/card/Card.vue";
export default {
  name: "MovieView",

  components: {
    Card
  },
  data() {
    return {
      movies: [],
      genres: [],
      custom: false,
      apiKey: import.meta.env.VITE_API_KEY,
      apiUrl: import.meta.env.VITE_API_URL,
      imageUrl: import.meta.env.VITE_IMG,
    }
  },

  methods: {

    async getMovies() {
      try {
        const url = `${this.apiUrl}trending/movie/week?${this.apiKey}&page=1`;
        const url2 = `${this.apiUrl}trending/movie/week?${this.apiKey}&page=3`;



        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        this.movies = response.data.results.concat(response2.data.results);
        console.log(this.movies);
      } catch (error) {
        console.error(error);
      }
    },

    async getGenre() {
      const movieUrl = `https://api.themoviedb.org/3/genre/movie/list?${this.apiKey}`
      const response = await axios.get(movieUrl)

     const genres = response.data.genres
      for (let i = 0; i < genres.length; i++) {
          this.genres.push(genres[i].name)
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
    this.getGenre()
    this.getMovies()
  }
};
</script>
