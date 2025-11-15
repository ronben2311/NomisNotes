<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto">
    <h2>📝 NomiNotes</h2>

    <ThemeToggle class="q-mb-lg" />

    <FolderForm class="q-mb-md" />
    <FolderSelect class="q-mb-md" />

    <NoteForm class="q-mb-lg" />

    <NoteList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNoteStore } from "../stores/noteStore";
import { useFolderStore } from "../stores/folderStore";

// import ThemeToggle from "../components/ThemeToggle.vue";
// import FolderForm from "../components/FolderForm.vue";
import FolderSelect from "../components/FolderSelect.vue";
import NoteForm from "../components/NoteForm.vue";
import NoteList from "../components/NoteList.vue";

const noteStore = useNoteStore();
const foldersStore = useFolderStore();

onMounted(() => {
  noteStore.fetchNotes();
  foldersStore.fetchFolders();
});
</script>
