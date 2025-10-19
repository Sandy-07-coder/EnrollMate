/**
 * @fileoverview localStorage Testing Guide
 * @description Instructions for testing the localStorage persistence feature
 */

// ============================================================================
// TESTING GUIDE: localStorage Persistence
// ============================================================================

/*
 * This file contains instructions and code snippets for testing the 
 * localStorage persistence feature in the Course Enrollment System.
 */

// ============================================================================
// 1. BROWSER CONSOLE TESTING
// ============================================================================

// View all stored data in localStorage
function viewAllStoredData() {
    console.group('📦 localStorage Data');

    // Available Courses
    const availableCourses = localStorage.getItem('availableCourses');
    console.log('Available Courses:',
        availableCourses ? JSON.parse(availableCourses) : 'No data');

    // Selected Courses
    const selectedCourses = localStorage.getItem('selectedCourses');
    console.log('Selected Courses:',
        selectedCourses ? JSON.parse(selectedCourses) : 'No data');

    // Theme (if using ThemeToggle component)
    const theme = localStorage.getItem('theme');
    console.log('Theme:', theme ? JSON.parse(theme) : 'No data');

    console.groupEnd();
}

// Check storage size
function checkStorageSize() {
    console.group('📊 Storage Size');

    const availableCoursesData = localStorage.getItem('availableCourses') || '';
    const selectedCoursesData = localStorage.getItem('selectedCourses') || '';

    const availableSize = new Blob([availableCoursesData]).size;
    const selectedSize = new Blob([selectedCoursesData]).size;
    const totalSize = availableSize + selectedSize;

    console.log(`Available Courses: ${(availableSize / 1024).toFixed(2)} KB`);
    console.log(`Selected Courses: ${(selectedSize / 1024).toFixed(2)} KB`);
    console.log(`Total: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`Limit: ~5-10 MB (varies by browser)`);

    console.groupEnd();
}

// Clear all course data
function clearAllCourseData() {
    console.warn('🗑️ Clearing all course data from localStorage...');
    localStorage.removeItem('availableCourses');
    localStorage.removeItem('selectedCourses');
    console.log('✅ Course data cleared. Refresh the page to see changes.');
}

// Export data (for backup)
function exportCourseData() {
    const data = {
        availableCourses: JSON.parse(localStorage.getItem('availableCourses') || '[]'),
        selectedCourses: JSON.parse(localStorage.getItem('selectedCourses') || '[]'),
        exportDate: new Date().toISOString()
    };

    console.log('📤 Exported Course Data:');
    console.log(JSON.stringify(data, null, 2));

    // Create downloadable file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    console.log('✅ Download started!');
}

// Import data (from backup)
function importCourseData(jsonData) {
    try {
        const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        if (data.availableCourses) {
            localStorage.setItem('availableCourses', JSON.stringify(data.availableCourses));
            console.log('✅ Available courses imported');
        }

        if (data.selectedCourses) {
            localStorage.setItem('selectedCourses', JSON.stringify(data.selectedCourses));
            console.log('✅ Selected courses imported');
        }

        console.log('✅ Import complete! Refresh the page to see changes.');
    } catch (error) {
        console.error('❌ Import failed:', error);
    }
}

// ============================================================================
// 2. MANUAL TESTING STEPS
// ============================================================================

/*
TEST 1: Available Courses Persistence
--------------------------------------
1. Open the application
2. Click "Add Course" button
3. Fill in course details:
   - Course Name: "Introduction to Computer Science"
   - Staff: "Dr. Smith"
   - Credits: 3
   - Select time slots: Monday 9:00-10:00, Wednesday 9:00-10:00
4. Save the course
5. Open browser console and run: viewAllStoredData()
6. Verify the course appears in availableCourses
7. Refresh the page (F5 or Ctrl+R)
8. Click "Select Available Course" button
9. Verify the course is still there
10. Close the browser completely
11. Reopen the browser and navigate to the app
12. Verify the course persists

Expected Result: ✅ Course data persists across all reloads


TEST 2: Selected Courses Persistence
-------------------------------------
1. Open the application
2. Click "Select Available Course"
3. Select a course (e.g., "Introduction to Computer Science")
4. Choose a staff member
5. Click "Select Course"
6. Verify the course appears in:
   - The course list (sidebar)
   - The timetable (with color coding)
7. Open browser console and run: viewAllStoredData()
8. Verify the course appears in selectedCourses with color
9. Refresh the page (F5 or Ctrl+R)
10. Verify:
    - Course still appears in the list
    - Course still appears in the timetable
    - Color is preserved
11. Close and reopen the browser
12. Verify everything is still there

Expected Result: ✅ Selected courses and their colors persist


TEST 3: Multiple Courses with Conflict Detection
-------------------------------------------------
1. Select multiple courses (3-4 courses)
2. Ensure some have different time slots
3. Refresh the page
4. Try to select a course with conflicting time slots
5. Verify conflict detection still works after reload

Expected Result: ✅ Conflict detection works with persisted data


TEST 4: Remove Course Persistence
----------------------------------
1. Have at least 2 courses selected
2. Remove one course (click the X button)
3. Open console and run: viewAllStoredData()
4. Verify the removed course is gone from localStorage
5. Refresh the page
6. Verify the removed course doesn't reappear

Expected Result: ✅ Removal persists across reloads


TEST 5: Staff Options Persistence
----------------------------------
1. Add a new course: "Data Structures"
2. Add staff: "Prof. Johnson"
3. Add another staff to the same course: "Dr. Williams"
4. Refresh the page
5. Click "Select Available Course"
6. Open "Data Structures"
7. Verify both staff options are available

Expected Result: ✅ Multiple staff options persist


TEST 6: Clear Data
------------------
1. Have several courses selected
2. Open browser console
3. Run: clearAllCourseData()
4. Refresh the page
5. Verify all data is cleared

Expected Result: ✅ Data clears successfully


TEST 7: Export/Import Data
---------------------------
1. Set up some courses (both available and selected)
2. Open console and run: exportCourseData()
3. Save the downloaded JSON file
4. Run: clearAllCourseData()
5. Refresh the page (should be empty)
6. Open the JSON file in a text editor
7. Copy the content
8. In console, run: importCourseData(/* paste JSON here *\/)
9. Refresh the page
10. Verify all data is restored

Expected Result: ✅ Export/import works correctly
*/

// ============================================================================
// 3. AUTOMATED TEST SCENARIOS (for future test suite)
// ============================================================================

const testScenarios = {
    // Test 1: Basic persistence
    async testBasicPersistence() {
        // Add course
        const course = {
            id: 1,
            courseName: "Test Course",
            staff: "Test Staff",
            credits: 3,
            selectedSlots: ["Monday-9:00-10:00"]
        };

        localStorage.setItem('selectedCourses', JSON.stringify([course]));

        // Simulate reload
        const stored = JSON.parse(localStorage.getItem('selectedCourses'));

        // Verify
        return stored.length === 1 && stored[0].courseName === "Test Course";
    },

    // Test 2: Data integrity
    async testDataIntegrity() {
        const originalData = {
            availableCourses: [
                { id: 1, courseName: "Course 1" },
                { id: 2, courseName: "Course 2" }
            ],
            selectedCourses: [
                { id: 1, courseName: "Selected 1", color: "#FF6B6B" }
            ]
        };

        // Store
        localStorage.setItem('availableCourses', JSON.stringify(originalData.availableCourses));
        localStorage.setItem('selectedCourses', JSON.stringify(originalData.selectedCourses));

        // Retrieve
        const retrievedAvailable = JSON.parse(localStorage.getItem('availableCourses'));
        const retrievedSelected = JSON.parse(localStorage.getItem('selectedCourses'));

        // Verify
        return JSON.stringify(retrievedAvailable) === JSON.stringify(originalData.availableCourses) &&
            JSON.stringify(retrievedSelected) === JSON.stringify(originalData.selectedCourses);
    },

    // Test 3: Error handling
    async testErrorHandling() {
        // Store invalid JSON
        localStorage.setItem('selectedCourses', 'invalid json {]');

        try {
            JSON.parse(localStorage.getItem('selectedCourses'));
            return false; // Should have thrown error
        } catch (error) {
            // Error caught - good!
            // Clean up
            localStorage.removeItem('selectedCourses');
            return true;
        }
    }
};

// Run all tests
async function runAllTests() {
    console.group('🧪 Running localStorage Tests');

    for (const [testName, testFunc] of Object.entries(testScenarios)) {
        try {
            const result = await testFunc();
            console.log(`${result ? '✅' : '❌'} ${testName}: ${result ? 'PASSED' : 'FAILED'}`);
        } catch (error) {
            console.error(`❌ ${testName}: ERROR - ${error.message}`);
        }
    }

    console.groupEnd();
}

// ============================================================================
// 4. DEBUGGING HELPERS
// ============================================================================

// Watch for localStorage changes
function watchLocalStorage() {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
        console.log(`📝 localStorage.setItem('${key}', ...)`);
        console.log('Value:', JSON.parse(value));
        originalSetItem.apply(this, arguments);
    };

    console.log('👁️ Now watching localStorage changes...');
}

// Restore original localStorage.setItem
function unwatchLocalStorage() {
    // This would need the original function stored
    console.log('⚠️ Refresh the page to restore original localStorage.setItem');
}

// ============================================================================
// 5. PERFORMANCE TESTING
// ============================================================================

function testLargeDataset() {
    console.group('⚡ Performance Test: Large Dataset');

    // Create large dataset
    const largeCourseList = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        courseName: `Course ${i + 1}`,
        staff: `Staff ${i + 1}`,
        credits: 3,
        selectedSlots: [`Monday-${9 + (i % 8)}:00-${10 + (i % 8)}:00`],
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }));

    // Test write performance
    console.time('Write Time');
    localStorage.setItem('test_large_dataset', JSON.stringify(largeCourseList));
    console.timeEnd('Write Time');

    // Test read performance
    console.time('Read Time');
    const retrieved = JSON.parse(localStorage.getItem('test_large_dataset'));
    console.timeEnd('Read Time');

    // Check size
    const size = new Blob([localStorage.getItem('test_large_dataset')]).size;
    console.log(`Dataset size: ${(size / 1024).toFixed(2)} KB`);
    console.log(`Number of items: ${retrieved.length}`);

    // Clean up
    localStorage.removeItem('test_large_dataset');

    console.groupEnd();
}

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/*
TO USE THESE TESTING FUNCTIONS:

1. Open the application in your browser
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Copy and paste any function above
5. Run the function, for example:
   
   viewAllStoredData();
   checkStorageSize();
   clearAllCourseData();
   exportCourseData();
   runAllTests();
   testLargeDataset();
   
6. Follow the manual testing steps for comprehensive testing

QUICK COMMANDS:
- View data: viewAllStoredData()
- Check size: checkStorageSize()
- Clear all: clearAllCourseData()
- Export: exportCourseData()
- Run tests: runAllTests()
- Performance: testLargeDataset()
- Watch changes: watchLocalStorage()
*/

console.log('✅ localStorage Testing utilities loaded!');
console.log('Run viewAllStoredData() to see your stored data.');
