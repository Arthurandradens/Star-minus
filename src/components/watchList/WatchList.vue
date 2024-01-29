<template>
  <v-container fluid>
    <h1>Whatchlist</h1>
    <br />
    <h4 class="mb-2">My Movies and Series</h4>

    <!-- <v-row >
      <v-col
        v-for="(card, indice) in list"
        :key="indice"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="400"
            max-width="400"
            :image="card.url"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: column;;
              justify-content: space-between;
            "
            @click="moveToCard(card.movie_id,card.type)"
          >
          <v-card-actions class="justify-end" >
            <v-btn @click="alo()" color="error" icon> <v-icon>mdi-delete</v-icon></v-btn>
          </v-card-actions>
            <v-card-title v-if="!card.url" class="mx-auto title align-center"
              >Imagem <br />
              Não <br />
              Disponível</v-card-title
            >
          </v-card>
        </v-hover>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col
        v-for="(card, indice) in list"
        :key="indice"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="400"
            :image="card.url"
            max-width="400"
            class="mx-auto"
            @click="moveToCard(card.movie_id, card.type)"
          >
            <v-card-title v-if="!card.url" class="mx-auto title align-center"
              >Imagem <br />
              Não <br />
              Disponível</v-card-title
            >
          </v-card>
          <v-btn block @click="deleteCard(card.id)" color="error">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
    };
  },

  methods: {
    async getWatchList() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/watchlist");
        this.list = response.data.results;
        console.log(this.list);
      } catch (error) {
        console.log(error);
      }
    },

   async deleteCard(id) {
      try {
       await axios.delete(`http://127.0.0.1:8000/api/destroy/${id}`);
        this.getWatchList();
      } catch (error) {
        console.error(error);
      }
    },

    moveToCard(id, type) {
      this.$router.push({
        path: `/card/${id}`,
        query: {
          type: type,
          value: this.query,
          thisPath: window.location.pathname,
        },
      });
    },
  },

  created() {
    this.getWatchList();
  },
};
</script>

<style>
</style>