const BASE_URL = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = import.meta.env.VITE_EXERCISE_API_KEY;

export function fetchExercises({ type, muscle, difficulty, equipments }) {
  const params = new URLSearchParams();
  if (type) params.append("type", type);
  if (muscle) params.append("muscle", muscle);
  if (difficulty) params.append("difficulty", difficulty);
  if (equipments) params.append("equipments", equipments);

  return fetch(`${BASE_URL}?${params.toString()}`, {
    headers: { "X-Api-Key": API_KEY },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error(`Error ${res.status}`));
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error al pedir ejercicios:", err);
      throw err;
    });
}
