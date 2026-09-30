import { createContext, useContext, useState, useEffect } from "react";

const CourseContext = createContext();
const API_URL = "http://localhost:5000/courses";

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch courses from db.json on initial render
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 2. Add course handler (POST request to json-server)
  const addCourse = async (newCourse) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      setCourses((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to add course:", err);
    }
  };

  // 3. Delete course handler (DELETE request to json-server)
  const deleteCourse = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  // 4. Update course handler (PUT/PATCH request to json-server)
  const updateCourse = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setCourses((prev) =>
        prev.map((c) => (String(c.id) === String(id) ? data : c))
      );
    } catch (err) {
      console.error("Failed to update course:", err);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        addCourse,
        deleteCourse,
        updateCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}