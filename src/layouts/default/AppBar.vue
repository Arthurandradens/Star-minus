<template>
  <div>
    <!-- <v-navigation-drawer v-model="showMenu" app>
      <v-list>
        <v-list-item
          v-for="(item, indice) in items"
          :key="indice"
          :prepend-icon="item.icon"
          :to="item.actions"
        >
          {{ item.text }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar flat class="border-b" color="#07060A" app>
      <!-- <v-app-bar-nav-icon ></v-app-bar-nav-icon> -->
      <v-toolbar-title>
        <v-btn
          v-for="(item, indice) in items"
          :key="indice"
          :prepend-icon="item.icon"
          @click="item.actions"
          class="ml-5"
        >
          <!-- <v-icon>{{ item.icon }}</v-icon> -->
          {{ item.text }}
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        :loading="isLoading"
        density="compact"
        append-inner-icon="mdi-magnify"
        label="search"
        variant="solo"
        class="border mr-3"
        single-line
        hide-details
        @click:append-inner="searchMovies()"
        v-model="setSearch"
        v-if="showSearchBar"
      >
      </v-text-field>
    </v-app-bar>
  </div>
</template>

<script >
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      route: useRoute(),
      isLoading: false,
      search: "",
      setSearch: "",
      showMenu: false,
      showSearchBar: false,
      items: [
        { text: "Home", icon: "mdi-home", actions: this.moveToHome },
        { text: "Search", icon: "mdi-magnify", actions: this.moveToSearch },
        { text: "WATCHLIST", icon: "mdi-plus", actions: this.moveToWatchList },
        { text: "Movies", icon: "mdi-movie-roll", actions: "/" },
        { text: "Series", icon: "mdi-television-classic", actions: "/" },
      ],
    };
  },

  methods: {
    searchMovies() {
      this.isLoading = true;

      this.$router.push(`/search/${this.setSearch}`);
      // this.setSearch = "";
    },

    moveToHome() {
      this.$router.push(`/home`);
    },

    moveToSearch() {
      this.$router.push(`/search`);
    },

    moveToWatchList() {
      this.$router.push(`/watchlist`);
    },
  },

  created() {},
};
</script>
