<template>
  <v-container fluid>
    <v-card
      v-if="liveMovies != ''"
      class="mx-auto"
      height="650"
      :image="imageUrl + liveMovies[4].backdrop_path"
    >
      <span style="font-size: 3rem; font-family: lemon; color: black">{{
        liveMovies[4].title
      }}</span>
    </v-card>

    <popular-movie></popular-movie>
    <popular-series></popular-series>
    <live-movies></live-movies>
    <top-rated-movies></top-rated-movies>
    <live-series></live-series>
  </v-container>
</template>


<script>
import LiveMovies from "@/components/movie/LiveMovies.vue";
import PopularMovie from "@/components/movie/PupularMovie.vue";
import TopRatedMovies from "@/components/movie/TopRatedMovies.vue";
import LiveSeries from "@/components/series/LiveSeries.vue";
import PopularSeries from "@/components/series/PopularSeries.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    PopularMovie,
    PopularSeries,
    LiveMovies,
    LiveSeries,
    TopRatedMovies,
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
      banner:
        "https://2.bp.blogspot.com/-TY9jRNnFMw4/Tmfc8eNGDtI/AAAAAAAAGFo/PnqTFltxw_g/s1600/x-big+banner.jpg",
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
@import url("https://fonts.googleapis.com/css2?family=Lemon&family=Montserrat:wght@400;700&family=Oswald:wght@300&display=swap");
</style>
