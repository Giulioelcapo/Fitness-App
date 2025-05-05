import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "./ui/select";
import './Prevention.css';
import SponsorBanner from "../components/SponsorBanner";
import BoltIcon from "@mui/icons-material/Bolt";

const Prevention = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const PreventionData = {
    "Squat": [
      { name: "Two-legged squat with hands on the hips", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/JVoZEZ6b71c" },
      { name: "Two-legged squats with straight arms over the head", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=kkNzUKiaqBE&t=1s" },
      { name: "One-legged squats with hands on the hips", sets: 4, reps: 8, difficulty: 1,  videoUrl:"https://youtu.be/oVKsQRy1JhI" },
      { name: "Squats pair with ball kick", sets: 3, reps: 8, difficulty: 1,  videoUrl: "https://www.youtube.com/watch?v=i51ALukNH94&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=OTY3MTQ" },
      { name: "Single squat with foot press", sets: 4, reps: 8, difficulty:1, videoUrl:"https://www.youtube.com/watch?v=m719zJNNMuQ" },      
      { name: "Two-legged squats with resistence band around the knees", sets: 3, reps: 8, difficulty:1,  videoUrl: "https://www.youtube.com/watch?v=hdXYwz87Mzs" },
      { name: "Squat with resistence band around the knee", sets: 4, reps: 8, difficulty:1,  videoUrl:"https://www.youtube.com/watch?v=hdXYwz87Mzs&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=OTY3MTQ" },
      { name: "Single leg squat with resistence band around the knee", sets: 4, reps: 8, difficulty:1, videoUrl:"https://youtu.be/q5tLPVZLhRg" },
    ],
    "Lunge": [
      { name: "Stationary lunge", sets: 3, reps: 12, difficulty:2, videoUrl:"https://youtu.be/Ej0PrPWs6TM" },
      { name: "Reverse lunge", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/RU2KftDWil0" },
      { name: "Walking forward lunges", sets: 3, reps: 12, difficulty:2, videoUrl:"https://youtu.be/Eq4lrkEmqNY" },
      { name: "Walking forward lunges with rotation", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/R6jFfHUvIRc" },
      { name: "Stationary lunge steps with straight arms over the head with a ball", sets: 3, reps: 12, difficulty:2, videoUrl:"https://youtu.be/dhRd7AcPH9Q" },
      { name: "Sideways lunges", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/efKvQrtLSHk" },
      { name: "Lunge jumps", sets: 3, reps: 12, difficulty:2, videoUrl:"https://youtu.be/PzBqhtNKT6E" },
      { name: "Lunge step with throw-in", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/vvR7y1PdHAk" },
      { name: "Walking sideways lunges  with band", sets: 3, reps: 12, difficulty:2, videoUrl:"https://youtu.be/_r0y7eNBzBY" },
    ],
      "Jump/landing": [
      { name: "Two-legged jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/vqeuicSkVZQ" },
      { name: "Sideways skate jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/0BHS7V53CD4" },
      { name: "One-legged jumps forward/back", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/4t8P5dT1idI" },
      { name: "Fast feet forward jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/4t8P5dT1idI" },
      { name: "Fast feet with change of direction jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/9GwmuxZRD_A" },
      { name: "Jumps with push", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/kAyPzURSJJw" },
      { name: "Jumps with heading", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/d2EF4IbWDKg" },
      { name: "Shoulder bump jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/fQ-JYhoU1a0" },
    ],
    "Core": [
      { name: "Dragonflag ecc only", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=QFAt1TLKl1w" },
      { name: "Dead Bug alt lowering leg", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=UjYBUBv2MEA" },
      { name: "Roll Out Ball", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=PQVE0wXBDME" },
      { name: "Loaded Carry Walk", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/watch?v=mGZc3RG1Tgo" },
      { name: "Jumps with heading", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/d2EF4IbWDKg" },
      { name: "Shoulder bump jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/fQ-JYhoU1a0" },
    ],
    "Back chain": [
      { name: "Pelvic lifts with both feet on the ground", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=7or7JzdeOMA" },
      { name: "Pelvic lift with ball between the knees", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=6gcwDIIFyeY" },
      { name: "Pelvic lifts with one foot on the ground", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=kKoSj7Xyt3o" },
      { name: "Pelvic lifts with one foot on the ball", sets: 3, reps: 10, videoUrl: "https://youtu.be/Ui6vO1Cd1To" },
      { name: "Pelvic lifts with one explosive thrust", sets: 3, reps: 8, videoUrl: "https://youtu.be/g-8UUWP9Ghg" },
      { name: "The dragon", sets: 3, reps: 8, videoUrl: "https://youtu.be/ei8rauYPNfk" },
      { name: "Pelvic lifts pair", sets: 3, reps: 10, videoUrl: "https://youtu.be/nywfCltW7Fo" },
      { name: "Nordic hamstring", sets: 3, reps: 8, videoUrl: "https://youtu.be/fe73TlD5s48" },
      { name: "Standing hamstring curls", sets: 3, reps: 8, videoUrl: "https://youtu.be/7gq_xAu5ILo" },
    ],
    "Groin": [
      { name: "Standing leg swing", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?time_continue=5&v=3LdeSKsUwNI&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=MTM5MTE3LDEzOTExNywyODY2Ng" },
      { name: "Single standing cross country skiing", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=hXNTCTLO168" },
      { name: "Side lying leg lift", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=5ObSopMbmlI&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=OTY3MTQ" },
      { name: "Lateral leg drop", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/watch?v=_klo-HDjFXY" },
      { name: "Adductor squeeze", sets: 3, reps: "40 sec", videoUrl: "https://www.youtube.com/watch?v=U9EdEUBDL8o" },
      { name: "Side plank with static activation of the groin", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=kckXD5g03mU" },
      { name: "openhagen adduction", sets: 3, reps: 10, videoUrl: "https://www.youtube.com/watch?v=TDXueDsMJXs" },
      { name: "Standing adduction with band", sets: 3, reps: 8, videoUrl: "https://aktiva.svenskfotboll.se/utbildning/tranarmaterial/digitala-bocker/knee-control/#/lessons/lX7TwVLkYE7dR6sL5m9neGYZoqHMlImC" },
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
      <h2>Prevention Training</h2>
      <div className="Prevention-container">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(PreventionData).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCategory && (
          <div className="table-container">
            <h3 className="category-title">{selectedCategory}</h3>
            <table className="Prevention-table">
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
                {PreventionData[selectedCategory].map((exercise, index) => (
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

export default Prevention;
