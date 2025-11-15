<script setup lang="ts">
import { useAuthStore } from "./stores/authStore";
import { storeToRefs } from "pinia";
import AuthForm from "./components/AuthForm.vue";
import MainNotesView from "./components/MainNotesView.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

async function handleLogout() {
  try {
    await authStore.logout();
    console.log("Logged out");
  } catch (e: any) {
    console.error("Logout failed:", e);
  }
}
</script>
<template>
  <div>
    <div
      v-if="user"
      class="app-header q-pa-sm row items-center justify-between"
    >
      <div>Signed in as: {{ user.email || "..." }}</div>
      <q-btn label="Logout" color="negative" @click="handleLogout" />
    </div>

    <AuthForm v-if="!user" />
    <MainNotesView v-else />
  </div>
</template>
