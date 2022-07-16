import { createSignal } from "solid-js";
import "./Counter.scss";

export default function Counter({ children }) {
  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);
  const subtract = () => setCount(count() - 1);

  return (
    <>
      <div class="counter-message">{children}</div>
      <div class="counter">
        <button onClick={subtract}> - </button>
        <pre>{count()}</pre>
        <button onClick={add}> + </button>
      </div>
    </>
  );
}
