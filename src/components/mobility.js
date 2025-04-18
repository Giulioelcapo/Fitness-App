import { useState } from 'react';
import './strength.css'; // Assicurati che il file sia presente nella tua cartella src

const Mobility = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const MobilityData = {
    "Hip Mobility": [
      { name: "Hip Flexor Stretch", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=qqsvz6EuEYA" },
      { name: "Seated Hip Stretch", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=4TxmHqKHmWk" },
    ],
    "Knee Mobility": [
      { name: "Knee Circles", sets: 3, reps: "30 sec" },
      { name: "Lunge with Rotation", sets: 3, reps: "10 per side", videoUrl: "https://www.youtube.com/watch?v=9BoPnx9-MK0" },
    ],
    "Ankle Mobility": [
      { name: "Ankle Circles", sets: 3, reps: "30 sec" },
      { name: "Calf Stretch", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=Z7sZyyfJ9RY" },
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
      <h2>Mobility Training</h2>
      <div className="mobility-container">
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">Seleziona Categoria</option>
          {Object.keys(MobilityData).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <div className="table-container">
            <h3 className="category-title">{selectedCategory}</h3>
            <table className="mobility-table">
              <thead>
                <tr>
                  <th>Esercizio</th>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {MobilityData[selectedCategory].map((exercise, index) => (
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

export default Mobility;
