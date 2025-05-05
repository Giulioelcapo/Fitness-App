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
      { name: "Globet squat", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=dJNoPuToE1s" },
      { name: "Barbell frontsquat", sets: 4, reps: 10, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=tGXawp02Cas" },
      { name: "Trap Bar split squat", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=9YPcnolke4s" },
      { name: "Split squat DB", sets: 4, reps: 10, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=u4HKX1tAgxk" },
      { name: "Split squat landmine", sets: 4, reps: 10, difficulty: 3, videoUrl: "https://www.youtube.com/watch?v=X7NskZefTsc" },
    ],
    "Lower Body pull": [
      { name: "Nordic Hamstring assisted", sets: 3, reps: 8, difficulty: 2,  videoUrl: "https://www.youtube.com/watch?v=ud_H5a_AQF8" },
      { name: "Glute Bridge Elevation", sets: 4, reps: 8, difficulty:  2, videoUrl: "https://www.youtube.com/watch?v=81W9X4AS-UM"  },
      { name: "RDL plate", sets: 3, reps: 8, difficulty: 2,  videoUrl: "https://www.youtube.com/watch?v=kg8AbDeXyns" },
      { name: "Hamstring curl", sets: 4, reps: 8, difficulty:  2, videoUrl: "https://www.youtube.com/watch?v=wB8QtwZUN-0"  },
      { name: "Glider", sets: 4, reps: 8, difficulty:  2, videoUrl: "https://www.youtube.com/watch?v=W9uIldrr7cU"  },
    ],
    "Upper Body push": [
      { name: "One arm DB press", sets: 4, reps: 12, difficulty: 1, videoUrl:  "https://www.youtube.com/watch?v=C-5acYDQapI" },
      { name: "One arm bench press", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=i_0XRzA66n8"},
      { name: "One arm standing press", sets: 4, reps: 12, difficulty: 1, videoUrl:  "https://www.youtube.com/watch?v=vltJljge9GY" },
      { name: "One arm rotational press", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=JJmJgg1TATw"},
      { name: "Push up miniband", sets: 4, reps: 12, difficulty: 1, videoUrl:  "https://www.youtube.com/watch?v=7HOGbfxYQK8&feature=youtu.be" },
      { name: "Two arm standing split press", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=-mHjEcYP7bQ"},
    ],
    "Upper Body pull": [
      { name: "Inverse TRX pull", sets: 3, reps: 15, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=AdLD9OoWUD4" },
      { name: "Two arm split position row", sets: 4, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=526xerd_iSk" },
      { name: "Pull-up", sets: 3, reps: 15, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=-1YVg-mN9JQ" },
      { name: "One arm DB row leg contralateral", sets: 4, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=eAp5KUsbQAI&feature=youtu.be" },
    ],
    "Core": [
      { name: "Dragonflag ecc only", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=QFAt1TLKl1w" },
      { name: "Dead Bug alt lowering leg", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=UjYBUBv2MEA" },
      { name: "Roll Out Ball", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=PQVE0wXBDME" },
      { name: "Loaded Carry Walk", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=mGZc3RG1Tgo" },
      { name: "Mini HandWalk", sets: 3, reps: "40 sec", difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=MhUm-jkiYIc" },
      { name: "Bodysaw Slider", sets: 3, reps: "30 sec", difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=gUSQRyUb-I4" },
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

  const renderStars = (difficulty) => {
    return '⭐'.repeat(difficulty);
  };

  return (
    <div>
      <h2>Strength Training</h2>
      <div className="strength-container">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
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
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Difficulty</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {StrengthData[selectedCategory].map((exercise, index) => (
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
