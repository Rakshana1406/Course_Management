import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function ForgotPassword() {
    return (
        <>
            <PageCss href="/css/forgot_password.css" />
            <div className="container">
                <Link to="/login" className="back-btn">← Back to Login</Link>
                <h2>FORGOT PASSWORD</h2>
                <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "20px", textAlign: "center" }}>
                    Enter your registered email address to receive password reset instructions.
                </p>
                <form id="forgotPasswordForm">
                    <div className="input-box">
                        <label>Email Address</label>
                        <input type="email" id="forgotEmail" placeholder="Enter Email Address" required />
                    </div>
                    <button type="submit" className="login-btn">Send Reset Link</button>
                </form>
            </div>
            <LegacyScript src="/legacy/js/forgot_password.js" module={true} />
        </>
    );
}

export default ForgotPassword;