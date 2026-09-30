"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false, loading: () => <p>Loading editor...</p> });

export default function RichTextEditor({ name, defaultValue = "", placeholder = "" }: { name: string; defaultValue?: string; placeholder?: string }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    // Attempt to parse JSON if it's currently stored as a JSON array
    try {
      if (defaultValue && defaultValue.startsWith("[")) {
        const parsed = JSON.parse(defaultValue);
        if (Array.isArray(parsed)) {
          setValue(parsed.map((p) => `<p>${p}</p>`).join(""));
          return;
        }
      }
    } catch(e) {}
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <input type="hidden" name={name} value={value} />
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        className="h-64 mb-12"
      />
    </div>
  );
}
