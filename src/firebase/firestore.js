import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  where,
  getDoc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./config";

// ========== NOTES OPERATIONS ==========

export const uploadNote = async (file, noteData) => {
  try {
    // Upload file to Firebase Storage
    const timestamp = Date.now();
    const fileName = `notes/${noteData.uploadedBy}-${timestamp}.pdf`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(snapshot.ref);

    // Save note data to Firestore
    const notesRef = collection(db, "notes");
    const docRef = await addDoc(notesRef, {
      ...noteData,
      fileURL,
      fileName,
      createdAt: serverTimestamp(),
      downloads: 0,
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to upload note: " + error.message);
  }
};

export const getNotes = async () => {
  try {
    const notesRef = collection(db, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    // If permissions error, return empty array instead of throwing
    if (
      error.message.includes("permissions") ||
      error.code === "permission-denied"
    ) {
      console.warn(
        "Firestore permissions not configured. Please deploy Firestore rules.",
      );
      return [];
    }
    throw new Error("Failed to fetch notes: " + error.message);
  }
};

export const downloadNoteFile = async (fileURL, fileName) => {
  try {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName + ".pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    throw new Error("Failed to download file: " + error.message);
  }
};

export const incrementDownloadCount = async (noteId) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, {
      downloads: increment(1),
    });
  } catch (error) {
    console.error("Failed to increment download count:", error);
  }
};

// ========== MARKETPLACE OPERATIONS ==========

export const createMarketplaceListing = async (imageFile, listingData) => {
  try {
    let imageURL = null;

    if (imageFile) {
      const timestamp = Date.now();
      const fileName = `products/${listingData.seller}-${timestamp}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, imageFile);
      imageURL = await getDownloadURL(snapshot.ref);
    }

    const marketplaceRef = collection(db, "marketplace");
    const docRef = await addDoc(marketplaceRef, {
      ...listingData,
      imageURL,
      createdAt: serverTimestamp(),
      status: "available",
      views: 0,
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to create listing: " + error.message);
  }
};

export const getMarketplaceListings = async (filters = {}) => {
  try {
    const marketplaceRef = collection(db, "marketplace");
    let q = query(marketplaceRef, orderBy("createdAt", "desc"));

    if (filters.category && filters.category !== "all") {
      q = query(
        marketplaceRef,
        where("category", "==", filters.category),
        orderBy("createdAt", "desc"),
      );
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    if (
      error.message.includes("permissions") ||
      error.code === "permission-denied"
    ) {
      console.warn(
        "Firestore permissions not configured. Please deploy Firestore rules.",
      );
      return [];
    }
    throw new Error("Failed to fetch listings: " + error.message);
  }
};

export const updateListingStatus = async (listingId, status) => {
  try {
    const listingRef = doc(db, "marketplace", listingId);
    await updateDoc(listingRef, { status });
  } catch (error) {
    throw new Error("Failed to update listing status: " + error.message);
  }
};

export const incrementListingViews = async (listingId) => {
  try {
    const listingRef = doc(db, "marketplace", listingId);
    await updateDoc(listingRef, {
      views: increment(1),
    });
  } catch (error) {
    console.error("Failed to increment views:", error);
  }
};

// ========== EVENTS OPERATIONS ==========

export const createEvent = async (imageFile, eventData) => {
  try {
    let posterURL = null;

    if (imageFile) {
      const timestamp = Date.now();
      const fileName = `events/${timestamp}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, imageFile);
      posterURL = await getDownloadURL(snapshot.ref);
    }

    const eventsRef = collection(db, "events");
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      posterURL,
      createdAt: serverTimestamp(),
      registrations: 0,
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to create event: " + error.message);
  }
};

export const getEvents = async () => {
  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    if (
      error.message.includes("permissions") ||
      error.code === "permission-denied"
    ) {
      console.warn(
        "Firestore permissions not configured. Please deploy Firestore rules.",
      );
      return [];
    }
    throw new Error("Failed to fetch events: " + error.message);
  }
};

