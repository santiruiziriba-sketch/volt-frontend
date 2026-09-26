import "./Main.css";
import RutinaForm from "../RutinaForm/RutinaForm";

function Main() {
  function handleGenerarRutina(datos) {
    console.log("Datos del formulario:", datos);
  }

  return (
    <main className="main">
      <h1 className="main__title">Armá tu rutina</h1>
      <RutinaForm onSubmit={handleGenerarRutina} />
    </main>
  );
}

export default Main;
