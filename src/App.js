import "./App.css";

function App() {
  // Fonction pour gérer le clic sur le bouton d'envoi
  function handleClick() {
    // Récupérer l'élément input par son ID
    let input = document.getElementById("input");
    // Convertir la valeur de l'input en minuscules et supprimer les caractères non alphabétiques
    const value = input.value.toLowerCase();
    const lastWord = value
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase()
      .trim();

    // Vérifier si le dernier mot de l'input se termine par "quoi"
    if (lastWord.endsWith("quoi")) {
      // Afficher et lire la vidéo
      let video = document.querySelector("video");
      video.style.display = "block";

      video.play();

      // Cacher la vidéo à la fin de la lecture et réinitialiser l'input
      video.onended = function () {
        video.style.display = "none";
        input.value = "";
      };
    } else {
      // Afficher un message indiquant qu'aucun "quoicoubeh" n'a été détecté
      let noquoicoubeh = document.getElementById("noquoicoubeh");
      noquoicoubeh.style.display = "block";
      setTimeout(() => {
        noquoicoubeh.style.display = "none";
      }, 2000);
    }
  }

  // Fonction pour gérer l'entrée dans le champ de texte
  function handleTextAreaInput(event) {
    const element = document.getElementById("input");

    // Ajuster la hauteur de la zone de texte en fonction des entrées et des retours
    if (event.shiftKey && event.key === "Enter") {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    } else if (event.shiftKey && event.key === "Backspace") {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight - 28}px`;
    }
  }

  // Retourner le JSX pour l'application
  return (
    <>
      <h1>Quoicoubeh detector</h1>

      <video controls>
        <source src="/quoicoubeh.mp4" type="video/mp4" />
      </video>

      <p id="noquoicoubeh">Pas de quoicoubeh detecté</p>

      <div className="input">
        <textarea
          id="input"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleClick();
            }
            handleTextAreaInput(event);
          }}
          autoComplete="off"
        />
        <img src="/send.png" onClick={handleClick} alt="logo" />
      </div>
    </>
  );
}

export default App;
