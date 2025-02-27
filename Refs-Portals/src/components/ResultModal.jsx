import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(props, ref) {
  const dialog = useRef();

  const userLost = props.remainingTime <= 0;
  const formattedRemainingTime = (props.remainingTime / 1000).toFixed(2);
  const score = Math.round(
    (1 - props.remainingTime / (props.targetTime * 1000)) * 100
  );

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>You Scroe : {score}</h2>}
      <p>
        the target time was <strong>{formattedRemainingTime} seconds.</strong>
      </p>
      <p>
        you stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={props.onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;

// export default function ResultModal(props) {
//   return (
//     <dialog ref={props.ref} className="result-modal">
//       <h2>You {result}</h2>
//       <p>
//         the target time was <strong>{props.targetTime} seconds.</strong>
//       </p>
//       <p>
//         you stopped the timer with <strong>X seconds left.</strong>
//       </p>
//       <form method="dialog">
//         <button>Close</button>
//       </form>
//     </dialog>
//   );
// }
