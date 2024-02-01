<template>
  <v-container fluid>
    <v-row class="d-flex justify-start">
      <v-col>
          <v-alert
          class="animate__animated animate__backInLeft"
          v-show="alert"
          variant="tonal"
          type="success"
          :title="message"
        ></v-alert>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between align-items-center">
      <h1>Whatchlist</h1>
      <div>
        <v-btn
          v-if="dialog"
          class="mr-3"
          size="35px"
          icon
          @click="deleteCard(selected)"
          color="error"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-menu
          location="bottom start"
          origin="overlap"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-dots-vertical"
              density="comfortable"
              variant="tonal"
            ></v-btn>
          </template>

          <v-list>
            <v-list-item title="edit" @click="edit()"></v-list-item>
            <v-list-item title="Select all" @click="selectAll()"></v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <br />
    <h4 class="mb-2">My Movies and Series</h4>
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

            :class="{ ativaEdit: dialog }"
            @click="moveToCard(card.movie_id, card.type)"
          >
            <v-card-title v-if="!card.url" class="mx-auto title align-center"
              >Imagem <br />
              Não <br />
              Disponível</v-card-title
            >
            <v-card-actions class="justify-end">
              <v-checkbox
                v-if="dialog"
                v-model="selected"
                :value="card.id"
                @click.stop
              ></v-checkbox>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "watchlist",
  data() {
    return {
      list: [],
      selected: [],
      dialog: false,
      alert: false,
      message: "",
      transparent: "rgba(255, 255, 255, 0)",
    };
  },

  watch: {
    alert: function (newAlertValue) {
      if (newAlertValue) {
        // Se alert for true, configure um timeout para escondê-lo após 5 segundos
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    },
  },

  methods: {
    async getWatchList() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/watchlist");
        this.list = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCard(ids) {
      try {
        await axios
          .delete(`http://127.0.0.1:8000/api/destroy/`, {
            data: { ids },
          })
          .then((response) => {
            this.alert = true
            this.message = response.data.message;
            console.log(response.data)
          });
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

    edit() {
      this.dialog = !this.dialog;
    },

    selectAll() {
      if (this.selected.length === this.list.length) {
        this.selected = [];
        this.dialog = false;
      } else {
        this.dialog = true;
        this.selected = this.list.map((item) => item.id);
      }
    },
    // editOn(index) {
    //   this.$set(this.list, index, { ...this.list[index], isEditing: true });
    // },
    // editOff(index) {
    //   this.$set(this.list, index, { ...this.list[index], isEditing: false });
    // },
  },

  created() {
    this.getWatchList();
  },
};
</script>

<style scoped>
.ativaEdit {
  opacity: 0.6 !important;
}
</style>