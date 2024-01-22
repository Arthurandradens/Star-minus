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

      setTimeout(() => (this.loading = false), 2000);
    },

    async moveToHome(token) {
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