export const incrementEventRegistrations = async (eventId) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      registrations: increment(1),
    });
  } catch (error) {
    console.error("Failed to increment registrations:", error);
  }
};

// ========== DOUBTS OPERATIONS ==========

export const createDoubt = async (doubtData) => {
  try {
    const doubtsRef = collection(db, "doubts");
    const docRef = await addDoc(doubtsRef, {
      ...doubtData,
      createdAt: serverTimestamp(),
      upvotes: 0,
      answers: 0,
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to create doubt: " + error.message);
  }
};

export const getDoubts = async (filters = {}) => {
  try {
    const doubtsRef = collection(db, "doubts");
    let q = query(doubtsRef, orderBy("createdAt", "desc"));

    if (filters.tag) {
      q = query(
        doubtsRef,
        where("tags", "array-contains", filters.tag),
        orderBy("createdAt", "desc"),
      );
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Failed to fetch doubts: " + error.message);
  }
};

export const createAnswer = async (doubtId, answerData) => {
  try {
    const answersRef = collection(db, "doubts", doubtId, "answers");
    const docRef = await addDoc(answersRef, {
      ...answerData,
      createdAt: serverTimestamp(),
      upvotes: 0,
    });

    // Increment answer count in the main doubt document
    const doubtRef = doc(db, "doubts", doubtId);
    await updateDoc(doubtRef, {
      answers: increment(1),
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to create answer: " + error.message);
  }
};

export const getAnswers = async (doubtId) => {
  try {
    const answersRef = collection(db, "doubts", doubtId, "answers");
    const q = query(answersRef, orderBy("upvotes", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Failed to fetch answers: " + error.message);
  }
};

export const upvoteDoubt = async (doubtId) => {
  try {
    const doubtRef = doc(db, "doubts", doubtId);
    await updateDoc(doubtRef, {
      upvotes: increment(1),
    });
  } catch (error) {
    throw new Error("Failed to upvote doubt: " + error.message);
  }
};

export const upvoteAnswer = async (doubtId, answerId) => {
  try {
    const answerRef = doc(db, "doubts", doubtId, "answers", answerId);
    await updateDoc(answerRef, {
      upvotes: increment(1),
    });
  } catch (error) {
    throw new Error("Failed to upvote answer: " + error.message);
  }
};

// ========== FREELANCE PROJECTS OPERATIONS ==========

export const createProject = async (projectData) => {
  try {
    const projectsRef = collection(db, "projects");
    const docRef = await addDoc(projectsRef, {
      ...projectData,
      createdAt: serverTimestamp(),
      applicants: 0,
      status: "open",
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to create project: " + error.message);
  }
};

export const getProjects = async (filters = {}) => {
  try {
    const projectsRef = collection(db, "projects");
    let q = query(projectsRef, orderBy("createdAt", "desc"));

    if (filters.skill) {
      q = query(
        projectsRef,
        where("skills", "array-contains", filters.skill),
        orderBy("createdAt", "desc"),
      );
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Failed to fetch projects: " + error.message);
  }
};

export const applyToProject = async (projectId, applicationData) => {
  try {
    const applicantsRef = collection(db, "projects", projectId, "applicants");
    const docRef = await addDoc(applicantsRef, {
      ...applicationData,
      appliedAt: serverTimestamp(),
      status: "pending",
    });

    // Increment applicant count in the main project document
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      applicants: increment(1),
    });

    return docRef.id;
  } catch (error) {
    throw new Error("Failed to apply to project: " + error.message);
  }
};

export const getProjectApplications = async (projectId) => {
  try {
    const applicantsRef = collection(db, "projects", projectId, "applicants");
    const q = query(applicantsRef, orderBy("appliedAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Failed to fetch applications: " + error.message);
  }
};

export const updateApplicationStatus = async (
  projectId,
  applicationId,
  status,
) => {
  try {
    const applicationRef = doc(
      db,
      "projects",
      projectId,
      "applicants",
      applicationId,
    );
    await updateDoc(applicationRef, { status });
  } catch (error) {
    throw new Error("Failed to update application status: " + error.message);
  }
};
