<template>
  <q-select
    v-model="noteStore.selectedFolderId"
    :options="folderOptions"
    option-label="name"
    option-value="id"
    label="Filter by Folder"
    clearable
    class="q-mb-md"
    style="max-width: 300px"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNoteStore } from "../stores/noteStore";
import { useFolderStore } from "../stores/folderStore";

const { folders } = useFolderStore();
const noteStore = useNoteStore();

// computed folder options including "All Folders"
const folderOptions = computed(() => [
  { id: "", name: "All Folders" },
  ...(folders ?? []),
]);
</script>
