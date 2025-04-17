import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./sections/Hero";
import Footer from "./Components/Footer";
import { gsap } from "gsap";
import { Resources } from "./sections/Resources";

const App = () => {
    const tl = gsap.timeline();
    // const ease = Power1.easeIn();
    return (
        <main className="mx-auto max-w-7xl">
            <Navbar timeline={tl} />
            <Hero timeline={tl} />
            <Resources />
            <Footer />
        </main>
    );
};

export default App;
