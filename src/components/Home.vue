<template>
  <div
    v-if="liveMovies != ''"
    style="
      display: flex;
      justify-content: center;
      width: 100%; /* Define a largura como 100% */
    "
  >
    <img
      width="1000"
      src="https://2.bp.blogspot.com/-TY9jRNnFMw4/Tmfc8eNGDtI/AAAAAAAAGFo/PnqTFltxw_g/s1600/x-big+banner.jpg"
      alt=""
      style="width: 100%; max-width: 1000px; /* Adiciona estilos para garantir que a imagem não ultrapasse 1000px */"
    />
  </div>
  <v-container>
    <popular-movie></popular-movie>
    <popular-series></popular-series>
    <live-movies></live-movies>
  </v-container>
</template>


<script>
import Card from "@/components/card/Card.vue";
import LiveMovies from "@/components/movie/LiveMovies.vue";
import PopularMovie from "@/components/movie/PupularMovie.vue";
import PopularSeries from "@/components/series/PopularSeries.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Card,
    PopularMovie,
    PopularSeries,
    LiveMovies,
  },

  computed: {},

  data() {
    return {
      moviesURL: import.meta.env.VITE_API_MOVIE,
      imageUrl: "https://image.tmdb.org/t/p/w500/",
      ApiKey: import.meta.env.VITE_API_KEY,
      liveMovies: [],
      currentLiveMoviePage: 1,
      pageSize: 4,
    };
  },

  methods: {
    async getLiveMovies() {
      try {
        const url = `${this.moviesURL}popular?${this.ApiKey}`;

        const response = await axios.get(url);
        this.liveMovies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.getLiveMovies();
  },
};
</script>
<style>
</style>
