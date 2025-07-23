

import React, { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

// Update translations by removing currentTime and currentUser
const translations = {
  en: {
    header: {
      title: "HR Roadways Project Proposal",
      subtitle: "Modernizing Government Bus Services"
    },
    maintainers: {
      title: "Project Leadership",
      maintainer: "Project Maintainer",
      topContributor: "Top Contributor"
    },
    techStack: {
      title: "Technology Stack",
      sections: [
        { name: "React", description: "Frontend Framework" },
        { name: "Nodejs", description: "Backend Runtime" },
        { name: "JavaScript", description: "Programming Language" },
        { name: "CSS", description: "Styling" },
        { name: "GitHub", description: "Version Control & Collaboration" },
        { name: "Tailwind", description: "Utility-first CSS Framework" },
        { name: "Vite", description: "Next Generation Frontend Tooling" },
        { name: "Vercel", description: "Deployment Platform" },
        { name: "Figma", description: "Design and Prototyping" }
      ]
    },
    contributors: {
      title: "AcWoC Contributors",
      viewProfile: "View Profile",
      pullRequests: "Pull Requests"
    },
    links: {
      github: "View on GitHub",
      acwoc: "AcWoC 25",
      androidClub: "Android Club"
    }
  },
  hi: {
    // ... (Hindi translations remain the same, just remove currentTime and currentUser)
  }
};

function AboutUs({ isHindi = false }) {
  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [contributors, setContributors] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
  }, [isHindi]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/NishantRana07/HrRoadways/pulls?state=all&labels=AcWoC&per_page=100')
      .then(response => response.json())
      .then(data => {
        const prsByUser = data.reduce((acc, pr) => {
          const userId = pr.user.id;
          if (!acc[userId]) {
            acc[userId] = {
              name: pr.user.login,
              avatar: pr.user.avatar_url,
              profile: pr.user.html_url,
              pullRequests: []
            };
          }
          acc[userId].pullRequests.push({
            number: pr.number,
            title: pr.title,
            state: pr.state,
            merged: pr.merged_at !== null,
            url: pr.html_url
          });
          return acc;
        }, {});

        const contributorsArray = Object.values(prsByUser)
          .sort((a, b) => b.pullRequests.length - a.pullRequests.length)
          .map(contributor => ({
            ...contributor,
            totalPRs: contributor.pullRequests.length,
            mergedPRs: contributor.pullRequests.filter(pr => pr.merged).length,
            closedPRs: contributor.pullRequests.filter(pr => !pr.merged && pr.state === 'closed').length,
            openPRs: contributor.pullRequests.filter(pr => pr.state === 'open').length
          }));
        
        setContributors(contributorsArray);
      });
  }, []);

  // Animation helper function
  const fadeInUpClass = (index) => {
    const baseDelay = 100;
    return `opacity-0 translate-y-10 animate-fadeInUp animation-delay-${index * baseDelay}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2,
                transform: `scale(${0.5 + Math.random()})`,
                filter: 'blur(40px)',
                animation: `float ${10 + Math.random() * 20}s infinite ease-in-out ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center'
        }}
      >
        {/* Header with parallax effect */}
        <div 
          className="text-center space-y-8 animate-fadeIn"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
            {currentLanguage.header.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-pulse-slow">
            {currentLanguage.header.subtitle}
          </p>
        </div>

        {/* Maintainers with 3D hover effect */}
        <div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          ref={el => sectionsRef.current[0] = el}
        >
          {/* Project Maintainer */}
          <div className="group perspective">
            <div className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transform-gpu group-hover:rotate-y-6">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center space-y-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 animate-spin-slow"></div>
                  <img 
                    src="https://github.com/NishantRana07.png"
                    alt="Project Maintainer"
                    className="w-32 h-32 rounded-full ring-4 ring-blue-500/50 p-1 relative z-10 group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">Nishant Rana</h3>
                  <p className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">{currentLanguage.maintainers.maintainer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Contributor */}
          {contributors.length > 0 && (
            <div className="group perspective">
              <div className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transform-gpu group-hover:rotate-y-minus-6">
                <div className="absolute inset-0 rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 animate-spin-slow"></div>
                    <img 
                      src={contributors[0].avatar}
                      alt="Top Contributor"
                      className="w-32 h-32 rounded-full ring-4 ring-purple-500/50 p-1 relative z-10 group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">{contributors[0].name}</h3>
                    <p className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">{currentLanguage.maintainers.topContributor}</p>
                    <div className="mt-4 flex gap-2 flex-wrap justify-center">
                      <span className="px-4 py-1.5 bg-purple-500/20 rounded-full text-sm group-hover:bg-purple-500/30 transition-all duration-300 hover:scale-105">
                        {contributors[0].totalPRs} {currentLanguage.contributors.pullRequests}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Links with glow effect */}
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="https://github.com/NishantRana07/HrRoadways"
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 rounded-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
            <FaGithub className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10 font-medium">{currentLanguage.links.github}</span>
          </a>
          <a 
            href="#"
            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-500/80 hover:to-blue-600/80 rounded-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
            <img src="../src/assets/androidclub.png" alt="Android Club Logo" className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10 font-medium">{currentLanguage.links.acwoc}</span>
          </a>
        </div>

        {/* Tech Stack with staggered animation */}
        <div className="space-y-16">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {currentLanguage.techStack.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentLanguage.techStack.sections.map((tech, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] transform-gpu"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-5 relative z-10">
                  <div className="p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full group-hover:from-gray-700/70 group-hover:to-gray-800/70 transition-all duration-300 transform-gpu group-hover:scale-105">
                    <img 
                      src={`/techstack/${tech.name.toLowerCase()}.png`}
                      alt={tech.name}
                      className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "/techstack/fallback.png"; 
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">{tech.name}</h3>
                  <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributors with hover card effect */}
        <div className="space-y-16">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {currentLanguage.contributors.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributors.map((contributor, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] transform-gpu"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-5 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-24 h-24 rounded-full ring-2 ring-blue-500/50 group-hover:ring-4 group-hover:ring-blue-500/70 transition-all duration-300 relative z-10"
                    />
                  </div>
                  <h3 className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">{contributor.name}</h3>
                  <div className="flex gap-3 flex-wrap justify-center">
                    <span className="px-4 py-1.5 bg-green-500/20 rounded-full text-sm group-hover:bg-green-500/30 transition-all duration-300 hover:scale-105">
                      {contributor.mergedPRs} merged
                    </span>
                    <span className="px-4 py-1.5 bg-yellow-500/20 rounded-full text-sm group-hover:bg-yellow-500/30 transition-all duration-300 hover:scale-105">
                      {contributor.openPRs} open
                    </span>
                  </div>
                  <a 
                    href={contributor.profile}
                    className="relative px-5 py-2.5 bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-500/80 hover:to-blue-600/80 rounded-lg transition-all duration-300 hover:scale-105 overflow-hidden group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="relative z-10 font-medium">{currentLanguage.contributors.viewProfile}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default AboutUs;
