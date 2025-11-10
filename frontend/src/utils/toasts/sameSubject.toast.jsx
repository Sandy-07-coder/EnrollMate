import toast from "react-hot-toast";

// Show same subject toast
export const showSameSubjectToast = () => {
  toast.custom(
    (t) => (
      <div className="mt-14 bg-orange-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-between gap-3">
        <span>You already have a course from this subject!</span>
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
