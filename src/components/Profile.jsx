import React from "react";
import { auth } from "../firebase.js";
import dice20 from "../assets/dice20.png";
import "../css_modules/Profile.css";

export default function Profile({ user }) {
  const u = user ?? auth.currentUser ?? {};
  const username = u.username ?? (u.email ? u.email.split("@")[0] : "");
  const displayName = u.displayName ?? "";
  const email = u.email ?? "";

  return (
    <div className="profile-page"> {/* aplica fondo igual al registro */}
      <div className="card shadow register-card profile-card-lg bg-dark text-white">
        <div className="row g-0">
          <div className="col-md-4 brand-pane d-flex flex-column justify-content-center align-items-center p-4">
            <img src={dice20} alt="logo" className="profile-logo mb-3" />
            <div className="brand-title">Pathfinder Society</div>
            <div className="brand-sub">Lead your Story</div>
          </div>

          <div className="col-md-8 p-4">
            <h3 className="card-title text-center mb-4">Perfil</h3>

            <form className="profile-form">
              <div className="mb-3">
                <label className="form-label label-upper">Nombre de usuario</label>
                <input type="text" className="form-control" value={username || ""} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label label-upper">Nombre</label>
                <input type="text" className="form-control" value={displayName || ""} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label label-upper">Correo</label>
                <input type="email" className="form-control" value={email || ""} disabled />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}