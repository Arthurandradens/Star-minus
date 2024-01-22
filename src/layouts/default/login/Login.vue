<template>
  <v-container fluid>
    <v-card
      class="mx-auto px-6 py-8 card"
      max-width="344"
      title="Create a Session"
    >
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

export default {
  data() {
    return {
      ApiKey: import.meta.env.VITE_API_KEY,
      form: false,
      email: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      if (!this.form) return;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmU0MDY5ZGMzOTMzMGRiNTc0ZGQ1ZTM3NzM3M2IwMCIsInN1YiI6IjY1OTZiNDc3MGU2NGFmMjk1NThjMWJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oocwUEuplHO10hAehfgFvB7Koyl2Xe5cbuxTYpHh1Bk",
        },
      };

      fetch("https://api.themoviedb.org/3/authentication/token/new", options)
        .then((response) => response.json())
        .then((response) => this.moveToHome(response.request_token))
        .catch((err) => console.error(err));

      setTimeout(() => (this.loading = false), 2000);
    },

    async moveToHome(token) {
      const response = await axios.get(`https://www.themoviedb.org/authenticate/${token}`)
    },

    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<style>
body {
  background-color: #0e0b13;
}

.card {
  margin-top: 12rem;
}
</style>
