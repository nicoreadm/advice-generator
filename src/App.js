import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  /* Variable con useState que sirve para que cambie de estado, es decir que muestre nueva informacion cuando se actualiza */
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  /*Funcion asincronica (no sucede al mismo tiempo), sirve para decirel a javascript que se va a ejecutar una tarea que tarda, pero puede ejecutar otras cosas mientras espera */
  async function getAdvice() {
    /*Declaro una variable*/
    /*Funcion para hacer solicitudes http */
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    /*Muestro el mensaje que recopile de la api en la consola */
    setAdvice(data.slip.advice);
    /*Suma para establecer la cantidad de veces que se mostró un advice*/
    setCount((c) => c + 1);
  }
  /*hago uso de useEffect para que cuando recarge la pagina me muestre la cantidad de advice que vi sin que se reinicie en 0 */
  useEffect(function () {
    getAdvice();
  }, []); /*Coloco un array vacio para que no se vaya de control los advice*/

  return (
    <div>
      {/*Entro en javascript mode con {} */}
      <h1>{advice}</h1>
      {/*Cada vez que haga click en el boton, entro en modo javascript {}, 
      y ejecuto la funcion */}
      <button onClick={getAdvice}>Get Advice</button>
      {/*asigno count como un prop */}
      <Message count={count} />
    </div>
  );
}
/*props es la forma de asignar un parametro a una funcion */
function Message(props) {
  return (
    /*creo una variable dinamica para mostrar la suma*/
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
