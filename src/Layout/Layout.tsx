import React from 'react';
import Navbar from '../components/Navbar/Navbar';
// import Navbar from '../components/Navbar/Navbar'; 
// import Footer from '../components/Footer/Footer'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>

      {/* Main Content Area */}
      <main className="flex-grow bg-gray-100">
        <div className="flex-grow  mt-16">
          {children}
        </div>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;