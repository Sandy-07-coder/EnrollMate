import toast from "react-hot-toast";

// Show success toast
export const showSuccessToast = (message = "Course added successfully!") => {
  toast.custom(
    (t) => (
      <div className="mt-14 bg-green-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-between gap-3">
        <span>{message}</span>
        <button
          className="underline font-medium"
          onClick={() => toast.dismiss(t.id)}
        >
          Dismiss
        </button>
      </div>
    ),
    {
      duration: 2000,
    }
  );
};
