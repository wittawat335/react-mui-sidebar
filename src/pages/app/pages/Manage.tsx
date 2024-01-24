import React, { Dispatch, SetStateAction } from "react";

type Props = {
  Toggled: Dispatch<SetStateAction<boolean>>;
};

export default function Manges({ Toggled }: Props) {
  const [toggled, setToggled] = React.useState(false);
  return (
    <main>
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <div style={{ marginBottom: "16px" }}>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(Toggled)}>
              Toggle
            </button>
          )}
        </div>

        <div style={{ padding: "0 8px" }}>
          <div style={{ marginBottom: 16 }}>
            <Switch
              id="collapse"
              checked={collapsed}
              onChange={() => setCollapsed(!collapsed)}
              label="Collapse"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Switch
              id="rtl"
              checked={rtl}
              onChange={handleRTLChange}
              label="RTL"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Switch
              id="theme"
              checked={theme === "dark"}
              onChange={handleThemeChange}
              label="Dark theme"
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Switch
              id="image"
              checked={hasImage}
              onChange={handleImageChange}
              label="Image"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
