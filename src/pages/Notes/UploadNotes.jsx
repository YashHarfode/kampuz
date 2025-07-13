import { useState } from "react";
import { storage } from "../../firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function UploadNotes() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const storageRef = ref(storage, `notes/${file.name}`);
    await uploadBytes(storageRef, file);
    alert("Notes uploaded!");
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-green-500 text-white p-2 rounded">
        Upload Notes
      </button>
    </div>
  );
}