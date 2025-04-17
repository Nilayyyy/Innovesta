import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera } from '@react-three/drei';
import InnovestaLogo from '../Components/InnovestaLogo';
import CanvasLoader from '../Components/CanvasLoader';
import * as THREE from 'three';
import { useMediaQuery } from 'react-responsive';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const RaycasterLight = () => {
    const lightRef = useRef(); // Reference to the point light
    const { camera, scene } = useThree(); // Access camera and scene
    const raycaster = useRef(new THREE.Raycaster()); // Raycaster instance
    const pointer = useRef(new THREE.Vector2()); // Normalized device coordinates (NDC)

    // Mouse movement handler
    useEffect(() => {
        const onMouseMove = (event) => {
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

            if (lightRef.current) {
                // Map pointer to a specific scale in scene space
                lightRef.current.position.set(pointer.current.x * 5, pointer.current.y * 5, 23);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    // Highlight intersected objects in the scene
    useFrame(() => {
        raycaster.current.setFromCamera(pointer.current, camera);

        // Intersect objects in the scene
        const intersects = raycaster.current.intersectObjects(scene.children, true);
        intersects.forEach((intersect) => {
            if (intersect.object.material) {
                intersect.object.material.color.set(0xcdcfd2); // Highlight color
            }
        });
    });

    return (
        <pointLight
            ref={lightRef}
            color={0xe0e5e5}
            intensity={100}
            position={[-3, -3, 23]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-bias={-0.001}
        />
    );
};

const Hero = ({ timeline, ease }) => {
    const herotitle = useRef(null);
    const herotagline = useRef(null);
    const herologo = useRef(null);
    const smdiv = useRef(null);
    const infodiv1 = useRef(null);
    const infodiv2 = useRef(null);
    const infodiv3 = useRef(null);

    useEffect(() => {
        
        timeline.fromTo(
            herologo.current,
            { opacity: 0 }, // Starting state
            {
                opacity: 1,
                duration: 1.3,
                ease,
            },
            // Start animation for items at the same time as the title
        );

        timeline.fromTo(
            smdiv.current,
            { opacity: 0, y: 300 }, // Starting state
            { opacity: 1, y: 0, duration: 1, ease }// End state
        );

        // Animate the title
        timeline.fromTo(
            herotitle.current,
            { opacity: 0, y: 300 }, // Starting state
            { opacity: 1, y: 0, duration: 1, ease } // End state
        );

        // Animate navigation items
        timeline.fromTo(
            herotagline.current,
            { opacity: 0, y: -300 }, // Starting state
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease,
            },
            "<"
        );
        gsap.fromTo(
            infodiv1.current,
            { opacity: 0, y:40},
            {
                opacity: 1,
                y:0,
                duration: 1.5,
                ease,
                scrollTrigger: {
                    trigger: infodiv1.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            },"<"
        );

        gsap.fromTo(
            infodiv2.current,
            { opacity: 0, y:40},
            {
                opacity: 1,
                y:0,
                duration: 1,
                ease,
                scrollTrigger: {
                    trigger: infodiv2.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        gsap.fromTo(
            infodiv3.current,
            { opacity: 0, y:40},
            {
                opacity: 1,
                y:0,
                duration: 1,
                ease,
                scrollTrigger: {
                    trigger: infodiv3.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }, "<"
        );

        

    }, [timeline, ease]);

    return (
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-2">
                <div ref={herotagline} className=" herotagline flex justify-center sm:text-3xl text-xl text-center font-bold font-generalsans text-neutral-400 uppercase">
                    Finance and Entrepreneurship Club
                </div>
                {/* <div ref={herotitle} className='herotitle d-space hidden xl:flex text-neutral-300 text-center justify-center uppercase font-extrabold hero_tag'>
                    innovesta
                </div> */}
            </div>
            <div className="w-full h-full inset-0 flex flex-row relative">
                <Canvas ref={herologo} className="herologo flex xl:hidden" style={{ position: 'fixed', top: "23vh", left: "20vw", width: "60vw", height: "40vh" }}>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        {/* <ambientLight intensity={0.1} /> */}
                        <pointLight position={[-1, -1, 22]} intensity={80} color={'#de0000'} />
                        <pointLight position={[1, -1, 22]} intensity={80} color={'#de0000'} />
                        <pointLight position={[0, -1, 22]} intensity={80} color={'#de0000'} />
                        <pointLight position={[0, -7, 22]} intensity={80} color={'#de0000'} />
                        <RaycasterLight />
                        <InnovestaLogo />
                    </Suspense>
                    {/* <Html as="div" center style={{ display: 'flex', top: '33vh', left: '1px', width: '10vw', height: '15vh', flexDirection: 'column' }}>
                        
                    </Html> */}
                </Canvas>

                <Canvas ref={herologo} className="herologo hidden xl:flex" style={{ position: "fixed", top: "23vh", left: "20vw", width: "60vw", height: "40vh" }}>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        {/* <ambientLight intensity={0.1} /> */}
                        <pointLight position={[-1, -1, 22]} intensity={80} color={'#de0000'} />
                        <pointLight position={[1, -1, 22]} intensity={80} color={'#de0000'} />
                        <pointLight position={[0, -1, 22]} intensity={80} color={'#de0000'} />
                        <pointLight position={[0, -7, 22]} intensity={80} color={'#de0000'} />
                        <RaycasterLight />
                        <InnovestaLogo position={[0, 0, 0]} />
                    </Suspense>
                </Canvas>
            </div>

            <div className="flex flex-col w-full">
                <h1 ref={herotitle} className="herotitle text-neutral-300 text-center justify-center uppercase font-extrabold hero_tag xl:pt-56 lg:pt-44 md:pt-44 sm:pt-96">
                    innovesta
                </h1>
            </div>
            <div className="flex flex-row justify-center w-full md:mt-0 mt-56">
                <h1 ref={smdiv} className="smdiv text-neutral-300 text-center justify-center uppercase font-extrabold hero_tag ">
                    <div className='border-l-2 border-r-2 justify-center p-1 flex flex-row  '>
                        <a
                            href="https://www.instagram.com/innovesta.mitblr/profilecard"
                            className="text-white flex p-1"
                        >
                            <img
                                src="assets/instagram.svg"
                                alt="twitter"
                                className="w-8 h-8"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/innovestamitblr"
                            className="text-white flex p-1"
                        >
                            <img
                                src="assets/linkedin.svg"
                                alt="twitter"
                                className="w-8 h-8"
                            />
                        </a>
                    </div>
                </h1>
            </div>


            <div ref={infodiv1} className='infodiv1 c-space bg-grad max-w-7xl text-2xl m-10 justify-center border rounded-xl p-2'>
                <p className='flex text-white justify-center text-center'>Innovesta is the Finance and Entrepreneurship Club of Manipal Institute of Technology, Bengaluru. We’re a team of driven students passionate about simplifying finance and bringing entrepreneurial ideas to life.
                </p>
            </div>
            <div className='c-space flex flex-col md:flex-row mt-2 md:mt-0 justify-center mb-10'>
                <div ref={infodiv2} className='infodiv2 info-tag bg-grad flex flex-col justify-start mr-2 border rounded-xl '>
                    <div className=''>
                        <p className='p-2 border-b-2 flex font-bold uppercase justify-center text-white text-end text-3xl'>Who We Are
                        </p>
                    </div>
                    <div className='p-4 justify-center text-center text-white'>
                        <p className='p-2 flex text-white text-center justify-center text-xl'>We’re a community where </p>
                        <p className='p-2 hidden md:flex text-white text-center justify-center text-xl'><span className='font-bold italic text-2xl \'>creativity &nbsp;</span> meets <span className='font-bold italic text-2xl'>&nbsp; strategy</span> </p>
                        <p className='p-2 flex md:hidden text-white text-center justify-center text-xl'><span className='font-bold italic text-2xl \'>creativity meets strategy</span> </p>
                        <p className='p-2 flex justify-center text-white text-center text-xl'>Innovesta is built for students who want to master </p>
                            <span className='font-bold text-xl '>personal finance, explore investments, and take their startup ideas from concept to reality.</span>
                        <p className='p-2 flex justify-center text-white text-center text-xl'>Our members work together to learn, grow and create real impact in the world of business and innovation.</p>
                        
                    </div>
                </div>
                <div ref={infodiv3} className='infodiv3 flex flex-col info-tag justify-end mt-2 md:mt-0 md:ml-2 border rounded-xl bg-grad '>
                    <div>
                        <p className='p-2 border-b-2 flex justify-center font-bold uppercase text-white text-end text-3xl'>What We Do
                        </p>
                    </div>
                    <div className=' text-center text-white p-2'>
                        <span className='font-bold text-white text-xl'>Workshops on Finance</span><p className=' border-b-2 text-l flex text-white text-center'>Learn how to budget, invest, and manage money effectively. From stock market basics to advanced financial planning, we make finance accessible and practical.</p>
                        <span className='font-bold text-white text-xl'>Startup Guidance</span><p className='border-b-2 flex text-white text-center'> We help students transform entrepreneurial ideas into actionable business plans, connecting them with mentors and industry experts.</p>
                        <span className='font-bold text-white text-xl'>Events and Competitions</span><p className='border-b-2 flex text-white text-center'> Innovesta hosts mock trading, pitch fests, case studies, and strategy challenges to develop skills and showcase talent.</p>
                        <span className='font-bold text-white text-xl'>Practical Resources</span><p className='flex text-white text-center'> We create and share valuable content, including guides, presentations, and templates to support learning and execution.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
