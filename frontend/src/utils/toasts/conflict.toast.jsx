import toast from "react-hot-toast";

// Show conflict toast with "View conflict" button
export const showConflictToast = (onViewConflict) => {
  toast.custom(
    (t) => (
      <div className="mt-14 bg-red-500 text-white p-3 rounded-lg shadow-lg flex items-center justify-between gap-3">
        <span>Conflict Found</span>

        <button
          className="underline font-medium"
          onClick={() => {
            toast.dismiss(t.id);
            onViewConflict(); // Open the modal
          }}
        >
          View conflict
        </button>
      </div>
    ),
    {
      duration: 5000, // Auto dismiss after 5 seconds
    }
  );
};
