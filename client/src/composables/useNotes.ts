import { ref, onUnmounted } from "vue";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Note } from "../models/Note";

const notesCollection = collection(db, "notes");

export function useNotes() {
  const notes = ref<Note[]>([]);

  const q = query(notesCollection, orderBy("updatedAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    notes.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Note),
    }));
  });

  onUnmounted(() => unsubscribe());

  const addNote = async (title: string, content: string, folderId?: string) => {
    await addDoc(collection(db, "notes"), {
      title,
      content,
      folderData: folderId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const updateNote = async (id: string, newData: Partial<Note>) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, {
      ...newData,
      updatedAt: new Date(),
    });
  };

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
}
