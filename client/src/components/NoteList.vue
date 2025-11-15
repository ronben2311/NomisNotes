<template>
  <div>
    <NoteItem v-for="note in noteStore.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "../stores/noteStore";
import NoteItem from "./NoteItem.vue";

const noteStore = useNoteStore();
</script>
