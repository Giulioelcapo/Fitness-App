import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Card } from "./components/ui/card";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./components/ui/select";

// Dati dei video
const videoData = [
  { id: 1, category: "lower", title: "Bulgarian Split Squat", youtubeUrl: "https://www.youtube.com/watch?v=IY4wsj-iCMk" },
  { id: 2, category: "lower Body push", title: "DB Globat squat parallel", youtubeUrl: "https://www.youtube.com/watch?v=dJNoPuToE1s" },
  { id: 3, category: "lower Body push", title: "DB Globat squat split", youtubeUrl: "https://www.youtube.com/watch?v=8bu1idpaOC8" },
  { id: 4, category: "lower Body push", title: "Barbell front squat", youtubeUrl: "https://www.youtube.com/watch?v=tGXawp02Cas" },
  { id: 5, category: "lower Body push", title: "Lunge Fw/Bw", youtubeUrl: "https://www.youtube.com/watch?v=4oeBTPV42dg" },
  { id: 6, category: "lower Body pull", title: "Glute Bridge Bar", youtubeUrl: "https://www.youtube.com/watch?v=81W9X4AS-UM" },
  { id: 7, category: "lower Body pull", title: "Glute Bridge walks", youtubeUrl: "https://www.youtube.com/watch?v=QqkyVdXFs24" },
  { id: 8, category: "lower Body pull", title: "Nordic Hamstring Curl ass.", youtubeUrl: "https://www.youtube.com/watch?v=ud_H5a_AQF8" },
  { id: 9, category: "lower Body pull", title: "Copenhagen Adductor", youtubeUrl: "https://www.youtube.com/watch?v=ud_H5a_AQF8" },
  { id: 10, category: "upper Body push", title: "One arm Press", youtubeUrl: "https://www.youtube.com/watch?v=C-5acYDQapI" },
  { id: 11, category: "upper Body push", title: "Push Press Bosu", youtubeUrl: "https://www.youtube.com/watch?v=osoSuDe5PZU" },
  { id: 12, category: "upper Body push", title: "One arm Press", youtubeUrl: "https://www.youtube.com/watch?v=C-5acYDQapI" },
  { id: 13, category: "upper Body push", title: "Two arm Standing Press Split", youtubeUrl: "https://www.youtube.com/watch?v=-mHjEcYP7bQ" },
  { id: 14, category: "upper Body pull", title: "Two arm Row Split", youtubeUrl: "https://www.youtube.com/watch?v=526xerd_iSk" },
  { id: 15, category: "upper Body pull", title: "Chin up", youtubeUrl: "https://www.youtube.com/watch?v=fFBchpoJmDw" },
  { id: 16, category: "upper Body pull", title: "Single arm DB row", youtubeUrl: "https://www.youtube.com/watch?v=fFBchpoJmDw" },
  { id: 17, category: "upper Body pull", title: "Single arm standing row parallell", youtubeUrl: "https://www.youtube.com/watch?v=KtbFRvJa-PE"},
];
const Strength = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e2025] p-6">
      <div className="space-y-6 w-full max-w-5xl">
        <Typography variant="h4" className="text-white font-bold text-center">
          Strength Training Videos
        </Typography>
        <StrengthVideoGallery />
      </div>
    </div>
  );
};

const StrengthVideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);  // Add state for selected video

   const filteredVideos = videoData.filter(
    (video) => video.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-xs mx-auto">
        <Label className="text-white text-sm">Select Category</Label>
        <Select onValueChange={(val) => setSelectedCategory(val)}>
          <SelectTrigger className="bg-[#2f323a] text-white border border-green-600 rounded-2xl px-6 py-3 hover:bg-green-600 hover:text-black transition-all duration-300 font-semibold shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none">
            <SelectValue placeholder="Choose category..." />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2d34] text-white border-[#444] rounded-b-2xl">
            <SelectItem value="lower Body push">Lower Body push</SelectItem>
            <SelectItem value="lower Body pull">Lower Body pull</SelectItem>
            <SelectItem value="upper Body push">Upper Body push</SelectItem>
            <SelectItem value="upper Body pull">Upper Body pull</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="cursor-pointer bg-[#2a2d34] text-white p-4 rounded-2xl shadow-2xl border border-[#444] hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:shadow-xl transition-all duration-500 transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={video.youtubeUrl.replace("watch?v=", "embed/")}
                  title={video.title}
                  allowFullScreen
                  className="w-full h-full pointer-events-none"
                ></iframe>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
};

// ✅ COMPONENTE MODALE
const VideoModal = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
      <div className="bg-[#1e2025] rounded-2xl shadow-2xl max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-xl font-bold hover:text-red-500 transition"
        >
          ×
        </button>
        <div className="p-6">
          <h2 className="text-white text-xl font-semibold mb-4">{video.title}</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              src={video.youtubeUrl.replace("watch?v=", "embed/")}
              title={video.title}
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strength;
