import React, { useState } from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '2vw',
};

const formStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '2rem',
  minWidth: '320px',
  maxWidth: '90vw',
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const submitBtnStyle = {
  background: '#003366',
  color: '#fff',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
};

const useResponsiveFormStyle = () => {
  const [style, setStyle] = React.useState(formStyle);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setStyle({
          ...formStyle,
          padding: '0.5rem',
          borderRadius: '6px',
          minWidth: '0',
          maxWidth: '98vw',
          gap: '0.5rem',
        });
      } else {
        setStyle(formStyle);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return style;
};

function Message({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const responsiveFormStyle = useResponsiveFormStyle();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the message to your backend or email service
  };

  const mobileInputStyle = window.innerWidth <= 500 ? { ...inputStyle, fontSize: '0.95rem', padding: '0.5rem' } : inputStyle;
  const mobileTextareaStyle = window.innerWidth <= 500 ? { ...inputStyle, minHeight: '60px', fontSize: '0.95rem', padding: '0.5rem', resize: 'vertical' } : { ...inputStyle, minHeight: '100px', resize: 'vertical' };

  return (
    <div style={modalStyle}>
      <form style={responsiveFormStyle} onSubmit={handleSubmit}>
        <button type="button" style={closeBtnStyle} onClick={onClose} aria-label="Close">&times;</button>
        <h2 style={{ color: '#003366', marginBottom: '0.5rem', fontSize: window.innerWidth <= 500 ? '1.1rem' : '1.3rem' }}>Contact Us</h2>
        {submitted ? (
          <div style={{ color: '#003366', fontWeight: 'bold', textAlign: 'center', fontSize: window.innerWidth <= 500 ? '1rem' : '1.1rem' }}>
            Thank you for reaching out!<br />We will get back to you soon.
          </div>
        ) : (
          <>
            <input
              style={mobileInputStyle}
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              style={mobileInputStyle}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              style={mobileTextareaStyle}
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" style={submitBtnStyle}>Send Message</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Message; 