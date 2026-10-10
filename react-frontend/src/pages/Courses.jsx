import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const INITIAL_COURSES = [
    {
        id: 1,
        title: "Full Stack Web Development",
        instructor: "Dr. Smith",
        duration: "8 Weeks",
        price: "$49",
        category: "Web Development",
        rating: "4.8 ⭐",
        students: "2.4k",
        badge: "Bestseller",
        badgeBg: "#e0e7ff",
        badgeColor: "#4338ca",
        description: "Master HTML, CSS, React, Node.js, and MongoDB from scratch with real-world project builds."
    },
    {
        id: 2,
        title: "Data Structures & Algorithms",
        instructor: "Prof. Johnson",
        duration: "10 Weeks",
        price: "$79",
        category: "Computer Science",
        rating: "4.9 ⭐",
        students: "3.1k",
        badge: "Popular",
        badgeBg: "#fef3c7",
        badgeColor: "#b45309",
        description: "Ace tech interviews with deep dives into trees, graphs, dynamic programming, and complexity analysis."
    },
    {
        id: 3,
        title: "React & Redux Masterclass",
        instructor: "Jane Doe",
        duration: "6 Weeks",
        price: "$39",
        category: "Web Development",
        rating: "4.7 ⭐",
        students: "1.8k",
        badge: "Hot",
        badgeBg: "#fce7f3",
        badgeColor: "#be185d",
        description: "Build scalable web applications using React Hooks, Redux Toolkit, and REST API integration."
    },
    {
        id: 4,
        title: "Advanced Machine Learning & AI",
        instructor: "Dr. Alan Turing",
        duration: "12 Weeks",
        price: "$89",
        category: "Data Science",
        rating: "4.9 ⭐",
        students: "4.2k",
        badge: "Advanced",
        badgeBg: "#ecfdf5",
        badgeColor: "#047857",
        description: "Explore neural networks, computer vision, natural language processing, and PyTorch frameworks."
    },
    {
        id: 5,
        title: "Python for Data Science & Analysis",
        instructor: "Sarah Jenkins",
        duration: "7 Weeks",
        price: "$45",
        category: "Data Science",
        rating: "4.8 ⭐",
        students: "5.0k",
        badge: "Beginner Friendly",
        badgeBg: "#e0f2fe",
        badgeColor: "#0369a1",
        description: "Learn Pandas, NumPy, Matplotlib, and Seaborn to manipulate, analyze, and visualize complex datasets."
    },
    {
        id: 6,
        title: "iOS & Swift App Development",
        instructor: "Mark Evans",
        duration: "9 Weeks",
        price: "$69",
        category: "Mobile & Cloud",
        rating: "4.6 ⭐",
        students: "1.2k",
        badge: "Featured",
        badgeBg: "#f3e8ff",
        badgeColor: "#6b21a8",
        description: "Build sleek native iOS applications using SwiftUI, CoreData, and deployment to the Apple App Store."
    },
    {
        id: 7,
        title: "DevOps, Docker & Kubernetes",
        instructor: "David Miller",
        duration: "8 Weeks",
        price: "$75",
        category: "Mobile & Cloud",
        rating: "4.8 ⭐",
        students: "2.9k",
        badge: "High Demand",
        badgeBg: "#ffedd5",
        badgeColor: "#c2410c",
        description: "Automate CI/CD pipelines, containerize applications, and orchestrate microservices in production environments."
    },
    {
        id: 8,
        title: "Cybersecurity & Ethical Hacking Essentials",
        instructor: "Alex Rivera",
        duration: "10 Weeks",
        price: "$85",
        category: "Cybersecurity",
        rating: "4.9 ⭐",
        students: "3.5k",
        badge: "Trending",
        badgeBg: "#ffe4e6",
        badgeColor: "#9f1239",
        description: "Understand penetration testing, network defense, threat modeling, and ethical vulnerability exploits."
    },
    {
        id: 9,
        title: "UI/UX Design & Figma Fundamentals",
        instructor: "Emma Watson",
        duration: "5 Weeks",
        price: "$35",
        category: "Design",
        rating: "4.7 ⭐",
        students: "2.1k",
        badge: "Creative",
        badgeBg: "#f1f5f9",
        badgeColor: "#334155",
        description: "Design intuitive user interfaces, conduct user research, wireframing, and build interactive Figma prototypes."
    },
    {
        id: 10,
        title: "AWS Cloud Solutions Architect Certification",
        instructor: "Robert Chen",
        duration: "11 Weeks",
        price: "$95",
        category: "Mobile & Cloud",
        rating: "4.9 ⭐",
        students: "4.8k",
        badge: "Certification",
        badgeBg: "#dcfce7",
        badgeColor: "#15803d",
        description: "Prepare for the AWS Architect Associate exam covering EC2, S3, Lambda, VPC, and Cloud Security."
    },
    {
        id: 11,
        title: "Flutter & Dart Cross-Platform Mobile Apps",
        instructor: "Lisa Ray",
        duration: "8 Weeks",
        price: "$59",
        category: "Mobile & Cloud",
        rating: "4.6 ⭐",
        students: "1.9k",
        badge: "New",
        badgeBg: "#e0e7ff",
        badgeColor: "#3730a3",
        description: "Write code once and deploy native mobile apps across both iOS and Android platforms with Flutter."
    },
    {
        id: 12,
        title: "Java Programming & Spring Boot Fundamentals",
        instructor: "Michael Chang",
        duration: "9 Weeks",
        price: "$65",
        category: "Computer Science",
        rating: "4.7 ⭐",
        students: "2.7k",
        badge: "Enterprise",
        badgeBg: "#fef3c7",
        badgeColor: "#92400e",
        description: "Master object-oriented programming, enterprise application setup, and microservices architecture with Spring Boot."
    },
    {
        id: 13,
        title: "GraphQL & Modern API Architecture",
        instructor: "Dr. Smith",
        duration: "4 Weeks",
        price: "$29",
        category: "Web Development",
        rating: "4.5 ⭐",
        students: "1.1k",
        badge: "Fast Track",
        badgeBg: "#fce7f3",
        badgeColor: "#9d174d",
        description: "Replace standard REST APIs with powerful GraphQL schemas, resolvers, and Apollo Client integration."
    },
    {
        id: 14,
        title: "SQL & Relational Database Design",
        instructor: "Sarah Jenkins",
        duration: "6 Weeks",
        price: "$40",
        category: "Computer Science",
        rating: "4.8 ⭐",
        students: "3.8k",
        badge: "Essential",
        badgeBg: "#e0f2fe",
        badgeColor: "#075985",
        description: "Write complex database queries, optimize joins, normalize data, and manage PostgreSQL/MySQL systems."
    },
    {
        id: 15,
        title: "Blockchain & Smart Contract Engineering",
        instructor: "Satoshi N.",
        duration: "10 Weeks",
        price: "$99",
        category: "Cybersecurity",
        rating: "4.8 ⭐",
        students: "1.5k",
        badge: "Web3",
        badgeBg: "#fae8ff",
        badgeColor: "#86198f",
        description: "Build decentralized applications (dApps), program Ethereum smart contracts with Solidity, and test web3 tools."
    }
];

