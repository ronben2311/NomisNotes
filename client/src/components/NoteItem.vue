<template>
  <span>note: {{ note.title }}</span>
  <q-card class="q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ note.title }}</div>
      <div class="text-subtitle2 text-grey-8 q-mb-sm" v-if="folderName">
        📁 {{ folderName }}
      </div>
      <div>{{ note.content }}</div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat icon="edit" color="primary" @click="editNote" />
      <q-btn flat icon="delete" color="negative" @click="deleteNote" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNoteStore } from "../stores/noteStore";
import { useFolderStore } from "../stores/folderStore";
import type { Note } from "../models/Note";

const props = defineProps<{ note: Note }>();

const noteStore = useNoteStore();
const { folders } = useFolderStore();

function editNote() {
  noteStore.editingNote = props.note;
  noteStore.noteDraft = {
    title: props.note.title,
    content: props.note.content,
    folderData: props.note.folderData,
  };
}

function deleteNote() {
  if (props.note.id) {
    noteStore.deleteNote(props.note.id);
  }
}

const folderName = computed(() => {
  return folders.find((f) => f.id === props.note.folderData)?.name || "";
});
</script>
