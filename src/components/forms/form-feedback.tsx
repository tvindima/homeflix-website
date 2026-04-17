import { FormStatus } from "@/lib/forms";

type FormFeedbackProps = {
  status: FormStatus;
  message?: string;
  errors?: string[];
  warnings?: string[];
};

export function FormFeedback({ status, message, errors = [], warnings = [] }: FormFeedbackProps) {
  if (status === "idle" && errors.length === 0 && warnings.length === 0 && !message) {
    return null;
  }

  return (
    <div className="space-y-2" aria-live="polite">
      {message ? <p className={`status-msg status-${status}`}>{message}</p> : null}
      {errors.length > 0 ? (
        <ul className="status-list status-error">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      {warnings.length > 0 ? (
        <ul className="status-list status-warning">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
