import toast from "react-hot-toast";

// Show duplicate course toast
export const showDuplicateToast = () => {
  toast.custom(
    (t) => (
      <div className="mt-14 bg-yellow-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-between gap-3">
        <span>This course is already in your timetable!</span>
        <button
          className="underline font-medium"
          onClick={() => toast.dismiss(t.id)}
        >
          Dismiss
        </button>
      </div>
    ),
    {
      duration: 3000,
    }
  );
};
