<template>
  <v-hover v-slot="{ isHoverig, props }">
    <v-card
      v-bind="props"
      :elevation="isHoverig ? 6: 24"
      height="400"
      :image="imageUrl + movie.poster_path"
      max-width="400"
      class="mx-auto"
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      "
      variant="text"
      @click="fazAlgo()"
    >
      <!-- <v-img
        class="align-end text-white"
        :src="imageUrl + movie.poster_path"
      >
      </v-img> -->
      <!-- <v-card-item  class="d-flex justify-start ml-0 pl-0" >
        <v-icon start icon="mdi-star" class="pb-1 pr-0">
        </v-icon>
        <span >
          {{ movie.vote_average }}
        </span>
      </v-card-item> -->
      <!-- <v-card-actios>
        <v-btn
          variant="outlined"
          rounded="lg"
          color="secondary"
          v-if="showLink"
          to="/movie/${movie.id}"
        >
          Details
        </v-btn>
      </v-card-actios> -->
    </v-card>
  </v-hover>
</template>
<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },


  data() {
    return {
      imageUrl: import.meta.env.VITE_IMG,
      showLink: true,

    };
  },

  methods: {},
};
</script>
<style>
</style>