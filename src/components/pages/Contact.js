import React, { useState } from "react";
import styles from "./Contact.module.css";
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    try {
      const data = await fetchFromAPI(`${API_ENDPOINTS.CONTACT}/message`, {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus({ loading: false, success: data.message || 'Message sent!', error: null });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ loading: false, success: null, error: error.message || 'Failed to send message.' });
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Get in Touch</h2>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
        <button type="submit" className={styles.submitBtn} disabled={status.loading}>
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
        {status.success && <div className={styles.successMsg}>{status.success}</div>}
        {status.error && <div className={styles.errorMsg}>{status.error}</div>}
      </form>
    </div>
  );
}

export default Contact;
