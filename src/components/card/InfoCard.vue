<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          v-if="image != ''"
          height="700"
          width=""
          class="mx-auto"
          :image="imageUrl + image[1].file_path"
          text
        >
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mx-auto" height="500">
          <v-card-title>
            {{ card.title }}
          </v-card-title>
          <v-separator></v-separator>
          <v-btn @click="" variant="outlined">
            Trailer
          </v-btn>
        </v-card>
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
      image: []
    };
  },

  methods: {
    async getInfoCard() {
      try {
        const id = this.$route.params.id;
        const url = `${this.movieUrl}${id}?${this.ApiKey}`;

        const response = await axios.get(url);
        this.card = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getCardImage() {
      try {
        const id = this.$route.params.id;
        const url = `${this.movieUrl}/${id}/images?${this.ApiKey}`;

        const response = await axios.get(url);
        this.image = response.data['backdrops'];
        console.log(this.image);
      } catch (error) {
        console.error(error);
      }
    },

    formatCurrency(number) {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },

  created() {
    this.getInfoCard();
    this.getCardImage()
  },
};
</script>
<style>
</style>