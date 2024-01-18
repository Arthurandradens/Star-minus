<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" height="650" variant="text" max-width="500">
          <v-img :src="imageUrl + card.poster_path" alt="Movie Poster"></v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          class="mx-auto d-flex flex-column justify-end"
          variant="flat"
          height="650"
          max-width="800"
          v-if="card != ''"
        >
          <v-card-title class="title ml-1 mb-2">{{ card.title }}</v-card-title>

          <v-row>
            <v-col>
              <v-card-text>
                <span class="subtitle">Language : </span>
                <span class="text">{{ card.spoken_languages[0].name }}</span>
              </v-card-text>
              <v-card-text class="d-flex align-center">
                <span class="subtitle"> Genres:</span>
                <v-breadcrumbs
                  class="text"
                  :items="genres"
                  divider=","
                ></v-breadcrumbs>
              </v-card-text>
              <v-card-text>
                <span class="subtitle">Budget : </span>
                <span class="text">{{ formatCurrency(card.budget) }}</span>
              </v-card-text>
              <v-card-text>
                <span class="subtitle">Release Date :</span>
                <span class="text">{{
                  card.release_date.replace(/-/g, "/")
                }}</span>
              </v-card-text>
              <v-card-text>
                <v-icon class="mr-1 mb-1">mdi-star</v-icon>
                <span class="text">{{ card.vote_average }}</span>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text>
                <span class="subtitle">Sinopse : </span>
                <span class="text">{{ card.overview }}</span>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions class="">
            <v-col>
              <v-btn color="primary" variant="elevated" @click="goToTrailer()" block>Trailer</v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                variant="elevated"
                block
                @click="homepage(card.homepage)"
                >Page</v-btn
              >
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "InfoCard",

  data() {
    return {
      movieUrl: import.meta.env.VITE_API_MOVIE,
      ApiKey: import.meta.env.VITE_API_KEY,
      imageUrl: import.meta.env.VITE_IMG,
      card: [],
      genres: [],
      trailer: [],
    };
  },

  methods: {
    async getInfoCard() {
      try {
        const id = this.$route.params.id;
        const url = `${this.movieUrl}${id}?${this.ApiKey}`;

        const response = await axios.get(url);
        this.card = response.data;
        this.getCardGenres();
      } catch (error) {
        console.error(error);
      }
    },

    async getCardTrailer() {
      try {
        const id = this.$route.params.id;
        const url = `${this.movieUrl}${id}/videos?${this.ApiKey}`;

        const response = await axios.get(url);
        this.trailer = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },

    goToTrailer() {
      if (this.trailer != []) {
        const trailerKey = this.trailer[1].key;
        const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
        window.open(trailerUrl, "_blank");
      } else {
        alert("nenhum trailer disponivel");
      }
    },

    homepage(url) {
      window.location.href = `${url}`;
    },

    getCardGenres() {
      for (let i = 0; i < this.card.genres.length; i++) {
        this.genres[i] = this.card.genres[i].name;
      }
      return this.genres;
    },

    // async getCardImage() {
    //   try {
    //     const id = this.$route.params.id;
    //     const url = `${this.movieUrl}/${id}/images?${this.ApiKey}`;

    //     const response = await axios.get(url);
    //     this.image = response.data["backdrops"];
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    formatCurrency(number) {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },

  created() {
    this.getInfoCard();
    // this.getCardImage();
    this.getCardTrailer()
  },
};
</script>
<style>
.subtitle {
  font-size: 1rem;
  font-family: "Oswald";
}

.text {
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(233, 190, 253);
}
</style>