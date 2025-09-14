import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegDotCircle } from 'react-icons/fa';
import '../styles/Exercise.css';

const Exercise = () => {
  const { id } = useParams();

  const [exercise, setExercise] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
 
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  const fetchData = async (id) => {
    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
      headers: {
        'X-RapidAPI-Key': 'e5d0ca338dmsh247bbb8dbd370eap108d65jsn0d29b4cd7b1b',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setExercise(response.data);
    
      setRelatedVideos(response.data.name)
    }catch (error) {
    }
  } 
   return (
    <div className="exercise-page">
      {exercise && (
        <div className="exercise-container">

          {/* Exercise Image */}
          <div className="exercise-image">
            <img src={exercise.gifUrl} alt={"exercise img"} />
          </div>

          {/* Exercise Data */}
          <div className="exercise-data">
            <h3>{exercise.name}</h3>
            <span>
              <b>Target:</b>
              <p>{exercise.target}</p>
            </span>
            <span>
              <b>Equipment:</b>
              <p>{exercise.equipment}</p>
            </span>
            {exercise.secondaryMuscles?.length > 0 && (
              <span>
                <b>Secondary Muscles:</b>
                <ul>
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <li key={index}>{muscle}</li>
                  ))}
                </ul>
              </span>
            )}
          </div>

          {/* Instructions */}
          {exercise.instructions?.length > 0 && (
            <div className="exercise-instructions">
              <h3>Instructions</h3>
              <ul>
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Related Videos */}
      {relatedVideos?.length > 0 && (
        <div className="exercise-videos">
          <h3>Watch Related Videos</h3>
          <div className="videos-list">
            {relatedVideos.slice(0, 3).map((video, index) => (
              video.video && (
                <a
                  key={index}
                  href={`https://www.youtube.com/watch?v=${video.video.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={video.video.thumbnails[0]?.url}
                    alt={video.video.title}
                  />
                  <p>{video.video.title}</p>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;