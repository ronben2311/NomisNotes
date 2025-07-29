<template>
  <div class="q-pa-md width-[600px]">
    <h2>NomisNotes</h2>
    <q-toggle
      v-model="isDark"
      label="Dark Mode"
      color="primary"
      @update:model-value="toggleDark"
      class="q-mb-lg"
    />

    <q-input
      v-model="newFolderName"
      label="New Folder Name"
      dense
      outlined
      class="q-mb-sm"
      style="max-width: 300px"
    />

    <q-btn
      label="Add Folder"
      color="secondary"
      @click="createFolder"
      class="q-mb-lg"
    />

    <q-select
      v-model="selectedFolderId"
      :options="[{ id: '', name: 'All Folders' }, ...folders]"
      option-label="name"
      option-value="id"
      label="Filter by Folder"
      class="q-mb-lg"
      style="max-width: 300px"
    />

    <q-select
      v-model="form.folderData"
      :options="folders"
      option-label="name"
      option-value="id"
      label="Folder"
      class="q-mb-sm"
      style="max-width: 300px"
    />

    <q-input v-model="form.title" label="Title" class="q-mb-sm" />
    <q-input
      v-model="form.content"
      label="Content"
      type="textarea"
      class="q-mb-sm"
    />

    <q-btn color="primary" label="Save" @click="saveNote" class="q-mb-lg" />

    <div
      v-for="note in filteredNotes"
      :key="note.id"
      class="q-pa-sm bg-grey-2 q-mb-sm rounded-borders"
    >
      <div>folder is : {{ note.folderData }}</div>
      <div class="text-h6">{{ note.title }}</div>
      <div>{{ note.content }}</div>
      <q-btn flat label="Edit" color="primary" @click="editNote(note)" />
      <q-btn
        flat
        label="Delete"
        color="negative"
        @click="deleteNote(note.id!)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Dark } from "quasar";

import { useNotes } from "../composables/useNotes";
import { useFolders } from "../composables/useFolders";
import type { Note } from "../models/Note";

const isDark = ref(Dark.isActive);
if (localStorage.getItem("nomisnotes-theme") === "dark") {
  Dark.set(true);
  isDark.value = true;
}
function toggleDark(val: boolean) {
  Dark.set(val);
  localStorage.setItem("nomisnotes-theme", val ? "dark" : "light");
}
//--folders
const { folders, addFolder } = useFolders();
const selectedFolderId = ref<string>("");

const newFolderName = ref("");

function createFolder() {
  if (!newFolderName.value.trim()) return;
  addFolder(newFolderName.value.trim());
  newFolderName.value = "";
}

//--notes
const { notes, addNote, updateNote, deleteNote } = useNotes();
const editingNote = ref<Note | null>(null);
const form = ref<{ title: string; content: string; folderData?: string }>({
  title: "",
  content: "",
  folderData: "",
});

const filteredNotes = computed(() =>
  selectedFolderId.value
    ? notes.value.filter((note) => note.folderData === selectedFolderId.value)
    : notes.value
);

function saveNote() {
  if (editingNote.value && editingNote.value.id) {
    updateNote(editingNote.value.id, form.value);
  } else {
    addNote(form.value.title, form.value.content, form.value.folderData);
  }
  editingNote.value = null;
  form.value = { title: "", content: "", folderData: "" };
}

function editNote(note: Note) {
  editingNote.value = note;
  form.value = {
    title: note.title,
    content: note.content,
    folderData: note.folderData || "",
  };
}
</script>
