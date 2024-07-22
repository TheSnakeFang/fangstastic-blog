import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.GATSBY_SUPABASE_URL,
  process.env.GATSBY_SUPABASE_ANON_KEY
)

const SubscriptionForm = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{ email }])
      
      if (error) throw error
      
      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        setMessage('This email is already subscribed.')
      } else {
        setMessage('An error occurred. Please try again.')
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className="subscription-form">
      <h2>Subscribe to Updates</h2>
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
      <p className="tagline">Will never sell your data or spam you. Pinky promise  :)</p>
      {message && <p className={`message ${message.includes('error') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  )
}

export default SubscriptionForm