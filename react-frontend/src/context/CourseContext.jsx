import { createContext, useContext, useState, useEffect } from "react";

const CourseContext = createContext();
// UPDATED: Express API endpoint with versioning
const API_URL = "http://localhost:5000/api/v1/courses";

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch courses from Express Backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch courses");
        
        const result = await res.json();
        // UPDATED: Express controller returns response as { success: true, count: N, data: [...] }
        if (result.success) {
          setCourses(result.data);
        } else {
          setError(result.message || "Failed to fetch courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 2. Add course handler (POST request to Express API)
  const addCourse = async (newCourse) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      const result = await res.json();

      if (result.success) {
        // UPDATED: Unwrap created item from result.data
        setCourses((prev) => [...prev, result.data]);
        return result.data;
      } else {
        alert(result.message); // Displays validation error if fields are missing
      }
    } catch (err) {
      console.error("Failed to add course:", err);
    }
  };

  // 3. Delete course handler (DELETE request to Express API)
  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)));
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  // 4. Update course handler (PUT request to Express API)
  const updateCourse = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();

      if (result.success) {
        // UPDATED: Unwrap updated item from result.data
        setCourses((prev) =>
          prev.map((c) => (String(c.id) === String(id) ? result.data : c))
        );
        return result.data;
      } else {
        alert(result.message);
      }
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