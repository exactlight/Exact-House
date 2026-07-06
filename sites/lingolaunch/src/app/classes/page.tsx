"use client";

import { useState } from "react";
import { makeId, useClasses, type ClassRoom } from "@/lib/store";

export default function ClassesPage() {
  const [classes, setClasses, hydrated] = useClasses();
  const [newClassName, setNewClassName] = useState("");

  function addClass() {
    const name = newClassName.trim();
    if (!name) return;
    setClasses((prev) => [...prev, { id: makeId(), name, students: [] }]);
    setNewClassName("");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">🏫 My Classes</h1>
      <p className="mt-2 font-semibold text-ink-soft">
        Set up each class roster once. The Student Picker (and any game that
        needs names) will use them. Everything stays in this browser.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addClass();
        }}
        className="mt-6 flex gap-3"
      >
        <input
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Class name — e.g. Period 3 ESL"
          className="flex-1 rounded-2xl border-2 border-ink/15 bg-paper px-4 py-3 font-semibold outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="rounded-2xl bg-teal-500 px-6 py-3 font-display text-lg font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5"
        >
          + Add Class
        </button>
      </form>

      {!hydrated ? (
        <div className="mt-8 h-32 animate-pulse rounded-3xl bg-paper" />
      ) : classes.length === 0 ? (
        <div className="mt-8 rounded-3xl border-4 border-dashed border-ink/15 p-10 text-center font-semibold text-ink-soft">
          No classes yet. Add your first class above — then add students to
          its roster.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              onChange={(updated) =>
                setClasses((prev) =>
                  prev.map((c) => (c.id === updated.id ? updated : c)),
                )
              }
              onDelete={() =>
                setClasses((prev) => prev.filter((c) => c.id !== cls.id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ClassCard({
  cls,
  onChange,
  onDelete,
}: {
  cls: ClassRoom;
  onChange: (cls: ClassRoom) => void;
  onDelete: () => void;
}) {
  const [namesInput, setNamesInput] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function addStudents() {
    // Accept "Maria, Jun, Ahmed" or one name per line — teachers paste rosters.
    const names = namesInput
      .split(/[\n,]/)
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length === 0) return;
    onChange({
      ...cls,
      students: [
        ...cls.students,
        ...names.map((name) => ({ id: makeId(), name })),
      ],
    });
    setNamesInput("");
  }

  return (
    <section className="rounded-3xl border-4 border-ink/10 bg-paper p-6 shadow-pop">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-extrabold">{cls.name}</h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-700">
            {cls.students.length} students
          </span>
          {confirmingDelete ? (
            <>
              <button
                type="button"
                onClick={onDelete}
                className="rounded-full bg-coral-500 px-3 py-1 text-sm font-bold text-white"
              >
                Really delete?
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="rounded-full bg-ink/10 px-3 py-1 text-sm font-bold"
              >
                Keep
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="rounded-full px-3 py-1 text-sm font-bold text-ink-soft hover:bg-coral-100 hover:text-coral-600"
            >
              Delete class
            </button>
          )}
        </div>
      </div>

      {cls.students.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {cls.students.map((student) => (
            <li
              key={student.id}
              className="group flex items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-sm font-bold"
            >
              {student.name}
              <button
                type="button"
                aria-label={`Remove ${student.name}`}
                onClick={() =>
                  onChange({
                    ...cls,
                    students: cls.students.filter((s) => s.id !== student.id),
                  })
                }
                className="ml-1 text-ink-soft hover:text-coral-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStudents();
        }}
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <textarea
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
          placeholder="Add students — separate names with commas or new lines"
          rows={1}
          className="flex-1 resize-y rounded-2xl border-2 border-ink/15 bg-cream px-4 py-2.5 font-semibold outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="rounded-2xl bg-sky-500 px-5 py-2.5 font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5"
        >
          Add students
        </button>
      </form>
    </section>
  );
}
