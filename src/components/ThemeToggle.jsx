/**
 * @fileoverview ThemeToggle component - Example usage of useLocalStorage hook
 * @description Demonstrates how to use useLocalStorage to persist theme preference
 */

import { useLocalStorage } from "../utils/hooks";
import "../App.css";

/**
 * ThemeToggle Component
 *
 * Example component demonstrating useLocalStorage hook usage.
 * Remembers the user's theme preference (light/dark) between page reloads.
 *
 * @returns {JSX.Element} Theme toggle button with persistent state
 */
const ThemeToggle = () => {
  // Use the custom useLocalStorage hook to persist theme preference
  // Key: 'theme' - the localStorage key where data is stored
  // Initial value: 'light' - default theme if no preference is stored
  const [theme, setTheme] = useLocalStorage("theme", "light");

  /**
   * Toggle between light and dark themes
   * The new value is automatically saved to localStorage
   */
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /**
   * Apply theme class to document body for global styling
   * This effect runs whenever the theme changes
   */
  if (typeof document !== "undefined") {
    document.body.className = theme;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
        color: theme === "light" ? "#000000" : "#ffffff",
        transition: "all 0.3s ease",
      }}
    >
      <h2>Theme Preference Demo</h2>
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <p>
        This preference is stored in localStorage and will persist even after
        closing and reopening the browser.
      </p>

      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: theme === "light" ? "#007bff" : "#ffc107",
          color: theme === "light" ? "#ffffff" : "#000000",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: theme === "light" ? "#f0f0f0" : "#2a2a2a",
          borderRadius: "5px",
        }}
      >
        <h3>How it works:</h3>
        <ol style={{ textAlign: "left", maxWidth: "600px" }}>
          <li>
            The <code>useLocalStorage</code> hook reads from localStorage on
            mount
          </li>
          <li>When you click the button, the theme state updates</li>
          <li>The hook automatically saves the new value to localStorage</li>
          <li>Reload the page - your preference is remembered!</li>
        </ol>
      </div>
    </div>
  );
};

/**
 * Additional example: Storing complex objects
 *
 * @example
 * const UserPreferences = () => {
 *     // Store complex user preferences object
 *     const [preferences, setPreferences] = useLocalStorage('userPreferences', {
 *         fontSize: 16,
 *         language: 'en',
 *         notifications: true,
 *         displayMode: 'grid'
 *     });
 *
 *     const updateFontSize = (newSize) => {
 *         setPreferences({ ...preferences, fontSize: newSize });
 *     };
 *
 *     return (
 *         <div>
 *             <p>Font Size: {preferences.fontSize}px</p>
 *             <button onClick={() => updateFontSize(preferences.fontSize + 2)}>
 *                 Increase Font
 *             </button>
 *         </div>
 *     );
 * };
 */

export default ThemeToggle;
