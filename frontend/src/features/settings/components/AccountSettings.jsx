
import { FiCheckCircle } from "react-icons/fi"
import "./AccountSettings.css"

function AccountSettings() {
  return (
    <div className="account-settings-container">
      <section className="account-panel">
        <h2 className="account-heading">Account Information</h2>

        <div className="account-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email address"
              value="chef@duoexample.com"
              readOnly
            />
          </div>

          <div className="form-group">
            <p className="form-label">Email Status</p>
            <div className="status-row">
              <FiCheckCircle size={18} color="#0f8725" />
              <span className="status-badge">Verified</span>
            </div>
          </div>

          <div className="info-box">
            <p>
              <strong>INFO:</strong> This email is used for account login,
              password recovery, and security verification.
            </p>
          </div>
        </div>
      </section>

      <section className="account-panel password-panel">
        <div>
          <h3 className="account-subheading">Password Security</h3>
          <div className="password-meta">
            <p>
              <strong>Last Changed:</strong>
            </p>
            <p>June 25, 2025</p>
          </div>
        </div>

        <div>
          <p className="form-label">Password Requirements:</p>
          <ul className="requirements-list">
            <li>Minimum 12 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </div>

        <button className="password-button">CHANGE PASSWORD</button>
      </section>
    </div>
  )
}

export default AccountSettings