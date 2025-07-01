import React, { useState } from 'react';
import styles from './messages.module.css';

function Messages({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the message to your backend or email service
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
        <h2 className={styles.heading}>Contact Us</h2>
        {submitted ? (
          <div className={styles.thankYouMsg}>
            Thank you for reaching out!<br />We will get back to you soon.
          </div>
        ) : (
          <>
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
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Messages; 