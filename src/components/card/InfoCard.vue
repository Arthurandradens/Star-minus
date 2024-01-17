<template>
<v-container fluid>
  <v-card :image="imageUrl + card.poster_path">
    <v-card-text>
    {{ card.title }}
    </v-card-text>
  </v-card>
</v-container>
</template>
<script>
import axios from 'axios';
export default {
  name: "InfoCard",

  data() {
    return {
      movieUrl: import.meta.env.VITE_API_MOVIE,
      ApiKey: import.meta.env.VITE_API_KEY,
      imageUrl: import.meta.env.VITE_IMG,
      card: []
    };
  },

  methods: {

    async getInfoCard() {
      try {
        const id = this.$route.params.id
        const url = `${this.movieUrl}${id}?${this.ApiKey}`

        const response = await axios.get(url)
        this.card = response.data
        console.log(this.card)
      } catch (error) {
        console.error(error)
      }
    },

    formatCurrency(number) {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    }
  },

  created() {
    this.getInfoCard()
  }
};
</script>
<style>
</style>