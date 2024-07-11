import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto w-full  flex flex-wrap justify-between items-center">
                <div className="text-sm w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} Course Management App. All rights reserved.
                </div>
                <div className="flex space-x-4 w-full md:w-auto justify-center md:justify-end">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
