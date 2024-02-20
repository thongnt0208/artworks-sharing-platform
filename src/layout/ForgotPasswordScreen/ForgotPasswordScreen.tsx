import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function ForgotPasswordScreen({...props}: Props) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const navigate = useNavigate();
  
    const handleEmailSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Send email to server to validate and get OTP (logic goes here)
      // Assuming a successful response redirects to OTP verification
      // Replace this with actual logic to send email and validate
      // For demo purposes, directly navigating to the OTP verification
      setIsEmailSubmitted(true);
    };
  
    const handleOtpSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Validate OTP and proceed to reset password screen if valid
      // Replace this with actual logic to validate OTP
      // For demo purposes, directly navigating to the reset password screen
      navigate('/reset-password');
    };
  
    return (
      <div>
        {!isEmailSubmitted ? (
          <div>
            <h2>Enter Your Email</h2>
            <form onSubmit={handleEmailSubmit}>
              <InputText
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <InputText
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        )}
      </div>
    );
  };