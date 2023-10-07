import { useState, useRef, useEffect } from "react";

export default function MarkerUi(parentToChild) {
  return (
    <main>
      <div>{parentToChild}</div>
    </main>
  );
}
