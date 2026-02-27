"use client";

import { useRef, useState } from "react";
import { User } from "@/types";

interface Props {
  user: User;
  onSave: (u: User) => void;
}

export default function ProfilePage({ user, onSave }: Props) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    photo: user.photo,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preview, setPreview] = useState<string | null>(user.photo);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      setForm((f) => ({ ...f, photo: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave({ name: form.name, email: form.email, photo: form.photo });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls =
    "w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-100 px-3 py-2.5 text-sm text-center outline-none focus:border-indigo-500 transition-colors";

  const labelCls =
    "block text-[11px] text-slate-500 uppercase tracking-wide mb-1.5 text-center";

  const fields = [
    { label: "Nome", field: "name", type: "text", placeholder: "Seu nome" },
    { label: "Email", field: "email", type: "email", placeholder: "seu@email.com" },
    { label: "Senha Atual", field: "currentPassword", type: "password", placeholder: "••••••••" },
    { label: "Nova Senha", field: "newPassword", type: "password", placeholder: "••••••••" },
    { label: "Confirmar Nova Senha", field: "confirmPassword", type: "password", placeholder: "••••••••" },
  ] as const;

  return (
    <div className="max-w-md mx-auto flex flex-col items-center gap-6 pt-2">

      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-2.5">
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border-[3px] border-slate-700 overflow-hidden flex items-center justify-center text-4xl cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              "👤"
            )}
          </div>
          <div
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-2xl opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            📷
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhoto}
        />
        <p className="text-xs text-slate-500">Clique para alterar a foto</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {fields.map(({ label, field, type, placeholder }) => (
          <div key={field}>
            <label className={labelCls}>{label}</label>
            <input
              type={type}
              className={inputCls}
              placeholder={placeholder}
              value={form[field] ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field]: e.target.value }))
              }
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className={`mt-2 py-3.5 rounded-xl border-none text-white text-sm font-bold cursor-pointer tracking-wide transition-all duration-300 ${
            saved
              ? "bg-emerald-500"
              : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500"
          }`}
        >
          {saved ? "✓ Salvo com sucesso!" : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}
