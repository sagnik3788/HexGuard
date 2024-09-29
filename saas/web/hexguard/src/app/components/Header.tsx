import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">HexGuard</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-gray-400">Home</a></li>
          <li><a href="/about" className="hover:text-gray-400">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
