<template>
  <q-card class="q-pa-md" style="max-width: 400px; margin: auto">
    <q-card-section>
      <div class="text-h6 text-center">🔐 Login to NomiNotes</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="email" label="Email" type="email" class="q-mb-md" />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        class="q-mb-md"
      />

      <q-btn
        label="Login / Signup"
        color="primary"
        @click="handleAuth"
        :loading="loading"
        class="full-width"
      />
      <q-btn
        label="Create account (test)"
        color="secondary"
        @click="handleSignup"
        :loading="loading"
        class="full-width q-mt-sm"
      />

      <div class="text-negative q-mt-sm" v-if="error">{{ error }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const authStore = useAuthStore();

async function handleAuth() {
  error.value = "";
  loading.value = true;

  try {
    const loginRes = await authStore.login(email.value, password.value);
    console.log("Login response:", loginRes);
    console.log("✅ Logged in successfully");
  } catch (e: any) {
    // Log full error object to inspect details
    console.error("⚠️ Login failed (full error):", e);
    console.error(
      "properties:",
      Object.getOwnPropertyNames(e),
      e.code,
      e.message,
      (e as any).customData
    );

    if (e.code === "auth/user-not-found") {
      try {
        await authStore.signup(email.value, password.value);
        console.log("✅ Signed up successfully");
      } catch (signupErr: any) {
        console.error("❌ Signup failed:", signupErr);
        error.value = signupErr.message || String(signupErr);
      }
    } else {
      error.value = e.message || String(e);
    }
  } finally {
    loading.value = false;
  }
}

async function handleSignup() {
  error.value = "";
  loading.value = true;
  try {
    await authStore.signup(email.value, password.value);
    console.log("✅ Signed up successfully");
  } catch (e: any) {
    console.error("Signup failed:", e);
    error.value = e.message || String(e);
  } finally {
    loading.value = false;
  }
}
</script>
