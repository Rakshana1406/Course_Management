import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function ResetPassword() {
    return (
        <>
            <PageCss href="/css/reset_password.css" />
            <div className="container">
                <Link to="/login" className="back-btn">← Back to Login</Link>
                <h2>RESET PASSWORD</h2>
                <form id="resetPasswordForm">
                    <div className="input-box">
                        <label>New Password</label>
                        <input type="password" id="newPassword" placeholder="Enter New Password" required />
                    </div>
                    <div className="input-box">
                        <label>Confirm New Password</label>
                        <input type="password" id="confirmPassword" placeholder="Confirm New Password" required />
                    </div>
                    <button type="submit" className="login-btn">Update Password</button>
                </form>
            </div>
            <LegacyScript src="/legacy/js/reset_password.js" module={true} />
        </>
    );
}

export default ResetPassword;