import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function EnrollmentSuccess() {
    return (
        <>
            <PageCss href="/css/enrollment_success.css" />
            <PageShell variant="enrollment">
                <div className="success-container" style={{ textAlign: "center", padding: "60px 20px" }}>
                    <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
                    <h2>Enrollment Successful!</h2>
                    <p style={{ margin: "15px 0 30px", color: "#475569" }}>
                        You have successfully enrolled in the course. You can view it anytime under your dashboard or enrolled courses.
                    </p>
                    <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                        <Link to="/my-courses" className="btn">Go to My Courses</Link>
                        <Link to="/dashboard" className="btn" style={{ background: "#475569" }}>Dashboard</Link>
                    </div>
                </div>
            </PageShell>
            <LegacyScript src="/legacy/js/enrollment_success.js" />
        </>
    );
}

export default EnrollmentSuccess;