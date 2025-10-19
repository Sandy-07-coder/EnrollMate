/**
 * @fileoverview NotificationModal - User notification system
 * @description Attractive modal for displaying notifications (replaces browser alerts)
 */

import React from "react";

/**
 * NotificationModal Component
 * Modal for displaying user notifications with type-specific styling
 *
 * Features:
 * - Four notification types (success, error, warning, info)
 * - Color-coded icons and buttons
 * - Animated entrance (fadeIn and slideUp)
 * - Replaces browser alerts for better UX
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal closes
 * @param {string} props.type - Notification type: "success", "error", "warning", or "info"
 * @param {string} props.title - Notification title
 * @param {string} props.message - Notification message
 * @returns {JSX.Element|null} NotificationModal component or null if closed
 */
const NotificationModal = ({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
}) => {
  if (!isOpen) return null;

  /**
   * Gets icon and color scheme based on notification type
   * @returns {Object} Icon JSX element and color classes
   */
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return {
          icon: (
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500",
        };
      case "error":
        return {
          icon: (
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500",
        };
      case "warning":
        return {
          icon: (
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500",
        };
      default: // info
        return {
          icon: (
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500",
        };
    }
  };

  const { icon, color, bgColor, borderColor } = getIconAndColor();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full transform transition-all animate-slideUp">
        {/* Icon Section */}
        <div className={`flex justify-center pt-8 pb-4`}>
          <div
            className={`${bgColor} ${borderColor} border-2 rounded-full p-3 ${color}`}
          >
            {icon}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Button Section */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              type === "success"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : type === "error"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : type === "warning"
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
