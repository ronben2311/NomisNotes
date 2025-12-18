<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 🧭 Left Drawer with Folders -->
    <q-drawer v-model="drawerOpen" show-if-above side="left" bordered>
      <q-list padding class="text-subtitle1">
        <q-item
          clickable
          @click="selectFolder(null)"
          :active="!selectedFolderId"
        >
          <q-item-section avatar><q-icon name="notes" /></q-item-section>
          <q-item-section> Main </q-item-section>
        </q-item>
        <span>folders</span>
        <q-item
          v-for="folder in folders"
          :key="folder.id"
          clickable
          :active="selectedFolderId === folder.id"
          @click="selectFolder(folder.id!)"
        >
          <q-item-section avatar><q-icon name="folder" /></q-item-section>
          <q-item-section>{{ folder.name }}</q-item-section>
        </q-item>

        <!-- ➕ Add Folder -->
        <q-separator spaced />
        <q-item clickable @click="promptNewFolder">
          <q-item-section avatar><q-icon name="add" /></q-item-section>
          <q-item-section>Add Folder</q-item-section>
        </q-item>

        <!-- 🌙 Dark Mode Toggle -->
        <q-item tag="label" class="q-mt-md">
          <q-item-section>
            <q-toggle
              v-model="isDark"
              label="Dark Mode"
              @update:model-value="toggleDark"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- 🔼 Top Bar -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense icon="menu" @click="drawerOpen = !drawerOpen" />
        <q-toolbar-title>NomiNotes</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- 📄 Main Notes View -->
    <q-page-container>
      <q-page class="q-pa-md">
        <note-list />
      </q-page>
    </q-page-container>

    <!-- ➕ FAB: Add New Note -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" @click="newNote" />
    </q-page-sticky>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar, Dark } from "quasar";
import { useNoteStore } from "../stores/noteStore";
import { useFolderStore } from "../stores/folderStore";
import NoteList from "./NoteList.vue";

const $q = useQuasar();
const drawerOpen = ref(false);

// 🌙 Dark mode toggle
const isDark = ref(Dark.isActive);
function toggleDark(val: boolean) {
  Dark.set(val);
  localStorage.setItem("nomisnotes-theme", val ? "dark" : "light");
  Dark.set(val);
}
if (localStorage.getItem("nomisnotes-theme") === "dark") {
  Dark.set(true);
  isDark.value = true;
}

// 📁 Folder management
const folderStore = useFolderStore();
const { folders, fetchFolders, addFolder } = folderStore;

// 📝 Notes
const noteStore = useNoteStore();
const { fetchNotes, resetNoteDraft, setFolderFilter, addNote } = noteStore;
const selectedFolderId = ref<string | null>(null);

// 📌 Select folder
function selectFolder(folderId: string | null) {
  selectedFolderId.value = folderId;
  setFolderFilter(folderId);
}

// ➕ Prompt new folder
async function promptNewFolder() {
  $q.dialog({
    title: "New Folder",
    prompt: {
      model: "",
      type: "text",
    },
    cancel: true,
    persistent: true,
  }).onOk(async (name: string) => {
    const newId = await addFolder(name);
    selectFolder(newId);
  });
}

// 🆕 Add new note
function newNote() {
  resetNoteDraft();
  addNote(); // Adds to selected folder or null (Main)
}

// 📥 Init
onMounted(async () => {
  await fetchFolders();
  await fetchNotes();

  const savedTheme = localStorage.getItem("nomisnotes-theme");
  if (savedTheme === "dark") toggleDark(true);

  selectFolder(null); // default to Main
});
</script>
