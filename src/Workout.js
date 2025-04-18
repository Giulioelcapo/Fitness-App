import { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";
import './components/workout.css';

const Workout = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null); // Stato per il video selezionato

  const workoutData = {
    "MD+1": [
      { name: "Esercizio 1", sets: 3, reps: 12 },
      { name: "Esercizio 2", sets: 4, reps: 10 },
    ],
    "MD-1": [
      { name: "Esercizio 3", sets: 3, reps: 15 },
      { name: "Esercizio 4", sets: 4, reps: 8 },
    ],
    "Strength Endurance": [
      { name: "Esercizio 5", sets: 4, reps: 12 },
      { name: "Esercizio 6", sets: 3, reps: 10 },
    ],
    "Speed Endurance": [
      { name: "Esercizio 7", sets: 3, reps: 15 },
      { name: "Esercizio 8", sets: 4, reps: 10 },
    ],
    "MD+2": [
      { name: "Roma Landing", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/embed/oSYs2gCAPL8" },
      { name: "Hip Thrust", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=z5QkVMvxRFY" },
      { name: "Bosu landning", sets: 3, reps: 8, videoUrl: "https://youtu.be/Pk8RZGAl-8s" },
      { name: "Alternating Bosu Jump", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/watch?v=Pk8RZGAl-8s" },
      { name: "Deep Squat Wagle", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=JMMKI6DWS0k" },
      { name: "Hip Mobility", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=qqsvz6EuEYA" },
    ],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="workout-container">
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleziona Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MD-1">MD-1</SelectItem>
          <SelectItem value="MD+1">MD+1</SelectItem>
          <SelectItem value="MD+2">MD+2</SelectItem>
          <SelectItem value="Strength Endurance">Strength Endurance</SelectItem>
          <SelectItem value="Speed Endurance">Speed Endurance</SelectItem>
        </SelectContent>
      </Select>

      {selectedCategory && (
        <div className="table-container">
          <h2 className="category-title">{selectedCategory}</h2>
          <table className="workout-table">
            <thead>
              <tr>
                <th>Esercizio</th>
                <th>Set</th>
                <th>Reps</th>
                <th>Video</th>
              </tr>
            </thead>
            <tbody>
              {workoutData[selectedCategory]?.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.name}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.reps}</td>
                  <td>
                    {exercise.videoUrl ? (
                      <button className="video-button" onClick={() => setSelectedVideoUrl(exercise.videoUrl)}>
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

      {/* Modal per il video */}
      {selectedVideoUrl && (
        <div className="modal-overlay" onClick={() => setSelectedVideoUrl(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedVideoUrl(null)}>×</button>
            <iframe
              width="100%"
              height="400"
              src={selectedVideoUrl}
              title="Workout Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;
