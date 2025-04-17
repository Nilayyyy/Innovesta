import { useState, useRef, useEffect } from "react";
import { navLinks } from "../constants";

const Navbar = ({ timeline, ease }) => {
    const titlenav = useRef([]);
    const itemRefs = useRef([]);

    useEffect(() => {
        // Clear any pre-existing animations on the timeline
        timeline.clear();

        // Animate the title
        timeline.fromTo(
            titlenav.current,
            { opacity: 0, y: -300 }, // Starting state
            { opacity: 1, y: 0, duration: 0.5, ease } // End state
        );

        // Animate navigation items
        timeline.fromTo(
            itemRefs.current,
            { opacity: 0, y: -300 }, // Starting state
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2, // Stagger the animation for each item
                ease,
            },
            "<" // Start animation for items at the same time as the title
        );
    }, [timeline, ease]); // Ensure `useEffect` only runs once when the timeline or ease changes

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    const NavItems = () => {
        return (
            <ul className="nav-ul">
                {navLinks.map(({ id, name, href }, index) => (
                    <li
                        key={id}
                        ref={(el) => (itemRefs.current[index] = el)} // Attach refs to each nav item
                        className="nav-li"
                    >
                        <a href={href} className="nav-li_a">
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between border-b-2 rounded-md items-center py-5 mx-auto c-space">
                    <a
                        ref={titlenav} // Attach ref to title
                        href="/"
                        className="titlenav text-neutral-400 font-extrabold text-xl duration-200 hover:text-white 
                     uppercase border-t-2 border-b-2 border-transparent hover:border-white rounded"
                    >
                        Innovesta
                    </a>

                    <button
                        onClick={toggleMenu}
                        className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
                        aria-label="Toggle menu"
                    >
                        <img
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                            alt="toggle"
                            className="w-6 h-6"
                        />
                    </button>

                    <nav ref={itemRefs} className="itemRefs sm:flex hidden">
                        <NavItems />
                    </nav>
                </div>
            </div>

            <div
                className={`nav-sidebar transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <nav className="p-5">
                    <NavItems />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
