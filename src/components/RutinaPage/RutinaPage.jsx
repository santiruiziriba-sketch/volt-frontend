import { useState, useEffect } from "react";
import "./RutinaPage.css";
import Preloader from "../Preloader/Preloader";
import { SAMPLE_EXERCISES, EMPTY_RESULTS } from "../../utils/sampleExercises";

const ITEMS_POR_PAGINA = 3;

function RutinaPage() {
  const [cargando, setCargando] = useState(true);
  const [ejercicios, setEjercicios] = useState([]);
  const [cantidadVisible, setCantidadVisible] = useState(ITEMS_POR_PAGINA);

  useEffect(() => {
    setCargando(true);
    const timer = setTimeout(() => {
      setEjercicios(SAMPLE_EXERCISES);
      setCargando(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  function mostrarMas() {
    setCantidadVisible((actual) => actual + ITEMS_POR_PAGINA);
  }

  const ejerciciosVisibles = ejercicios.slice(0, cantidadVisible);
  const hayMasParaMostrar = cantidadVisible < ejercicios.length;

  return (
    <section className="rutina-page">
      <h1 className="rutina-page__title">Tu rutina</h1>

      {cargando && <Preloader />}

      {!cargando && ejercicios.length === 0 && (
        <p className="rutina-page__empty">No se ha encontrado nada.</p>
      )}

      {!cargando && ejercicios.length > 0 && (
        <>
          <ul className="rutina-page__list">
            {ejerciciosVisibles.map((ej, index) => (
              <li key={index} className="exercise-card">
                <h2 className="exercise-card__name">{ej.name}</h2>
                <p className="exercise-card__muscle">{ej.muscle}</p>
                <p className="exercise-card__text">
                  {ej.instructions || ej.safety_info}
                </p>
                {ej.equipments.length > 0 && (
                  <p className="exercise-card__equipment">
                    Equipo: {ej.equipments.join(", ")}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {hayMasParaMostrar && (
            <button
              type="button"
              className="rutina-page__more"
              onClick={mostrarMas}
            >
              Mostrar más
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default RutinaPage;
