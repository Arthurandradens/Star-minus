<template>
  <v-container fluid>
    <!-- <v-card
      v-if="liveMovies != ''"
      class="mx-auto image-with-gradient"
      height="650"
      :image="imageUrl + liveMovies[4].backdrop_path"
      >
      <span style="font-size: 3rem; font-family: lemon; color: black">{{
        liveMovies[4].title
      }}</span>
    </v-card> -->
    <!-- <div class="image-container">
      <v-fade-transition hide-on-leave>
        <v-img
          :src="image"

          height="850"
          cover
          class="image-with-gradient"
        ></v-img>
      </v-fade-transition>
    </div> -->

    <!-- <div class="image-container"> -->
      <!-- Imagem principal -->
      <!-- <v-fade-transition hide-on-leave>
        <v-img
          :src="image"
          height="850"
          cover
          class="image-with-gradient"
        ></v-img>
      </v-fade-transition>
    </div> -->

    <popular-movie></popular-movie>
    <live-today-series></live-today-series>
    <live-movies></live-movies>
    <popular-series></popular-series>
    <top-rated-series></top-rated-series>
    <top-rated-movies></top-rated-movies>
    <live-series></live-series>
    <up-coming></up-coming>

  </v-container>
</template>


<script>
import LiveMovies from "@/components/movie/LiveMovies.vue";
import PopularMovie from "@/components/movie/PupularMovie.vue";
import TopRatedMovies from "@/components/movie/TopRatedMovies.vue";
import UpComing from "@/components/movie/UpComing.vue";
import LiveSeries from "@/components/series/LiveSeries.vue";
import LiveTodaySeries from "@/components/series/LiveTodaySeries.vue";
import PopularSeries from "@/components/series/PopularSeries.vue";
import TopRatedSeries from "@/components/series/TopRatedSeries.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    PopularMovie,
    PopularSeries,
    LiveMovies,
    LiveSeries,
    TopRatedMovies,
    UpComing,
    TopRatedSeries,
    LiveTodaySeries,
  },

  computed: {},

  data() {
    return {
      moviesURL: import.meta.env.VITE_API_MOVIE,
      imageUrl: "https://image.tmdb.org/t/p/w500/",
      image: "src/assets/banner4.jpg",
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


/* Transição de fade in e fade out */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.75s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
/* Degradê da imagem de fundo*/
.image-container {
  position: relative;
}

.image-with-gradient {
  width: 100%;
  height: auto;
}

.movie-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; /* Ajuste a largura conforme necessário */
}

.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent);
  z-index: 1;
}
</style>
