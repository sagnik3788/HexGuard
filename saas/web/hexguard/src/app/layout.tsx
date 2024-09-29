import React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
 import '../app/globals.css';  // Global CSS import

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
     <body>
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
    </body>
    </html>
  );
}
