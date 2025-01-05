import React from "react";
import { DiffColors } from "./examples/DiffColors";
import { FullYear } from "./examples/FullYear";
import { MondayStart } from "./examples/MondayStart";
import { YearSoFar } from "./examples/YearSoFar";
import "./styles.css";

function App() {
  return (
    <div
      style={{
        padding: "100px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        color: "#161616",
        fontFamily: "-apple-system, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        YearlyHeatmap Demo
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          maxWidth: "600px",
          alignSelf: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <span>Default</span>
          <FullYear />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <span>Custom Colors</span>
          <DiffColors />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <span>Monday Start</span>
          <MondayStart />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <span>Year So Far</span>
          <YearSoFar />
        </div>
      </div>
    </div>
  );
}

export default App;
