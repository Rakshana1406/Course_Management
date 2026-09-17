import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    
    // Check if user is currently logged in
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    return (
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
            <div className="logo">
                <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2rem", textDecoration: "none", color: "#2563eb" }}>
                    CourseMS
                </Link>
            </div>
            
            <nav style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
                <Link to="/" style={{ textDecoration: "none", color: "#1e293b", fontWeight: "500" }}>Home</Link>
                <Link to="/courses" style={{ textDecoration: "none", color: "#1e293b", fontWeight: "500" }}>Explore Courses</Link>

                {user ? (
                    /* Show these links when LOGGED IN */
                    <>
                        <Link to="/my-courses" style={{ textDecoration: "none", color: "#1e293b", fontWeight: "500" }}>My Courses</Link>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: "0.4rem 0.8rem",
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "500"
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    /* Show these links when LOGGED OUT */
                    <>
                        <Link to="/login" style={{ textDecoration: "none", color: "#2563eb", fontWeight: "600" }}>
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            style={{ 
                                textDecoration: "none", 
                                background: "#2563eb", 
                                color: "#fff", 
                                padding: "0.4rem 0.8rem", 
                                borderRadius: "4px", 
                                fontWeight: "500" 
                            }}
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;