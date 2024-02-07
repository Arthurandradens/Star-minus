<template>
  <v-container fluid class="d-flex justify-center">
    <v-app>
      <div class="">
      <img
        class="justify-center"
        src="@/assets/Star-minus-logo.png"
        alt="STAR MINUS LOGO"
      />
    </div>
        <router-view></router-view>
    </v-app>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
body {
  background-color: #271f44;
}
</style>
