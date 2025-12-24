import React, { useState } from "react";
import Header from "../components/Header";
import TimeTable from "../components/TimeTable";
import SelectedCoursesBox from "../components/SelectedCoursesBox";
import ShowConflictsModal from "../Modals/ShowConflicts.Modal";
import FilterModal from "../Modals/Filter.Modal";
import DownloadPDFModal from "../Modals/DownloadPDF.Modal";
import { useCourseStore } from "../store/courseStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { courses, getCourses } = useCourseStore();

  // Modal state for showing conflicts
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (courses?.length === 0) {
      getCourses();
    }

    const interval = setInterval(() => {
      getCourses();
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, [courses?.length, getCourses]);

  // Function to open conflict modal with conflict data
  const openConflictModal = (conflicts) => {
    setConflictData(conflicts);
    setIsConflictModalOpen(true);
  };

  // Function to close conflict modal
  const closeConflictModal = () => {
    setIsConflictModalOpen(false);
    setConflictData(null);
  };

  // Function to open download modal
  const openDownloadModal = () => {
    setIsDownloadModalOpen(true);
  };

  // Function to close download modal
  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  return (
    <>
      <main className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800">
        <Header
          openConflictModal={openConflictModal}
          isFilterModalOpen={isFilterModalOpen}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
        <Toaster
          toastOptions={{ style: { marginTop: "60px" } }}
          position="top-center"
        />
        {/* Main Content Container */}
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
          <section className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-8 min-h-[calc(100vh-120px)]">
            {/* Timetable Section - Full width on mobile, 3 cols on desktop */}
            <div className="xl:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
              <TimeTable />
            </div>

            {/* Selected Courses Section - Full width on mobile, 1 col on desktop */}
            <div className="xl:col-span-1 h-fit">
              <SelectedCoursesBox onDownloadClick={openDownloadModal} />
            </div>
          </section>
        </div>

        {/* Conflict Modal */}
        {isConflictModalOpen && (
          <ShowConflictsModal
            closeConflictModal={closeConflictModal}
            conflictData={conflictData}
          />
        )}

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <FilterModal
            isFilterModalOpen={isFilterModalOpen}
            setIsFilterModalOpen={setIsFilterModalOpen}
          />
        )}

        {/* Download PDF Modal */}
        {isDownloadModalOpen && (
          <DownloadPDFModal closeModal={closeDownloadModal} />
        )}

        <Footer />
      </main>
    </>
  );
};

export default HomePage;
