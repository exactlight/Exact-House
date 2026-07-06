"use client";

import type { RubricScore } from "@/data/wida";

/*
 * Speaking recordings live in IndexedDB (video blobs are far too big for
 * localStorage). One object store holds the full record; list reads use
 * a cursor and strip the blob so browsing stays light, and the blob is
 * fetched by id only when the teacher plays a recording.
 */

const DB_NAME = "lingolaunch";
const DB_VERSION = 1;
const STORE = "recordings";

export type RecordingMeta = {
  id: string;
  studentName: string;
  className: string;
  prompt: string;
  taskType: string;
  createdAt: number;
  durationSec: number;
  mimeType: string;
  byteSize: number;
  score?: RubricScore;
};

export type RecordingRecord = RecordingMeta & { blob: Blob };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveRecording(record: RecordingRecord): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    await requestToPromise(tx.objectStore(STORE).put(record));
  } finally {
    db.close();
  }
}

export async function listRecordings(): Promise<RecordingMeta[]> {
  const db = await openDb();
  try {
    const store = db.transaction(STORE, "readonly").objectStore(STORE);
    return await new Promise((resolve, reject) => {
      const metas: RecordingMeta[] = [];
      const cursorReq = store.openCursor();
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result;
        if (cursor) {
          const { blob, ...meta } = cursor.value as RecordingRecord;
          void blob; // stripped so the list stays light
          metas.push(meta);
          cursor.continue();
        } else {
          resolve(metas.sort((a, b) => b.createdAt - a.createdAt));
        }
      };
      cursorReq.onerror = () => reject(cursorReq.error);
    });
  } finally {
    db.close();
  }
}

export async function getRecording(
  id: string,
): Promise<RecordingRecord | undefined> {
  const db = await openDb();
  try {
    const store = db.transaction(STORE, "readonly").objectStore(STORE);
    return await requestToPromise(
      store.get(id) as IDBRequest<RecordingRecord | undefined>,
    );
  } finally {
    db.close();
  }
}

export async function updateScore(
  id: string,
  score: RubricScore,
): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const record = await requestToPromise(
      store.get(id) as IDBRequest<RecordingRecord | undefined>,
    );
    if (record) await requestToPromise(store.put({ ...record, score }));
  } finally {
    db.close();
  }
}

export async function deleteRecording(id: string): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    await requestToPromise(tx.objectStore(STORE).delete(id));
  } finally {
    db.close();
  }
}
