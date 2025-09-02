import React, { useState } from "react";
import InputSection from "./components/InputSection";
import FlashcardViewer from "./components/FlashcardViewer";
import API_BASE from "./config";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionFirst, setQuestionFirst] = useState(true);
  const [pdfName, setPdfName] = useState("flashcards");

  const handleNext = () => {
    if (flashcards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    if (flashcards.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const toggleQA = () => setQuestionFirst((v) => !v);

  const handleDownload = async () => {
    const safeName = pdfName.trim() || "flashcards";
    try {
      const res = await fetch(`${API_BASE}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcards, filename: safeName }),
      });

      if (!res.ok) {
        console.error("Download failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${safeName}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold mb-8">CardIQ</h1>

      <InputSection
        setFlashcards={setFlashcards}
        setCurrentIndex={setCurrentIndex}
        hasFlashcards={flashcards.length > 0}
      />

      {flashcards.length > 0 && (
        <div className="flex flex-col items-center gap-2 mb-6 mt-2">
          <div className="flex gap-3">
            <button
              className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-lg"
              onClick={toggleQA}
            >
              {questionFirst ? "Question First" : "Answer First"}
            </button>

            <button
              className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-lg"
              onClick={handleDownload}
            >
              Download PDF
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Please name your PDF before saving.
          </p>

          <input
            type="text"
            placeholder="Enter PDF name"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value)}
            className="border rounded px-3 py-2 text-lg mt-1"
          />
        </div>
      )}

      {flashcards.length > 0 && (
        <FlashcardViewer
          flashcard={flashcards[currentIndex]}
          questionFirst={questionFirst}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}

      <footer className="mt-auto text-lg text-gray-500 pt-6">
        © isaacwalsham 2025
      </footer>
    </div>
  );
}

export default App;