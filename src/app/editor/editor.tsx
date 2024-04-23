'use client';

import { useEffect, useState } from "react";
import View from './view';
import editorStyle from './editor.module.css';

export default function Editor() {
  const [target, setTarget] = useState<any>();

  useEffect(() => {
    setTarget(document.getElementById('printy6-canvas'));
  }, []);

  return (
    <div
      id="printy6-canvas"
      className={editorStyle.editor}
      style={{
        width: 1200,
        height: 600,
        border: "1px solid",
        background: "#fff",
      }}
    >
      {
        target &&
        <View
          target={target}
        />
      }
    </div>
  )
}
