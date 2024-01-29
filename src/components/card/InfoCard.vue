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
        <v-col class="d-flex align-center justify-space-between">
          <v-card-title v-if="type === 'movie'" class="title ml-1 mb-2">{{
            card.title
          }}</v-card-title>
          <v-card-title v-if="type === 'series'" class="title ml-1 mb-2">{{
            card.name
          }}</v-card-title>

          <v-btn color="primary" @click="addToWatchList(card.title,card.poster_path,type,card.id)" :icon="checkListStatus"></v-btn>
        </v-col>


          <v-row>
            <v-col>
              <v-card-text v-if="card.spoken_languages[0]">
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
              <v-card-text v-if="type === 'movie'">
                <span class="subtitle">Time : </span>
                <span class="text">{{ getTime(card.runtime) }}</span>
              </v-card-text>
              <v-card-text v-if="type === 'series'">
                <span class="subtitle">Seasons : </span>
                <span class="text">{{ card.number_of_seasons }}</span>
              </v-card-text>
              <v-card-text v-if="type === 'series'">
                <span class="subtitle">Episodes : </span>
                <span class="text">{{ card.number_of_episodes }}</span>
              </v-card-text>
              <v-card-text v-if="type === 'series'">
                <span class="subtitle">Release Date : </span>
                <span class="text">{{
                  card.first_air_date.replace(/-/g, "/")
                }}</span>
              </v-card-text>
              <v-card-text v-if="type === 'movie'">
                <span class="subtitle">Budget : </span>
                <span class="text">{{ formatCurrency(card.budget) }}</span>
              </v-card-text>
              <v-card-text v-if="type === 'movie'">
                <span class="subtitle">Release Date :</span>
                <span class="text">{{
                  card.release_date.replace(/-/g, "/")
                }}</span>
              </v-card-text>
              <v-card-text>
                <v-icon class="mr-1 mb-1">mdi-star</v-icon>
                <span class="text">{{ card.vote_average.toFixed(1) }}</span>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text>
                <span class="subtitle">Sinopse : </span>
                <span class="text">{{ card.overview }}</span>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions class="d-flex align-center justify-end">
            <v-row>
              <v-col>
                <v-btn
                  color="primary"
                  variant="elevated"
                  block
                  prepend-icon="mdi-arrow-left"
                  @click="backPage()"
                  >Back</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  color="primary"
                  variant="elevated"
                  @click="goToTrailer()"
                  block
                  >Trailer</v-btn
                >
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
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog">
        <v-card class="mx-auto" variant="text">
          <iframe
            width="560"
            height="315"
            :src="trailerUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </v-card>
      </v-dialog>
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
      seriesURL: import.meta.env.VITE_API_SERIES,
      ApiKey: import.meta.env.VITE_API_KEY,
      imageUrl: import.meta.env.VITE_IMG,
      card: [],
      genres: [],
      trailer: [],
      trailerUrl: "",
      dialog: false,
      listIcon:false,
      id: this.$route.params.id,
      type: this.$route.query.type,
      path: this.$route.query.thisPath,
      query: this.$route.query.value,
      message: null
    };
  },

  computed: {
    checkListStatus() {
      if (this.listIcon) {
        return "mdi-check"
      }
      return "mdi-plus"
    }
  },

  methods: {
    async getInfoCard() {
      try {
        if (this.type === "movie") {
          const url = `${this.movieUrl}${this.id}?${this.ApiKey}`;
          const response = await axios.get(url);
          this.card = response.data;
          this.getCardGenres();
          this.getCardTrailer();
        } else if (this.type === "series") {
          const url = `${this.seriesURL}${this.id}?${this.ApiKey}`;
          const response = await axios.get(url);
          this.card = response.data;
          this.getCardGenres();
          this.getCardTrailer();
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getCardTrailer() {
      try {
        if (this.type === "movie") {
          const url = `${this.movieUrl}${this.id}/videos?${this.ApiKey}`;
          const response = await axios.get(url);
          this.trailer = response.data.results;
        } else if (this.type === "series") {
          const url = `${this.seriesURL}${this.id}/videos?${this.ApiKey}`;
          const response = await axios.get(url);
          this.trailer = response.data.results;
        }
      } catch (error) {
        console.error(error);
      }
    },

    goToTrailer() {
      if (this.trailer != "") {
        this.dialog = true;
        for (let i = 0; i < this.trailer.length; i++) {
          if (this.trailer[i].type === "Trailer") {
            const trailerKey = this.trailer[i].key;

            // const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
            return (this.trailerUrl = `https://www.youtube.com/embed/${trailerKey}`);
            // return window.open(trailerUrl, "_blank");
          }
        }
      } else {
        alert("nenhum trailer disponivel");
      }
    },

    addToWatchList(name,url,type,id) {
      const fullUrl = this.imageUrl + url

      const poster = {
        "name": name,
        "url": fullUrl,
        "type": type,
        "movie_id": id
      }
      try {
        axios.post("http://127.0.0.1:8000/api/add", poster)
          .then((response) => {
            this.message = response.data

            this.listIcon = true
            console.log(this.message.message)
        })

      } catch (error) {
        console.error(error)
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

    getTime(time) {
      const hour = Math.trunc(time / 60);
      const minute = time % 60;

      return `${hour}H ${minute}min`;
    },

    backPage() {
      if (this.path === "/search") {
        this.$router.push({ path: this.path, query: { value: this.query } });
      } else {
        window.history.back();
      }
    },
  },

  created() {
    this.getInfoCard();
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