import React, { useState } from "react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      if (error.message === "Email already exists") {
        setMessage("This email is already subscribed.");
      } else {
        setMessage("An error occurred. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="subscription-form">
      <h2>Subscribe for Updates</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p className="tagline">
        Will never sell your data or spam you. Pinky promise :)
      </p>
      {message && (
        <p
          className={`message ${
            message.includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SubscriptionForm;