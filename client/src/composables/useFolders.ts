import { ref, onUnmounted } from "vue";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Folder } from "../models/Folder";

const folderCollection = collection(db, "folders");

export function useFolders() {
  const folders = ref<Folder[]>([]);

  const q = query(folderCollection, orderBy("createdAt", "asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    folders.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Folder, "id">),
    }));
  });

  onUnmounted(() => unsubscribe());

  const addFolder = async (name: string) => {
    await addDoc(folderCollection, {
      name,
      createdAt: new Date(),
    });
  };

  const deleteFolder = async (id: string) => {
    const ref = doc(db, "folders", id);
    await deleteDoc(ref);
  };

  const editFolder = async (id: string, newName: string) => {
    const ref = doc(db, "folders", id);
    await updateDoc(ref, {
      name: newName,
    });
  };

  return { folders, addFolder, deleteFolder, editFolder };
}
