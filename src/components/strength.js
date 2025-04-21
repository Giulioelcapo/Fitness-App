import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "./ui/select";
import './strength.css';

const Strength = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const StrengthData = {
    "Lower Body push": [
      { name: "Esercizio 1", sets: 3, reps: 12 },
      { name: "Esercizio 2", sets: 4, reps: 10 },
    ],
    "Lower Body pull": [
      { name: "Nordic Hamstring assisted", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=ud_H5a_AQF8" },
      { name: "Esercizio 4", sets: 4, reps: 8 },
    ],
    "Upper Body push": [
      { name: "Esercizio 5", sets: 4, reps: 12 },
      { name: "Esercizio 6", sets: 3, reps: 10 },
    ],
    "Upper Body pull": [
      { name: "Esercizio 7", sets: 3, reps: 15 },
      { name: "Esercizio 8", sets: 4, reps: 10 },
    ],
    "Core": [
      { name: "Dragonflag ecc only", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=QFAt1TLKl1w" },
      { name: "Dead Bug alt lowering leg", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=UjYBUBv2MEA" },
      { name: "Roll Out Ball", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=PQVE0wXBDME" },
      { name: "Loaded Carry Walk", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/watch?v=mGZc3RG1Tgo" },
      { name: "Mini HandWalk", sets: 3, reps: "40 sec", videoUrl: "https://www.youtube.com/watch?v=MhUm-jkiYIc" },
      { name: "Bodysaw Slider", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=gUSQRyUb-I4" },
    ],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const youtubeId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  return (
    <div>
      <h2>Strength Training</h2>
      <div className="strength-container">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleziona Categoria" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(StrengthData).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCategory && (
          <div className="table-container">
            <h3 className="category-title">{selectedCategory}</h3>
            <table className="strength-table">
              <thead>
                <tr>
                  <th>Esercizio</th>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {StrengthData[selectedCategory].map((exercise, index) => (
                  <tr key={index}>
                    <td>{exercise.name}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.reps}</td>
                    <td>
                      {exercise.videoUrl ? (
                        <button
                          className="video-button"
                          onClick={() => setSelectedVideoUrl(getEmbedUrl(exercise.videoUrl))}
                        >
                          Guarda Video
                        </button>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedVideoUrl && (
          <div className="modal-overlay" onClick={() => setSelectedVideoUrl(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setSelectedVideoUrl(null)}>×</button>
              <iframe
                width="100%"
                height="400"
                src={selectedVideoUrl}
                title="Exercise Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Strength;
