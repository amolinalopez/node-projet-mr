import "./App.css";
import { useState } from "react";

interface PointRelais {
  cp: string;
  ville: string;
  adresse: string;
  name: string;
  num: string;
  photo: string;
  plan: string;
  pays: string;
}

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [pointsRelais, setPointsRelais] = useState<PointRelais[]>([]);
  

  console.log(pointsRelais);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const CP: string = e.target.elements.CP.value;
    const Ville: string = e.target.elements.Ville.value;
    const Pays: string = e.target.elements.Pays.value;
    const NombreResultats: string = e.target.elements.NombreResultats.value;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/pointRelais?${Pays && `&Pays=${Pays}`}${
          Ville && `&Ville=${Ville}`
        }${CP && `&CP=${CP}`}&NombreResultats=${NombreResultats}`
      );
      const data = await response.json();

      if(response.ok ){
        setIsError(false)
        setPointsRelais(data);
      }else {
        setIsError(true)
        setErrorMsg(data.msg);
      }


      setLoading(false);
    } catch (error) {
      console.log("test");

      console.error("Failed to fetch points relais:", error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content new" id="one">
      <header>
        <div className="grid">
          <div className="row">
            <nav className="menu">
              <ul className="navigation">
                <li>
                  <img
                    src="https://www.mondialrelay.fr/media/123438/logomondial-relay.svg"
                    alt="Mondial Relay Loo"
                    width={200}
                  />
                </li>
                <li>
                  <a href="#">
                    Suivi de colis
                  </a>
                </li>
                <li>
                  <a href="#">
                    Envoi de colis
                  </a>
                </li>
                <li >
                  <a  href="#">
                    Point Relais
                  </a>
                </li>
                <li>
                  <a href="#">
                    Aide
                  </a>
                </li>
                <li>
                  <a
                    className="btn btn-primary btn-light mt0"
                    href="/solutionspro/"
                  ></a>
                </li>
                <li className="visible-xs"></li>
              </ul>
            </nav>
          </div>
        </div>
        <div id="bandeau"></div>
      </header>

      <h1>Trouver votre Point Relais®</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="input-container">
        <input 
          maxLength={5}
          minLength={5}
          type="text" 
          id="CP" 
          placeholder="Code Postal" 
        />
        <input 
          type="text" 
          id="Ville" 
          placeholder="Ville" 
        />
        <select id="Pays">
        <option value="">Choisissez un pays</option>
          <option value="FR">France</option>
        </select>
        <input
          type="number"
          id="NombreResultats"
          placeholder="Resultats"
          required
        />
        <button className="button" disabled={loading}>
          Trouver
        </button>
      </form>
      {loading && <p className="loading">Chargement en cours...</p>}
      {isError && (
        <p className="error">{errorMsg}</p>
      )}
      {pointsRelais.length > 0 && (
        <div className="relais-container">
          {pointsRelais.map((el, index) => (
            <div className="relais-item" key={index}>
              <div className="relais-info">
                <div className="relais-title">
                  <div className="relais-id">{index + 1}</div>
                  <h1>{el.name}</h1>
                </div>
                <h2>{el.adresse}</h2>
                <p>
                  {el.cp} - {el.ville}
                </p>
                <span>
                  {el.pays}-{el.num}
                </span>
              </div>
              <div className="relais-photo">
                <div>
                  <h3>Photo :</h3>

                  {el.photo ? (
                    <img src={el.photo} alt="image du relais" />
                  ) : (
                    <p>Pas d'image disponible !</p>
                  )}
                </div>

                <div>
                  <h3>Plan : </h3>
                  <div className="container-iframe">
                    <iframe
                      id={`plan ${el.ville}`}
                      title={`point relais ${el.ville}`}
                      className="iframe"
                      width="420"
                      height="260"
                      src={el.plan}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
