import React, { useState, useRef } from "react";
import dice20 from "../assets/dice20.png";
import "../css_modules/Profile.css";

export default function ProfileBox({ user = {} }) {
  const { username, displayName, email } = user;

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    nombre: displayName || "",
    ciudad: "",
    correo: email || "",
    telefono: "",
    pago: "efectivo",
  });
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileRef = useRef(null);

  function handleToggle() {
    setEditing((s) => !s);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.type !== "image/png") {
      // Sólo PNG permitido según requisito
      alert("Sólo se permiten imágenes PNG por ahora.");
      e.target.value = null;
      return;
    }
    const url = URL.createObjectURL(f);
    setAvatarUrl(url);
    // Nota: no se sube a Firebase todavía
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí guardamos localmente (simulado) — no hay integración con Firebase aún
    setEditing(false);
    alert("Perfil actualizado localmente (no subido a Firebase).\nLos cambios están en la sesión actual.");
  }

  return (
    <div className="profile-page">
      <div className="card shadow register-card profile-card-lg bg-dark text-white">
        <div className="row g-0">
          <div className="col-md-4 brand-pane d-flex flex-column justify-content-center align-items-center p-4">
            <img src={dice20} alt="logo" className="profile-logo mb-3" />
            <div className="brand-title">Pathfinder Society</div>
            <div className="brand-sub">Lead your Story</div>
          </div>

          <div className="col-md-8 p-4">
            <h3 className="card-title text-center mb-4">Perfil</h3>

            <div className="d-flex gap-3 align-items-start mb-3 profile-top">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar" style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none" }}>
                  {!avatarUrl && <span className="avatar-initials" />}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
                <button type="button" className="btn btn-sm btn-outline-light mt-2 avatar-upload-btn" onClick={() => fileRef.current && fileRef.current.click()}>
                  Subir foto (PNG)
                </button>
              </div>

              <div className="flex-fill">
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label label-upper">Nombre de usuario</label>
                    <input type="text" className="form-control" value={username || ""} disabled />
                  </div>

                  <div className="mb-3">
                    <label className="form-label label-upper">Nombre</label>
                    <input name="nombre" type="text" className="form-control" value={profile.nombre} onChange={handleChange} disabled={!editing} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label label-upper">Correo</label>
                    <input name="correo" type="email" className="form-control" value={profile.correo} onChange={handleChange} disabled={!editing} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label label-upper">Ciudad</label>
                    <input name="ciudad" type="text" className="form-control" value={profile.ciudad} onChange={handleChange} disabled={!editing} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label label-upper">Teléfono</label>
                    <input name="telefono" type="tel" className="form-control" value={profile.telefono} onChange={handleChange} disabled={!editing} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label label-upper">Método de pago</label>
                    <select name="pago" className="form-control" value={profile.pago} onChange={handleChange} disabled={!editing}>
                      <option value="efectivo">Efectivo</option>
                      <option value="tarjeta_credito">Tarjeta de crédito</option>
                      <option value="tarjeta_debito">Tarjeta de débito</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end gap-2 mt-3">
                    {editing ? (
                      <>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Guardar (local)
                        </button>
                      </>
                    ) : (
                      <button type="button" className="btn btn-success complete-btn" onClick={handleToggle}>
                        Completar perfil
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}