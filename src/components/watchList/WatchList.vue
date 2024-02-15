<template>
  <v-container fluid @click="resetEdit()">
    <v-row class="d-flex justify-start">
      <v-col>
        <v-alert
          v-if="type"
          class="animate__animated animate__backInLeft"
          v-show="alert"
          variant="tonal"
          :type="type"
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
          @click.stop
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
            :image="card.attributes.url"
            max-width="400"
            class="mx-auto"
            :class="{ ativaEdit: dialog }"
            attributes.
            @click="moveToCard(card.attributes.movie_id, card.attributes.type)"
          >
            <v-card-title
              class="mx-auto title align-center"
              v-if="!card.attributes.url"
              >Image <br />
              Not <br />
              available</v-card-title
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
import api from "@/api";
export default {
  name: "watchlist",
  data() {
    return {
      list: [],
      selected: [],
      type: "",
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
        const response = await api.get(`watchlist`, {
          headers: {
            Authorization:
              "Bearer 5|T4qlLLl8Zcqq53NCLjieekcuuHRimSFnDUHxHeZ1ddf02443",
          },
        });
        (this.list = response.data.results), console.log(this.list);
        // .then((response) =>

        //     console.log(response)
        // );
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCard(id) {
      try {
        await api
          .delete(`destroy`, {
            data: { id },
          })
          .then((response) => {
            this.alert = true;
            this.type = response.data.type;
            this.message = response.data.message;
            this.selected = [];
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

    resetEdit() {
      this.dialog = false;
      this.selected = [];
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