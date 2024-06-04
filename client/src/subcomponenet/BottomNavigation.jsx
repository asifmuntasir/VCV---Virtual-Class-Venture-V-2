import React from 'react';

const BottomNavigation = () => {
    return (
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-20"
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <label className="swap swap-rotate mx-3">

                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                <svg xmlns="http://www.w3.org/2000/svg" className="swap-on fill-current text-accent w-10 h-10" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2h-8C6.38 2 2 6.66 2 12.28C2 17.5 6.49 22 11.72 22C17.39 22 22 17.62 22 12V4c0-1.1-.9-2-2-2m-3 13l-3-2v2H7V9h7v2l3-2z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="swap-off fill-current text-error w-10 h-10" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2h-8C6.38 2 2 6.66 2 12.28C2 17.5 6.49 22 11.72 22C17.39 22 22 17.62 22 12V4c0-1.1-.9-2-2-2m-3 13l-3-2v2H7V9h7v2l3-2z"></path></svg>

            </label>
            <label className="swap swap-rotate mx-3">

                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                <svg xmlns="http://www.w3.org/2000/svg" className="swap-on fill-current text-accent w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="swap-off fill-current text-error w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"></path></svg>

            </label>
            <label className="swap swap-rotate mx-3">

                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                <svg xmlns="http://www.w3.org/2000/svg" className="swap-on fill-current text-accent w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="swap-off fill-current text-error w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path></svg>

            </label>
            <label className="swap swap-rotate mx-3">

                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                <svg xmlns="http://www.w3.org/2000/svg" className="swap-on fill-current text-accent w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM7 10V12H9V10H7ZM11 10V12H13V10H11ZM15 10V12H17V10H15Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="swap-off fill-current text-error w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM7 10V12H9V10H7ZM11 10V12H13V10H11ZM15 10V12H17V10H15Z"></path></svg>

            </label>
        </ul>
    );
}

export default BottomNavigation;
