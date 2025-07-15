import React, { useState } from "react";
import styles from "./Contact.module.css";
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';
import ToastNotification from '../ToastNotification';

function Contact() {
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phoneNumber: '', 
    message: '' 
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    
    try {
      const requestBody = {
        ...form,
        ...(showSecurityQuestion && { securityAnswer, securityQuestion })
      };

      console.log('Sending request with body:', requestBody);

      const data = await fetchFromAPI(`${API_ENDPOINTS.CONTACT}/message`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      
      setStatus({ loading: false, success: data.message || 'Message sent!', error: null });
      setForm({ firstName: '', lastName: '', email: '', phoneNumber: '', message: '' });
      setSecurityAnswer('');
      setShowSecurityQuestion(false);
      setSecurityQuestion('');
      setToast({ message: data.message || 'Message sent!', type: 'success' });
    } catch (error) {
      console.log('Error caught:', error);
      console.log('Error response:', error.response);
      
      const errorData = error.response?.data || {};
      
      // Handle security question requirement
      if (errorData.requiresSecurity && errorData.securityQuestion) {
        console.log('Security question required:', errorData.securityQuestion);
        setSecurityQuestion(errorData.securityQuestion);
        setShowSecurityQuestion(true);
        setStatus({ loading: false, success: null, error: errorData.message });
        setToast({ message: errorData.message, type: 'error' });
        return;
      }
      
      setStatus({ loading: false, success: null, error: errorData.message || error.message || 'Failed to send message.' });
      setToast({ message: errorData.message || error.message || 'Failed to send message.', type: 'error' });
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Get in Touch</h2>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.nameRow}>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="tel"
          name="phoneNumber"
          placeholder="+265 Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        
        {/* Security Question */}
        {showSecurityQuestion && (
          <div className={styles.securityContainer}>
            <div className={styles.securityAlert}>
              ⚠️ Security verification required for this phone number
            </div>
            <label className={styles.securityLabel}>
              Security Question: {securityQuestion}
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className={styles.submitBtn} disabled={status.loading}>
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
        {status.success && <div className={styles.successMsg}>{status.success}</div>}
        {status.error && <div className={styles.errorMsg}>{status.error}</div>}
      </form>
      <ToastNotification
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
        duration={3500}
      />
    </div>
  );
}

export default Contact;
