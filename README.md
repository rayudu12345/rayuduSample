# Sample Login Project

This is a sample login project built with Next.js and TypeScript. The application includes a login form with email and password fields and redirects users to an OTP page upon successful submission.

## Project Structure

```
sample-login
├── src
│   ├── app
│   │   ├── layout.tsx        # Main layout for the application
│   │   ├── page.tsx          # Home page of the application
│   │   ├── login
│   │   │   └── page.tsx      # Login page with the login form
│   │   └── otp
│   │       └── page.tsx      # OTP verification page
│   ├── components
│   │   └── LoginForm.tsx      # Login form component
│   └── types
│       └── index.ts           # TypeScript types and interfaces
├── public                      # Static assets directory
├── package.json                # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── next.config.js             # Next.js configuration file
```

## Features

- User authentication with email and password.
- Redirect to OTP verification page after login.
- TypeScript support for type safety.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sample-login
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Navigate to the login page to enter your email and password.
- Upon successful login, you will be redirected to the OTP page for further verification.

## License

This project is licensed under the MIT License.