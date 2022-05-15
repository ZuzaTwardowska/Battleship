import { Dispatch, SetStateAction } from "react";

interface ErrorComponentProps {
  closeToast: Dispatch<SetStateAction<boolean>>;
}

const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <div className="errorDiv">
      <button onClick={() => props.closeToast(false)}>X</button>
      <p>An error occurred.</p>
    </div>
  );
};

export default ErrorComponent;
