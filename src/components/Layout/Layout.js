import React from "react";
import Navbar from '../../components/Navbar';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => {
  return (
    <>
      <Navbar />
      <div className='rounded-lg bg-light p-5 mb-5'>
        <div className='container'>
          <h2>{title}</h2>
          <p className='lead'>{description}</p>
        </div>
      </div>
      <div className={className}>{children}</div>
    </>
  );
};
export default Layout;
