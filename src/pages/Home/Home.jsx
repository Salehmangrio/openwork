import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowRight, Users, Star, Briefcase } from "lucide-react";

const LandingPage = () => {
  const heroRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const btnsRef = useRef();
  const featuresRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
      tl.from(heroRef.current, { opacity: 0, y: 50 })
        .from(line1Ref.current, { opacity: 0, y: 20 }, "-=0.5")
        .from(line2Ref.current, { opacity: 0, y: 20 }, "-=0.5")
        .from(btnsRef.current.children, { opacity: 0, y: 20, stagger: 0.1 }, "-=0.5")
        .fromTo(featuresRef.current.children, { opacity: 0, y: -50, stagger: 0.2 }, { opacity: 1, y: 0, stagger: 0.3 }, "-=0.5");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col justify-center items-center text-center px-6 py-10">
      {/* Hero Section */}
      <div ref={heroRef} className="max-w-4xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-black leading-tight">
          Welcome to <span className="text-indigo-700">OpenWork</span>
        </h1>
        <p ref={line1Ref} className="mt-6 text-black text-lg sm:text-xl">
          Connect with top freelancers or find amazing projects. Build your dream career or scale your business.
        </p>
        <p ref={line2Ref} className="mt-2 text-indigo-600 text-md sm:text-lg italic">
          Empower your work. Inspire your future.
        </p>

        {/* Buttons */}
        <div ref={btnsRef} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink to="/login">
            <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl text-lg shadow-lg transition transform hover:-translate-y-1">
              Login <ArrowRight size={20} className="inline ml-2" />
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-700 font-semibold rounded-xl text-lg shadow-lg transition transform hover:-translate-y-1">
              Register <ArrowRight size={20} className="inline ml-2" />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full" ref={featuresRef}>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-black shadow-lg hover:scale-105 transition transform">
          <Users size={48} className="mb-4 text-indigo-500" />
          <h3 className="text-xl font-bold mb-2">Connect</h3>
          <p>Find and hire top talent from around the world in seconds.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-black shadow-lg hover:scale-105 transition transform">
          <Star size={48} className="mb-4 text-yellow-400" />
          <h3 className="text-xl font-bold mb-2">Grow</h3>
          <p>Take your projects to the next level with skilled professionals.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-black shadow-lg hover:scale-105 transition transform">
          <Briefcase size={48} className="mb-4 text-green-500" />
          <h3 className="text-xl font-bold mb-2">Achieve</h3>
          <p>Complete projects faster, smarter, and efficiently with OpenWork.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
