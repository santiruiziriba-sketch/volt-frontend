import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RutinaPage.css";
import Preloader from "../Preloader/Preloader";
import { fetchExercises } from "../../utils/ExerciseApi";
import { armarRutina } from "../../utils/routineBuilder";
import {
  obtenerConfiguracionObjetivo,
  DIFICULTAD_POR_NIVEL,
} from "../../utils/trainingConfig";

const ITEMS_POR_PAGINA = 3;
const CLAVE_STORAGE = "volt-rutina";

function RutinaPage() {
  const location = useLocation();
  const datos = location.state;

  const [cargando, setCargando] = useState(true);
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState(false);
  const [cantidadVisible, setCantidadVisible] = useState(ITEMS_POR_PAGINA);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "null");
    const datosActuales = datos ?? guardado?.datos;

    if (!datosActuales) {
      setCargando(false);
      return;
    }

    const mismosDatos =
      guardado &&
      JSON.stringify(guardado.datos) === JSON.stringify(datosActuales);

    if (mismosDatos && guardado.rutina) {
      setEjercicios(guardado.rutina);
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

    Promise.all(
      config.bloques.map((bloque) =>
        fetchExercises({
          type: bloque.tipoEjercicio,
          difficulty: DIFICULTAD_POR_NIVEL[datosActuales.nivel],
          equipments: datosActuales.equipamiento,
        }),
      ),
    )
      .then((pools) => {
        const rutina = armarRutina({
          config,
          pools,
          dias: datosActuales.dias,
          nivel: datosActuales.nivel,
        });
        setEjercicios(rutina);
        setCantidadVisible(ITEMS_POR_PAGINA);
        setCargando(false);
        localStorage.setItem(
          CLAVE_STORAGE,
          JSON.stringify({ datos: datosActuales, rutina }),
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
              <li
                key={`${ej.dia}-${ej.name}-${index}`}
                className="exercise-card"
              >
                <p className="exercise-card__day">Día {ej.dia}</p>
                <h2 className="exercise-card__name">{ej.name}</h2>
                <p className="exercise-card__muscle">{ej.muscle}</p>
                <p className="exercise-card__prescription">
                  {ej.series} series x {ej.repeticiones} · descanso{" "}
                  {ej.descansoSegundos} seg
                </p>
                <p className="exercise-card__text">
                  {ej.instructions || ej.safety_info}
                </p>
                <p className="exercise-card__equipment">
                  Equipo:{" "}
                  {ej.equipments?.length > 0
                    ? ej.equipments.join(", ")
                    : "Sin equipo"}
                </p>
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
