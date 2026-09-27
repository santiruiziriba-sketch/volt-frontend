import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RutinaPage.css";
import Preloader from "../Preloader/Preloader";
import { fetchExercises } from "../../utils/ExerciseApi";
import {
  obtenerConfiguracionObjetivo,
  DIFICULTAD_POR_NIVEL,
} from "../../utils/trainingConfig";

const ITEMS_POR_PAGINA = 3;

function RutinaPage() {
  const location = useLocation();
  const datos = location.state;

  const [cargando, setCargando] = useState(true);
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState(false);
  const [cantidadVisible, setCantidadVisible] = useState(ITEMS_POR_PAGINA);

  useEffect(() => {
    const datosActuales =
      datos ?? JSON.parse(localStorage.getItem("volt-rutina-datos") || "null");

    if (!datosActuales) {
      setCargando(false);
      return;
    }

    const guardado = localStorage.getItem("volt-rutina-ejercicios");
    const mismosDatos =
      JSON.stringify(datosActuales) ===
      localStorage.getItem("volt-rutina-datos");

    if (!datos && guardado && mismosDatos) {
      setEjercicios(JSON.parse(guardado));
      setCargando(false);
      return;
    }

    const config = obtenerConfiguracionObjetivo(datosActuales.objetivo);
    if (!config) {
      setCargando(false);
      return;
    }

    setCargando(true);
    setError(false);

    fetchExercises({
      type: config.tipoEjercicio,
      difficulty: DIFICULTAD_POR_NIVEL[datosActuales.nivel],
      equipments: datosActuales.equipamiento,
    })
      .then((resultado) => {
        setEjercicios(resultado);
        setCargando(false);
        localStorage.setItem(
          "volt-rutina-datos",
          JSON.stringify(datosActuales),
        );
        localStorage.setItem(
          "volt-rutina-ejercicios",
          JSON.stringify(resultado),
        );
      })
      .catch(() => {
        setError(true);
        setCargando(false);
      });
  }, [datos]);

  function mostrarMas() {
    setCantidadVisible((actual) => actual + ITEMS_POR_PAGINA);
  }

  const ejerciciosVisibles = ejercicios.slice(0, cantidadVisible);
  const hayMasParaMostrar = cantidadVisible < ejercicios.length;

  return (
    <section className="rutina-page">
      <h1 className="rutina-page__title">Tu rutina</h1>

      {cargando && <Preloader />}

      {!cargando && error && (
        <p className="rutina-page__empty">
          Lo sentimos, algo ha salido mal durante la solicitud. Es posible que
          haya un problema de conexión o que el servidor no funcione. Por favor,
          inténtalo más tarde.
        </p>
      )}

      {!cargando && !error && ejercicios.length === 0 && (
        <p className="rutina-page__empty">No se ha encontrado nada.</p>
      )}

      {!cargando && !error && ejercicios.length > 0 && (
        <>
          <ul className="rutina-page__list">
            {ejerciciosVisibles.map((ej, index) => (
              <li key={index} className="exercise-card">
                <h2 className="exercise-card__name">{ej.name}</h2>
                <p className="exercise-card__muscle">{ej.muscle}</p>
                <p className="exercise-card__text">
                  {ej.instructions || ej.safety_info}
                </p>
                {ej.equipments?.length > 0 && (
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
