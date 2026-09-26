export const OBJETIVOS = {
  musculacion: {
    nombre: "Musculación",
    tipoEjercicio: "strength",
    series: 4,
    repeticiones: "8-12",
    descansoSegundos: 60,
  },
  fuerza: {
    nombre: "Fuerza",
    tipoEjercicio: "strength",
    series: 5,
    repeticiones: "3-6",
    descansoSegundos: 120,
  },
  resistencia: {
    nombre: "Resistencia",
    tipoEjercicio: "cardio",
    series: 3,
    repeticiones: "15-20",
    descansoSegundos: 30,
  },
  potencia: {
    nombre: "Potencia",
    tipoEjercicio: "olympic_weightlifting",
    series: 5,
    repeticiones: "3-5",
    descansoSegundos: 90,
  },
  velocidad: {
    nombre: "Velocidad",
    tipoEjercicio: "plyometrics",
    series: 4,
    repeticiones: "5-8",
    descansoSegundos: 90,
  },
  explosividad: {
    nombre: "Explosividad",
    tipoEjercicio: "plyometrics",
    series: 4,
    repeticiones: "6-10",
    descansoSegundos: 75,
  },
  futbol: {
    nombre: "Fútbol / Futsal",
    tipoEjercicio: "plyometrics",
    series: 4,
    repeticiones: "8-10",
    descansoSegundos: 60,
  },
  handball: {
    nombre: "Handball",
    tipoEjercicio: "plyometrics",
    series: 4,
    repeticiones: "8-10",
    descansoSegundos: 60,
  },
  basquet: {
    nombre: "Básquet",
    tipoEjercicio: "plyometrics",
    series: 4,
    repeticiones: "8-10",
    descansoSegundos: 60,
  },
};

export const NIVELES = {
  principiante: { volumenMultiplicador: 0.7 },
  intermedio: { volumenMultiplicador: 1 },
  avanzado: { volumenMultiplicador: 1.3 },
};

export const DIFICULTAD_POR_NIVEL = {
  principiante: "beginner",
  intermedio: "intermediate",
  avanzado: "expert",
};

export function obtenerConfiguracionObjetivo(idObjetivo) {
  return OBJETIVOS[idObjetivo] ?? null;
}
