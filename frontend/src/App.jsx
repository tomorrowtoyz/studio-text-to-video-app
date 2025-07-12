import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_PROXY_URL}`, {
        prompt,
      });
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error generating video:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Open Source AI Video Generator</h1>
      <input
        className="border p-2 w-full"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateVideo}
        disabled={loading || !prompt}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>
      {videoUrl && (
        <div className="mt-6">
          <video src={videoUrl} controls className="w-full" />
          <a href={videoUrl} download className="block text-blue-500 mt-2 underline">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}

export default App;