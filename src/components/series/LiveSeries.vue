<template>
  <p class="title-poster">On the air</p>
  <v-carousel
    v-model="seriesPage"
    hideDelimiters
    hide-delimiter-background
  >
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
            height="500px"
            :image="imageUrl + series.poster_path"
            max-width="350"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
            variant="text"
            @click="moveToCard(series.id,'series')"
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
  name: "LiveSeries",

  components: {},

  computed: {
    paginateCard() {
      const startIndex = (this.seriesPage - 1) * 4;
      const endIndex = startIndex + 4;

      return this.liveSeries.slice(startIndex, endIndex);
    },
    seriesCarousel() {
      return this.liveSeries.length / 4 - 1;
    },
  },

  data() {
    return {
      seriesURL: import.meta.env.VITE_API_SERIES,
      imageUrl: import.meta.env.VITE_IMG,
      ApiKey: import.meta.env.VITE_API_KEY,
      liveSeries: [],
      seriesPage: 1,
    };
  },

  methods: {
    async getLiveSeries() {
      try {
        const url = `${this.seriesURL}on_the_air?${this.ApiKey}`;

        const response = await axios.get(url);
        this.liveSeries = response.data.results;
        return this.liveSeries;
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

    moveToCard(id,type) {
      this.$router.push({path:`/card/${id}`, query: {type: type}})
    }
  },
  created() {
    this.getLiveSeries();
  },
};
</script>