function Courses() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Web Development", "Computer Science", "Data Science", "Mobile & Cloud", "Cybersecurity", "Design"];

    const filteredCourses = INITIAL_COURSES.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEnroll = (course) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

        if (!currentUser) {
            alert("Please log in to enroll in this course!");
            navigate("/login");
            return;
        }

        const enrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
        if (enrolled.some((c) => c.id === course.id)) {
            alert("You are already enrolled in this course!");
            return;
        }

        enrolled.push(course);
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
        alert(`Successfully enrolled in ${course.title}!`);
    };

    return (
        <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
            <Navbar />

            {/* Header Banner */}
            <div style={{ 
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", 
                color: "#ffffff", 
                padding: "3.5rem 1.5rem", 
                textAlign: "center" 
            }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h1 style={{ fontSize: "2.5rem", margin: "0 0 0.5rem 0", fontWeight: "800" }}>
                        Explore Course Catalog
                    </h1>
                    <p style={{ color: "#e0e7ff", fontSize: "1.1rem", margin: 0 }}>
                        Discover 15 top-rated programs taught by industry experts and academic professionals.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
                
                {/* Search & Filter Bar */}
                <div style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    gap: "1.2rem", 
                    marginBottom: "2.5rem",
                    background: "#ffffff",
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.04)"
                }}>
                    {/* Search Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="🔍 Search from 15 courses or instructors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                outline: "none",
                                fontSize: "0.95rem",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "20px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    fontSize: "0.85rem",
                                    background: selectedCategory === cat ? "#4f46e5" : "#f1f5f9",
                                    color: selectedCategory === cat ? "#ffffff" : "#475569",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
                        <h3>No courses found matching your criteria.</h3>
                        <p>Try clearing your search term or selecting a different category filter.</p>
                    </div>
                ) : (
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
                        gap: "2rem" 
                    }}>
                        {filteredCourses.map((course) => (
                            <div 
                                key={course.id} 
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "14px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    overflow: "hidden"
                                }}
                            >
                                <div style={{ padding: "1.75rem" }}>
                                    {/* Top Metadata Row */}
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                        <span style={{ 
                                            background: course.badgeBg, 
                                            color: course.badgeColor, 
                                            padding: "0.25rem 0.75rem", 
                                            borderRadius: "12px", 
                                            fontSize: "0.75rem", 
                                            fontWeight: "700",
                                            textTransform: "uppercase"
                                        }}>
                                            {course.badge}
                                        </span>
                                        <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>
                                            {course.rating} ({course.students})
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{ fontSize: "1.2rem", color: "#1e1b4b", margin: "0 0 0.5rem 0", fontWeight: "700", lineHeight: "1.3" }}>
                                        {course.title}
                                    </h3>

                                    {/* Instructor & Duration */}
                                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 1rem 0" }}>
                                        👤 <strong>{course.instructor}</strong> • ⏱️ {course.duration}
                                    </p>

                                    {/* Description */}
                                    <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.5", margin: 0 }}>
                                        {course.description}
                                    </p>
                                </div>

                                {/* Footer / Actions */}
                                <div style={{ 
                                    padding: "1.25rem 1.75rem", 
                                    borderTop: "1px solid #f1f5f9", 
                                    background: "#fafafa",
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "space-between" 
                                }}>
                                    <span style={{ fontSize: "1.4rem", fontWeight: "800", color: "#1e1b4b" }}>
                                        {course.price}
                                    </span>

                                    <button 
                                        onClick={() => handleEnroll(course)}
                                        style={{
                                            padding: "0.6rem 1.25rem",
                                            background: "#10b981",
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontWeight: "700",
                                            fontSize: "0.85rem",
                                            cursor: "pointer",
                                            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)"
                                        }}
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Courses;