
import { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";
import './components/workout.css';
const rangeDate = {
  start: "2025-05-01",
  end: "2025-05-22",
};
const Workout = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null); // Stato per il video selezionato

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  const renderStars = (difficulty) => {
    return '⭐'.repeat(difficulty);
  };

  const rangeDate = {
    start: "2025-05-01",
    end: "2025-05-22",
  };
  const workoutData = {

    "Preactivation":
      [
        { name: "Adductor", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=0olaSVW6W7A" },
        { name: "Hip", sets: 4, reps: 10, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=0olaSVW6W7A" },
        { name: "Abductor", sets: 3, reps: 12, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=i1Je4LvX8_8" },
        { name: "Hip-extension", sets: 4, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=U0XcNfEmtsk" },
        { name: "Hip-crossover", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=QJb_Lqotinc" },
        { name: "Hip external rotation", sets: 4, reps: 8, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=yCeJN0E3Ngk" }
      ],
    "MD+1":
      [
        { name: "Inverse row TRX", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=AdLD9OoWUD4" },
        { name: "Two arms bench press", sets: 4, reps: 10, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=Ak0dUPdIHvg" },
        { name: "Joystick parallell", sets: 3, reps: 12, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=x0nCQ9vFyRI" },
        { name: "Chop half kneeling", sets: 4, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=jc83rck530A" },
        { name: "Pallof press parallell position", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=W55Zfup5TBs" },
        { name: "Plank Row", sets: 4, reps: 8, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=sTKNAVmjYOA" },

      ],
    "MD-1": [
      { name: "Jump rope", sets: 1, reps: "2 minute", difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=ETMZMVTzdak" },
      { name: "Light jogging", sets: 1, reps: "5 minute", difficulty: 1, videoUrl: "" },
      { name: "Push up box", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=3WHIh4dgYTQ" },
      { name: "Shoulder press", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/shorts/paKCDdBriJw" },
      { name: "Chins", sets: 1, reps: 3 + 3 + 3, difficulty: 3, videoUrl: "https://www.youtube.com/watch?v=fFBchpoJmDw&feature=youtu.be" },
      { name: "TRX inverse row", sets: 3, reps: 10, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=AdLD9OoWUD4" },
    ],
    "MD+2": [
      { name: "Hip Thrust", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=z5QkVMvxRFY" },
      { name: "Bosu landning", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/Pk8RZGAl-8s" },
      { name: "Landing one leg Bulgarian", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtube.com/shorts/cbsAHFkCZa8" },
      { name: "Lateral leg drop", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=_klo-HDjFXY" },
      { name: "Adductor squeeze", sets: 3, reps: "40 sec", difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=U9EdEUBDL8o" },
      { name: "Nordic hamstring", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/fe73TlD5s48" },
      { name: "Standing hamstring curls", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/7gq_xAu5ILo" },
      { name: "Deep Squat Wagle", sets: 3, reps: "30 sec", difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=JMMKI6DWS0k" },
      { name: "Hip Mobility", sets: 3, reps: "30 sec", difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=qqsvz6EuEYA" },
    ],
    "Speed Endurance": [
      { name: "Lateral lunge", sets: 4, reps: 12, difficulty: 1, videoUrl: "" },
      { name: "Staggered-stance,", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
    ],
    "Strength Endurance": [
      { name: "Lateral lunge", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/shorts/mIBEE-wcwwA" },
      { name: "Staggered-stance, one arm cable press", sets: 3, reps: 12, difficulty: 1, videoUrl: "" },
      { name: "Crossover and lateral step-up", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/shorts/_vzly87fwkc" },
      { name: "Band Nordic hamstring", sets: 3, reps: 10, difficulty: 2, videoUrl: "" },
      { name: "Single leg  back extension", sets: 3, reps: 8, difficulty: 2, videoUrl: "" },
      { name: "Single leg squat and row", sets: 3, reps: 8, difficulty: 2, videoUrl: "" },
      { name: "Push-up box", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=3WHIh4dgYTQ" },
      { name: "Single leg squat and reach around the clock", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://youtube.com/shorts/fWSsDV_v1-M" },
      { name: "Stability ball Hamstring combo", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://youtube.com/shorts/5Bj6N5Hy9HM" },
    ],
    "Plyo 2025-05-19 to 2025-06-15": [
      { name: "Clean", sets: 2, reps: 6, difficulty: 2, videoUrl: "https://youtube.com/shorts/0YvFiHRxDk0" },
      { name: "Sled", sets: 2, reps: 6, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=IDO9AL4QoEs" },
      { name: "Swing KB", sets: 2, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=1cVT3ee9mgU" },
      { name: "Single Leg box Jump", sets: 2, reps: 5, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=mhoxSr6Z_LI" },
      { name: "Half kneeling Chest Throw", sets: 2, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/shorts/HPFjGMPJCYE" },
      { name: "Tall kneeling Chest Throw", sets: 2, reps: 12, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=BSycoVc-pfk" },
      { name: "Bulgarian split squat jump", sets: 2, reps: 8 + 8, difficulty: 2, videoUrl: "https://youtube.com/shorts/RcXL6qC7tX4" },
      { name: "Trap Bar deadlift jump", sets: 2, reps: 5, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=-n2p5mQxYTw" },
    ],
    "Landing": [
      { name: "Landing one leg Bulgarian", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtube.com/shorts/cbsAHFkCZa8" },
      { name: "Landing one leg", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtube.com/shorts/fWSfNDHlsZA" },
      { name: "Landing one leg bosu", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/Pk8RZGAl-8s" },
    ],
    "Knee control Easy": [
      { name: "Two-legged squats with straight arms over the head", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=kkNzUKiaqBE&t=1s" },
      { name: "One-legged squats with hands on the hips", sets: 4, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/oVKsQRy1JhI" },
      { name: "Squats pair with ball kick", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=i51ALukNH94&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=OTY3MTQ" },
      { name: "Stationary lunge", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://youtu.be/Ej0PrPWs6TM" },
      { name: "Reverse lunge", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/RU2KftDWil0" },
      { name: "Two-legged jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/vqeuicSkVZQ" },
      { name: "Sideways skate jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/0BHS7V53CD4" },
      { name: "Dragonflag ecc only", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=QFAt1TLKl1w" },
      { name: "Pelvic lifts with both feet on the ground", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=7or7JzdeOMA" },
      { name: "Pelvic lift with ball between the knees", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=6gcwDIIFyeY" },
      { name: "Standing leg swing", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?time_continue=5&v=3LdeSKsUwNI&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=MTM5MTE3LDEzOTExNywyODY2Ng" },
      { name: "Single standing cross country skiing", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=hXNTCTLO168" },
    ],
    "Knee control Medium": [
      { name: "Stationary lunge steps with straight arms over the head with a ball", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://youtu.be/dhRd7AcPH9Q" },
      { name: "Sideways lunges", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/efKvQrtLSHk" },
      { name: "Fast feet with change of direction jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/9GwmuxZRD_A" },
      { name: "Jumps with push", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/kAyPzURSJJw" },
      { name: "Dead Bug alt lowering leg", sets: 3, reps: 8, videoUrl: "https://www.youtube.com/watch?v=UjYBUBv2MEA" },
      { name: "The dragon", sets: 3, reps: 8, videoUrl: "https://youtu.be/ei8rauYPNfk" },
      { name: "Pelvic lifts pair", sets: 3, reps: 10, videoUrl: "https://youtu.be/nywfCltW7Fo" },
      { name: "Adductor squeeze", sets: 3, reps: "40 sec", videoUrl: "https://www.youtube.com/watch?v=U9EdEUBDL8o" },
      { name: "Side plank with static activation of the groin", sets: 3, reps: "30 sec", videoUrl: "https://www.youtube.com/watch?v=kckXD5g03mU" },
    ],
    "Knee control Advanced": [
      { name: "Squat with resistence band around the knee", sets: 4, reps: 8, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=hdXYwz87Mzs&embeds_widget_referrer=https%3A%2F%2Faktiva.svenskfotboll.se%2F&embeds_referring_euri=https%3A%2F%2Fcdn.embedly.com%2F&embeds_referring_origin=https%3A%2F%2Fcdn.embedly.com&source_ve_path=OTY3MTQ" },
      { name: "Single leg squat with resistence band around the knee", sets: 4, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/q5tLPVZLhRg" },
      { name: "Lunge step with throw-in", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://youtu.be/vvR7y1PdHAk" },
      { name: "Walking sideways lunges  with band", sets: 3, reps: 12, difficulty: 2, videoUrl: "https://youtu.be/_r0y7eNBzBY" },
      { name: "Jumps with heading", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/d2EF4IbWDKg" },
      { name: "Shoulder bump jumps", sets: 3, reps: 15, difficulty: 1, videroUrl: "https://youtu.be/fQ-JYhoU1a0" },
      { name: "Copenhagen adduction", sets: 3, reps: 10, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=TDXueDsMJXs" },
      { name: "Standing adduction with band", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://aktiva.svenskfotboll.se/utbildning/tranarmaterial/digitala-bocker/knee-control/#/lessons/lX7TwVLkYE7dR6sL5m9neGYZoqHMlImC" },
      { name: "Nordic hamstring", sets: 3, reps: 8, difficulty: 1, videoUrl: "https://youtu.be/fe73TlD5s48" },
      { name: "Standing hamstring curls", sets: 3, reps: 8, diffiuculty: 1, videoUrl: "https://youtu.be/7gq_xAu5ILo" },
    ],
    "GK": [
      { name: "Clean", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
      { name: "Rotational snatch", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
      { name: "Single leg box jump", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
      { name: "Landmine one arm squat", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
      { name: "Rotational snatch", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
      { name: "Single leg box jump", sets: 3, reps: 10, difficulty: 1, videoUrl: "" },
    ],
    "Strength-Speed": [
      { name: "Clean", sets: 4, reps: 5, difficulty: 2, videoUrl: "https://youtube.com/shorts/0YvFiHRxDk0" },
      { name: "Front Squat", sets: 4, reps: 5, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=uYumuL_G_V0" },
      { name: "Box jump", sets: 4, reps: 5, difficulty: 1, videoUrl: "https://www.youtube.com/watch?v=NBY9-kTuHEk" },
      { name: "Plyometric Push Ups", sets: 4, reps: 6, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=GNVQos5I0qk" },
      { name: "Plyometric Inverted Rowh", sets: 4, reps: 6, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=XgaDWQB_B3g" },
      { name: "Single leg box jump (Landing with 2)", sets: 4, reps: 5, difficulty: 2, videoUrl: "https://www.youtube.com/watch?v=w5PUa6QYpe0" },
    ],

  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="workout-container">
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Preactivation">Preactivation</SelectItem>
          <SelectItem value="MD-1">MD-1</SelectItem>
          <SelectItem value="MD+1">MD+1</SelectItem>
          <SelectItem value="MD+2">MD+2</SelectItem>
          <SelectItem value="Plyo 2025-05-19 to 2025-06-15">Plyo</SelectItem>
          <SelectItem value="Strength Endurance">Strength Endurance</SelectItem>
          <SelectItem value="Speed Endurance">Speed Endurance</SelectItem>
          <SelectItem value="Landing">Landing</SelectItem>
          <SelectItem value="Knee control Easy">Knee control Easy</SelectItem>
          <SelectItem value="Knee control Medium">Knee control Medium</SelectItem>
          <SelectItem value="Knee control Advanced">Knee controll Advanced</SelectItem>
          <SelectItem value="GK">GK</SelectItem>
          <SelectItem value="Strength-Speed">Strength-Speed</SelectItem>
        </SelectContent>
      </Select>

      {selectedCategory && (
        <div className="table-container">
          <h2 className="category-title">{selectedCategory}</h2>
          <table className="workout-table">
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
              {workoutData[selectedCategory]?.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.name}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.reps}</td>
                  <td>{renderStars(exercise.difficulty)}</td>
                  <td>
                    {exercise.videoUrl ? (
                      <button className="video-button" onClick={() => setSelectedVideoUrl(exercise.videoUrl)}>
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

      {/* Modal per il video */}
      {selectedVideoUrl && (
        <div className="modal-overlay" onClick={() => setSelectedVideoUrl(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedVideoUrl(null)}>×</button>
            <iframe
              width="100%"
              height="400"
              src={getEmbedUrl(selectedVideoUrl)}
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
