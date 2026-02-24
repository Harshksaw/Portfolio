"use client";

import { useEffect, useRef, useState } from "react";

type Category = "AI" | "Web" | "Mobile" | "Subjects";

interface Project {
  id: string;
  title: string;
  shortTitle: string;
  type: string;
  category: Category;
  description: string[];
  techStack: string[];
  image: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const EMPTY: Omit<Project, "id"> = {
  title: "",
  shortTitle: "",
  type: "production",
  category: "Web",
  description: [],
  techStack: [],
  image: [],
  demoUrl: "",
  repoUrl: "",
};

const CATEGORIES: Category[] = ["AI", "Web", "Mobile", "Subjects"];

/* ─── helpers ─────────────────────────────────────────────── */
function arr(v: string) {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
function join(a: string[]) {
  return a.join("\n");
}

/* ─── Image upload ─────────────────────────────────────────── */
function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/projects/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      urls.push(url);
    }
    onChange([...images, ...urls]);
    setUploading(false);
  }

  function removeImage(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {images.map((url, i) => (
          <div key={i} className="relative group w-20 h-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover rounded-lg border border-white/10"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs hidden group-hover:flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="w-20 h-20 rounded-lg border-2 border-dashed border-white/20 hover:border-primary-main/60 text-white/40 hover:text-primary-main text-2xl flex items-center justify-center transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <span className="text-xs animate-pulse">...</span>
          ) : (
            "+"
          )}
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

/* ─── Project Form (modal) ─────────────────────────────────── */
function ProjectModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Omit<Project, "id"> & { id?: string };
  onSave: (p: Omit<Project, "id"> & { id?: string }) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [descText, setDescText] = useState(join(initial.description));
  const [techText, setTechText] = useState(initial.techStack.join(", "));
  const [saving, setSaving] = useState(false);

  function field(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...form,
      description: arr(descText),
      techStack: techText.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-primary-darker border border-white/10 rounded-2xl shadow-2xl">
        <div className="sticky top-0 bg-primary-darker border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {form.id ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2 flex flex-col gap-1">
              <span className="text-xs text-white/50 uppercase tracking-wider">Title</span>
              <input
                required
                value={form.title}
                onChange={field("title")}
                className="input"
                placeholder="Full-Stack Room Booking System"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/50 uppercase tracking-wider">Short Title</span>
              <input
                required
                value={form.shortTitle}
                onChange={field("shortTitle")}
                className="input"
                placeholder="StudyEkaant"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/50 uppercase tracking-wider">Type</span>
              <input
                value={form.type}
                onChange={field("type")}
                className="input"
                placeholder="production"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/50 uppercase tracking-wider">Category</span>
              <select value={form.category} onChange={field("category")} className="input">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/50 uppercase tracking-wider">Demo URL</span>
              <input
                value={form.demoUrl ?? ""}
                onChange={field("demoUrl")}
                className="input"
                placeholder="https://..."
              />
            </label>

            <label className="col-span-2 flex flex-col gap-1">
              <span className="text-xs text-white/50 uppercase tracking-wider">Repo URL</span>
              <input
                value={form.repoUrl ?? ""}
                onChange={field("repoUrl")}
                className="input"
                placeholder="https://github.com/..."
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/50 uppercase tracking-wider">
              Tech Stack{" "}
              <span className="normal-case text-white/30">(comma-separated)</span>
            </span>
            <input
              value={techText}
              onChange={(e) => setTechText(e.target.value)}
              className="input"
              placeholder="React Native, Node.js, MongoDB"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/50 uppercase tracking-wider">
              Description{" "}
              <span className="normal-case text-white/30">(one bullet per line)</span>
            </span>
            <textarea
              value={descText}
              onChange={(e) => setDescText(e.target.value)}
              rows={5}
              className="input resize-none"
              placeholder="Each line becomes a bullet point..."
            />
          </label>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-white/50 uppercase tracking-wider">Images</span>
            <ImageUploader
              images={form.image}
              onChange={(imgs) => setForm((f) => ({ ...f, image: imgs }))}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-primary-main hover:bg-primary-main/80 text-white font-medium transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : form.id ? "Save Changes" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Category badge ────────────────────────────────────────── */
const BADGE: Record<Category, string> = {
  AI: "bg-primary-violet/20 text-primary-violet",
  Web: "bg-primary-main/20 text-primary-main",
  Mobile: "bg-primary-light/20 text-primary-light",
  Subjects: "bg-white/10 text-white/60",
};

/* ─── Main page ─────────────────────────────────────────────── */
export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<Project, "id"> & { id?: string }) | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/projects");
    setProjects(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save(data: Omit<Project, "id"> & { id?: string }) {
    if (data.id) {
      await fetch(`/api/projects/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setModal(null);
    load();
  }

  async function del(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setDeleteId(null);
    load();
  }

  return (
    <div className="min-h-screen bg-primary-darkest text-white">
      {/* header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-primary-darkest/80 backdrop-blur z-10">
        <div>
          <h1 className="text-xl font-semibold">Projects</h1>
          <p className="text-sm text-white/40">{projects.length} total</p>
        </div>
        <button
          onClick={() => setModal({ ...EMPTY })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-main hover:bg-primary-main/80 text-white text-sm font-medium transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Project
        </button>
      </header>

      {/* content */}
      <main className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group relative rounded-2xl border border-white/10 bg-primary-darker overflow-hidden hover:border-primary-main/40 transition-colors"
              >
                {/* thumbnail */}
                {p.image[0] && (
                  <div className="h-36 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-tight">{p.title}</h3>
                    <span
                      className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${BADGE[p.category] ?? "bg-white/10 text-white/60"}`}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {p.techStack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50"
                      >
                        {t}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                        +{p.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setModal(p)}
                      className="flex-1 py-1.5 rounded-lg text-xs border border-white/10 hover:border-primary-main/50 hover:text-primary-main transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="flex-1 py-1.5 rounded-lg text-xs border border-white/10 hover:border-red-500/50 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* edit / create modal */}
      {modal && (
        <ProjectModal
          initial={modal}
          onSave={save}
          onClose={() => setModal(null)}
        />
      )}

      {/* delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-primary-darker border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Delete project?</h3>
            <p className="text-sm text-white/50">This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => del(deleteId)}
                className="flex-1 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-xl border border-white/10 hover:border-white/30 text-white/60 hover:text-white text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
