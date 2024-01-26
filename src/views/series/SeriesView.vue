<template>
  <v-container fluid>
    <v-checkbox-btn v-model="custom" label="Filter"> </v-checkbox-btn>

    <v-combobox
      v-model="filterGenre"
      v-if="custom"
      v-model:search="search"
      :hide-no-data="false"
      :items="genresName"
      hide-selected
      multiple
      persistent-hint
      chips
      closable-chips
      color="secondary"
      variant="solo-filled"
    >
    <!-- <template v-slot:item="{ index, item }">
      <v-chip :key="index" color="primary" variant="outlined" label>
        {{ item.title }}
        <v-icon @click.stop="removeChip(index)">mdi-close</v-icon>
      </v-chip>
    </template> -->

      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            No results matching "<strong>{{ search }}</strong
            >". Press <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-combobox>

    <v-row justify="center">
      <v-col
        v-for="(card, indice) in filteredSeries"
        :key="indice"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <v-hover v-slot="{ isHoverig, props }">
          <v-card
          v-if="card.poster_path"
            v-bind="props"
            :elevation="isHoverig ? 6 : 24"
            height="400"
            max-width="400"
            class="mx-auto"
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
            variant="text"
            :image="imageUrl + card.poster_path"
            @click="moveToCard(card.id)"
            >
            <v-card-title v-if="!card.poster_path" class="mx-auto title align-center"
              >Imagem <br />
              Não <br />
              Disponível</v-card-title
              >
            <!-- <v-img
              v-if="card.poster_path"
              :src="imageUrl + card.poster_path"
            ></v-img> -->
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import Card from "@/components/card/Card.vue";
import axios from "axios";
export default {
  name: "SeriesView",

  components: {
    Card,
  },
  data() {
    return {
      search: null,
      series: [],
      genres: [],
      genresName: [],
      genresId: [],
      filterGenre: [],
      custom: false,
      apiKey: import.meta.env.VITE_API_KEY,
      apiUrl: import.meta.env.VITE_API_URL,
      imageUrl: import.meta.env.VITE_IMG,
    };
  },
  watch: {
    filterGenre(val) {
      if (val.length > this.genresName.length) {
        this.$nextTick(() => this.filterGenre.pop());
        // this.getID()
      }
      // console.log(this.filterGenre);
      this.getID(this.filterGenre)
    },
  },

  computed: {
      // filteredSeries() {
      //   if (this.filterGenre.length === 0) {
      //     return this.series
      //   }
      //   else{
      //     const series = []
      //     const newMovies = []

      //     for (let i = 0; i < this.filterGenre.length; i++) {
      //       for (let j = 0; j < this.genres.length; j++) {
      //         if (this.genresId[i] === this.genres[j].id) {
      //           series.push(this.genres[j].id)
      //         }
      //       }
      //     }
      //     if (series.length != 0) {
      //       for (let i = 0; i < this.series.length; i++) {
      //         if (this.series[i].genre_ids.length != 0) {
      //           for (let j = 0; j < this.series[i].genre_ids.length; j++) {
      //            for (let k = 0; k < series.length; k++) {
      //             if (this.series[i].genre_ids[j] === series[k]) {
      //               newMovies.push(this.series[i])
      //             }
      //            }
      //           }
      //         }
      //       }
      //     }
      //     return newMovies
      //   }
    // }
    filteredSeries() {
    if (this.filterGenre.length === 0) {
      return this.series;
    } else {
      const selectedGenreIds = this.genres
        .filter(genre => this.filterGenre.includes(genre.name))
        .map(genre => genre.id);

      const newMovies = this.series.filter(movie => {
        const intersection = movie.genre_ids.filter(id =>
          selectedGenreIds.includes(id)
        );
        return intersection.length > 0;
      });

      return newMovies;
    }
  },
  },

  methods: {
    async getMovies() {
      try {
        const url = `${this.apiUrl}trending/tv/week?${this.apiKey}&page=1`;
        const url2 = `${this.apiUrl}trending/tv/week?${this.apiKey}&page=2`;
        const url3 = `${this.apiUrl}trending/tv/week?${this.apiKey}&page=3`;
        const url4 = `${this.apiUrl}trending/tv/week?${this.apiKey}&page=4`;
        const url5 = `${this.apiUrl}trending/tv/week?${this.apiKey}&page=5`;

        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        const response3 = await axios.get(url3);
        const response4 = await axios.get(url4);
        const response5 = await axios.get(url5);

        const list2 = response2.data.results;
        const list3 = response3.data.results;
        const list4 = response4.data.results;
        const list5 = response5.data.results;

        this.series = response.data.results.concat(list2, list3, list4, list5);
      } catch (error) {
        console.error(error);
      }
    },

    async getGenre() {
      const movieUrl = `https://api.themoviedb.org/3/genre/tv/list?${this.apiKey}`;
      const response = await axios.get(movieUrl);

      const genres = response.data.genres;
      for (let i = 0; i < genres.length; i++) {
        this.genresName.push(genres[i].name);
        // this.genresId.push(genres[i].id)
      }
      this.genres = response.data.genres;
    },

    getID(name) {
      const uniqueIds = new Set(this.genresId)

      for (let i = 0; i < this.genres.length; i++) {
        for (let j = 0; j < name.length; j++) {
          if (this.genres[i].name === name[j]) {
            // this.genresId.push(this.genres[i].id);
            uniqueIds.add(this.genres[i].id)
          }
        }
      }
      this.genresId = Array.from(uniqueIds)
    },

    moveToCard(id) {
      this.$router.push({
        path: `/card/${id}`,
        query: {
          type: "series",
          value: this.query,
          thisPath: window.location.pathname,
        },
      });
    },
  },

  created() {
    this.getGenre();
    this.getMovies();
  },
};
</script>
