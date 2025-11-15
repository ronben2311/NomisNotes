import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Note } from "../models/Note";

type NoteDraft = Pick<Note, "title" | "content"> & { folderData?: string };

export const useNoteStore = defineStore("note", () => {
  // draft state for creating/editing notes
  const noteDraft = ref<NoteDraft>({
    title: "",
    content: "",
    folderData: "",
  });

  // Currently edited note
  const editingNote = ref<Note | null>(null);
  const selectedFolderId = ref<string | null>(null);

  // All notes
  const notes = ref<Note[]>([]);

  // Reset the draft and editing state
  function resetNoteDraft() {
    noteDraft.value = {
      title: "",
      content: "",
      folderData: "",
    };
    editingNote.value = null;
  }

  // Fetch notes from Firestore
  async function fetchNotes() {
    const snapshot = await getDocs(collection(db, "notes"));
    notes.value = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toDate?.() ?? new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate?.() ?? new Date(),
      } as Note;
    });
  }

  // Add a new note
  async function addNote() {
    const now = serverTimestamp();
    const newNote = {
      ...noteDraft.value,
      createdAt: now,
      updatedAt: now,
    };

    await addDoc(collection(db, "notes"), newNote);
    await fetchNotes();
    resetNoteDraft();
  }

  // Update existing note
  async function updateNote(id: string) {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, {
      ...noteDraft.value,
      updatedAt: serverTimestamp(),
    });
    await fetchNotes();
    resetNoteDraft();
  }

  // Delete note
  async function deleteNote(id: string) {
    await deleteDoc(doc(db, "notes", id));
    await fetchNotes();
  }

  // Computed filtered notes
  const filteredNotes = computed(() => {
    return selectedFolderId.value
      ? notes.value.filter((note) => note.folderData === selectedFolderId.value)
      : notes.value;
  });

  return {
    // state
    noteDraft,
    editingNote,
    notes,
    selectedFolderId,

    // computed/geters
    filteredNotes,

    // actions
    resetNoteDraft,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
  };
});
