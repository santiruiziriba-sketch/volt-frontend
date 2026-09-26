import { useState } from "react";
import "./Main.css";
import Modal from "../Modal/Modal";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="main">
      <h1 className="main__title">Armá tu rutina</h1>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Probar modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal de prueba"
      >
        <p>Este es el contenido del modal.</p>
      </Modal>
    </main>
  );
}

export default Main;
