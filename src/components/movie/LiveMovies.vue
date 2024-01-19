<template>
  <p class="title-poster">Live Now</p>
  <v-carousel v-model="moviePage" hideDelimiters hide-delimiter-background>
    <template v-slot:prev>
      <v-btn icon @click="prevSlide()">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
    </template>
    <v-row justify="center">
      <v-col v-for="(movie, indice) in paginateCard" :key="indice">
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="500"
            :image="imageUrl + movie.poster_path"
            max-width="350"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
            variant="text"
            @click="moveToCard(movie.id,'movie')"
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
  name: "LiveMovie",

  components: {},

  computed: {
    paginateCard() {
      const startIndex = (this.moviePage - 1) * 4;
      const endIndex = startIndex + 4;

      return this.liveMovies.slice(startIndex, endIndex);
    },
    movieCarousel() {
      return this.liveMovies.length / 4 - 1;
    },
  },

  data() {
    return {
      moviesURL: import.meta.env.VITE_API_MOVIE,
      imageUrl: import.meta.env.VITE_IMG,
      ApiKey: import.meta.env.VITE_API_KEY,
      liveMovies: [],
      moviePage: 1,
    };
  },

  methods: {
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

    moveToCard(id,type) {
      this.$router.push({path:`/card/${id}`, query: {type: type}})
    }
  },
  created() {
    this.getLiveMovies();
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lemon&family=Montserrat:wght@400;700&display=swap');
.title-poster{
  font-size: 2rem;
  font-family: "Oswald", sans-serif;
  margin-left: 2.5rem;
  margin-bottom: 1rem;

}

</style>
