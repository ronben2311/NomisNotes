import { defineStore } from "pinia";
import { ref } from "vue";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Folder } from "../models/Folder";

export const useFolderStore = defineStore("folder", () => {
  const folders = ref<Folder[]>([]);

  async function fetchFolders() {
    const q = query(collection(db, "folders"), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    folders.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Folder, "id">),
    }));
  }

  const addFolder = async (name: string): Promise<string> => {
    const docRef = await addDoc(collection(db, "folders"), {
      name,
      createdAt: new Date(),
    });
    await fetchFolders();
    return docRef.id;
  };

  async function deleteFolder(id: string) {
    await deleteDoc(doc(db, "folders", id));
    await fetchFolders();
  }

  async function editFolder(id: string, newName: string) {
    await updateDoc(doc(db, "folders", id), {
      name: newName,
    });
    await fetchFolders();
  }

  return {
    folders,
    fetchFolders,
    addFolder,
    deleteFolder,
    editFolder,
  };
});
