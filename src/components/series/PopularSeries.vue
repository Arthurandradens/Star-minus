<template>
  <p class="title">Popular Series</p>
  <v-carousel v-model="seriesPage" hideDelimiters hide-delimiter-background height="200" >
    <template v-slot:prev>
      <v-btn icon @click="prevSlide()">
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
    </template>
    <v-row justify="center">
      <v-col v-for="(series, indice) in paginateCard" :key="indice">
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="180"
            :image="imageUrl + series.backdrop_path"
            max-width="400"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
            variant="text"
            @click="moveToCard(series.id)"
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
  name: "PopularSeries",

  components: {},

  computed: {
    paginateCard() {
      const startIndex = (this.seriesPage - 1) * 4;
      const endIndex = startIndex + 4;

      return this.popularSeries.slice(startIndex, endIndex);
    },
    seriesCarousel() {
      return this.popularSeries.length / 4 - 1;
    },
  },

  data() {
    return {
      seriesURL: import.meta.env.VITE_API_SERIES,
      imageUrl: import.meta.env.VITE_IMG,
      ApiKey: import.meta.env.VITE_API_KEY,
      popularSeries: [],
      seriesPage: 1,
    };
  },

  methods: {
    async getPopularSeries() {
      try {
        const url = `${this.seriesURL}popular?${this.ApiKey}`;

        const response = await axios.get(url);
        this.popularSeries = response.data.results;
        return this.popularSeries;
      } catch (error) {
        console.error(error);
      }
    },

    nextSlide() {
      if (this.seriesPage > this.seriesCarousel) {
        this.seriesPage = 0;
      }
      return this.seriesPage++;
    },

    prevSlide() {
      if (this.seriesPage == 1) {
        this.seriesPage = this.seriesCarousel + 2;
      }
      return this.seriesPage--;
    },

    moveToCard(id) {
      this.$router.push(`/card/${id}`)
    }
  },
  created() {
    this.getPopularSeries();
  },
};
</script>
