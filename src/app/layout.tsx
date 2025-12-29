import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Sample Login Application</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2023 Sample Login. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}