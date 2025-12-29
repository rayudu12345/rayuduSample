import React from 'react';

const OtpPage: React.FC = () => {
    return (
        <div>
            <h1>Enter OTP</h1>
            <form>
                <input type="text" placeholder="Enter OTP" required />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default OtpPage;