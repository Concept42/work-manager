import React, { useEffect, useState } from "react";
import { setErrorMessage } from "../../slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";

interface Props {
  errorMessage?: string;
  successMessage?: string;
}

function Toast({ errorMessage, successMessage }: Props) {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>("");
  const globalError = useAppSelector((state) => state.userContext.error);

  useEffect(() => {
    setError(globalError);
  }, [globalError]);
  return (
    <>
      {error !== "" ? (
        <div className="toast flex toast-center z-40">
          {error ? (
            <div className="alert flex alert-error">
              <div>
                <span>{error}</span>
              </div>
            </div>
          ) : (
            ""
          )}
          {successMessage ? (
            <div className="alert alert-success">
              <div>
                <span>{successMessage}</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Toast;
