import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 px-4">
        <div className="container mx-auto text-center">
            {/* About Text */}
            {/* <p className="text-sm mb-4">
            We are committed to providing the best experience and constantly working to improve our platform.
            </p> */}

            {/* Copyright Information */}
            <p className="text-sm">
            &copy; {new Date().getFullYear()} DevConnect. All rights reserved.
            </p>
        </div>
        </footer>
    );
};

export default Footer;
