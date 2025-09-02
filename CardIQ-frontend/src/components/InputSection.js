import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import API_BASE from "../config";

function InputSection({ setFlashcards, setCurrentIndex, hasFlashcards }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // to reset input

  const handleGenerate = async () => {
    const hasText = text.trim().length > 0;
    const hasFile = !!file;

    if (!hasText && !hasFile) {
      setError("Please paste text or upload a PDF.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setError("");

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 500);

    try {
      let res;

      if (hasFile) {
        // send PDF via FormData
        const formData = new FormData();
        formData.append("file", file);

        res = await fetch(`${API_BASE}/generate`, {
          method: "POST",
          body: formData,
        });
      } else {
        // send pasted text as JSON
        res = await fetch(`${API_BASE}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.trim() }),
        });
      }

      const data = await res.json();

      clearInterval(interval);
      setProgress(100);

      if (!res.ok) {
        setError(data?.error || "Failed to generate flashcards.");
        return;
      }

      if (!Array.isArray(data) || data.length === 0) {
        setError("No flashcards were generated. Try different input.");
        return;
      }

      setFlashcards(data);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
      clearInterval(interval);
      setError("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset file input control
    }
  };

  return (
    <div className="mb-8 w-full max-w-3xl flex flex-col gap-4 items-center">
      <p className="text-xl text-gray-700 text-center">
        Paste your text below <strong>OR</strong> upload a PDF file
      </p>

      {/* show textarea only when no file is selected */}
      {!file && (
        <textarea
          className="border p-4 rounded w-full text-lg h-48"
          placeholder="Paste text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {/* hide the floating "or" once flashcards exist */}
      {!hasFlashcards && <span className="text-gray-500 text-lg">or</span>}

      {/* file picker OR selected-file row with remove (X) */}
      {!file ? (
        <input
          type="file"
          accept=".pdf"
          className="mt-1 text-lg"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0] || null)}
        />
      ) : (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-700 text-lg">{file.name}</span>
          <button
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove file"
            title="Remove file"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="mt-4 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors text-lg"
        onClick={handleGenerate}
        disabled={loading || (!text.trim() && !file)}
      >
        Generate Flashcards
      </button>

      {loading && (
        <div className="w-full mt-4">
          <p className="text-center mb-2 text-lg">
            Please wait, generating flashcards...
          </p>
          <div className="w-full bg-gray-300 rounded h-4">
            <div
              className="bg-black h-4 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InputSection;