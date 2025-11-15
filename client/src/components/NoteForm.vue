<template>
  <div>
    <!-- Folder Selector -->
    <q-select
      v-model="noteDraft.folderData"
      :options="folders"
      option-label="name"
      option-value="id"
      label="Folder"
      class="q-mb-sm"
      style="max-width: 300px"
    />

    <!-- Title Input -->
    <q-input v-model="noteDraft.title" label="Title" class="q-mb-sm" />

    <!-- Content Input -->
    <q-input
      v-model="noteDraft.content"
      label="Content"
      type="textarea"
      class="q-mb-sm"
    />

    <!-- Save Button -->
    <q-btn color="primary" label="Save" @click="save" class="q-mb-lg" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore";
import { useFolderStore } from "../stores/folderStore";

// Notes store
const noteStore = useNoteStore();
const { noteDraft, editingNote } = storeToRefs(noteStore);
const { addNote, updateNote, resetNoteDraft } = noteStore;

// Folder store
const folderStore = useFolderStore();
const { folders } = storeToRefs(folderStore);

// Save handler
function save() {
  if (editingNote.value && editingNote.value.id) {
    updateNote(editingNote.value.id);
  } else {
    addNote();
  }

  resetNoteDraft();
}
</script>
