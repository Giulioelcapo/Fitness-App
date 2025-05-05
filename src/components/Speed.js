import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "./ui/select";
import './Prevention.css';
import BoltIcon from "@mui/icons-material/Bolt";

const Speed = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const SpeedData = {
    "With Ball": {
      "Sprint": [
        { name: "Sprint with ball", sets: 3, reps: 10, difficulty: 2, videoUrl: "" },
      ],
      "Acceleration": [
        { name: "Acceleration with ball", sets: 3, reps: 8, difficulty: 3, videoUrl: "https://youtu.be/BzN0OFwWxYk" },
      ],
      "Reaction": [
        { name: "Reaction sprint with ball", sets: 4, reps: 6, difficulty: 3, videoUrl: "" },
      ]
    },
    "Without Ball": {
      "Sprint": [
        { name: "Positioning sprint", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/QMFK6RwAXsc" },
      ],
      "Acceleration": [
        { name: "Acceleration without ball", sets: 3, reps: 8, difficulty: 3, videoUrl: "https://youtu.be/42cvUdMgfOI" },
      ],
      "Reaction": [
        { name: "Reaction drill one", sets: 4, reps: 6, difficulty: 1, videoUrl: "https://youtu.be/XALjIbbHtFg" },
      ]
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const youtubeId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  const filteredExercises = selectedGroup && selectedCategory
    ? SpeedData[selectedGroup][selectedCategory].filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const renderStars = (difficulty) => {
    return '⭐'.repeat(difficulty);
  };

  return (
    <div>
      <h2>Speed Training</h2>
      <div className="Speed-container">

        {/* Primo Select: With Ball / Without Ball */}
        <Select onValueChange={(group) => {
          setSelectedGroup(group);
          setSelectedCategory('');
          setSearchTerm('');
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(SpeedData).map((group) => (
              <SelectItem key={group} value={group}>{group}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Secondo Select: Sprint / Acceleration / Reaction */}
        {selectedGroup && (
          <Select onValueChange={(category) => {
            setSelectedCategory(category);
            setSearchTerm('');
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(SpeedData[selectedGroup]).map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}


        {/* Tabella esercizi */}
        {selectedCategory && (
          <div className="table-container">
            <h3 className="category-title">{selectedCategory} ({filteredExercises.length} exercises)</h3>
            <table className="Speed-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Difficulty</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {filteredExercises.map((exercise, index) => (
                  <tr key={index}>
                    <td>{exercise.name}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.reps}</td>
                    <td>{renderStars(exercise.difficulty)}</td>
                    <td>
                      {exercise.videoUrl ? (
                        <button
                          className="video-button"
                          onClick={() => setSelectedVideoUrl(getEmbedUrl(exercise.videoUrl))}
                        >
                          Watch Video
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

        {/* Modal Video */}
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

export default Speed;
