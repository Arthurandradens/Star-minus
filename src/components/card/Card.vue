<template>
  <v-hover v-slot="{ isHoverig, props }">
    <v-card
      v-bind="props"
      :elevation="isHoverig ? 6 : 24"
      height="400"
      :image="imageUrl + card.poster_path"
      max-width="400"
      class="mx-auto"
      style="display: flex; flex-direction: row; justify-content: space-between"
      variant="text"
      @click="fazAlgo()"
    >
    </v-card>
  </v-hover>
</template>
<script>
export default {
  props: {
    card: {
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