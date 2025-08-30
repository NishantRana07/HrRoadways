import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import androidClubLogo from '../assets/androidclub.png';

function AboutUs() {
  const { t } = useTranslation();
  const [contributors, setContributors] = useState([]);

  // Tech stack data
  const techStack = [
    { name: "HTML", description: "Markup Language" },
    { name: "JavaScript", description: "Programming Language" },
    { name: "CSS", description: "Styling" },
    { name: "GitHub", description: "Version Control & Collaboration" },
    { name: "Tailwind", description: "Utility-first CSS Framework" },
    { name: "Vite", description: "Next Generation Frontend Tooling" },
    { name: "Vercel", description: "Deployment Platform" },
    { name: "Figma", description: "Design and Prototyping" }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 py-16 dark:bg-gray-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 animate-fade-in dark:bg-gray-950 dark:text-white">
        
        {/* Header */}
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            {t('about.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Maintainers */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Project Maintainer */}
          <div className="group p-8 bg-gradient-to-br from-blue-100/80 to-white/70 backdrop-blur-lg rounded-2xl border border-blue-200 hover:scale-105 hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col items-center space-y-4">
              <img
                src="https://github.com/NishantRana07.png"
                alt="Project Maintainer"
                className="w-28 h-28 rounded-full ring-4 ring-blue-500/50 p-1"
              />
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-blue-700">Nishant Rana</h3>
                <p className="text-gray-700 mt-1">{t('about.maintainer')}</p>
              </div>
            </div>
          </div>

          {/* Top Contributor */}
          {contributors.length > 0 && (
            <div className="group p-8 bg-gradient-to-br from-purple-100/80 to-white/70 backdrop-blur-lg rounded-2xl border border-purple-200 hover:scale-105 hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={contributors[0].avatar}
                  alt="Top Contributor"
                  className="w-28 h-28 rounded-full ring-4 ring-purple-500/50 p-1"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-purple-700">{contributors[0].name}</h3>
                  <p className="text-gray-700 mt-1">{t('about.topContributor')}</p>
                  <div className="mt-4 flex gap-2 flex-wrap justify-center">
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                      {contributors[0].totalPRs} {t('about.pullRequests')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://github.com/NishantRana07/HrRoadways"
            className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5 text-white" />
            {t('about.github')}
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img src={androidClubLogo} alt="Android Club Logo" className="w-10 h-10" />
            {t('about.acwoc')}
          </a>
        </div>

        {/* Tech Stack */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('about.techStack')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-blue-50 to-white/70 backdrop-blur-lg rounded-xl border border-blue-200 hover:scale-105 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 bg-blue-200/40 rounded-full">
                    <img
                      src={`/techstack/${tech.name.toLowerCase()}.png`}
                      alt={tech.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/techstack/fallback.png";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-blue-700">{tech.name}</h3>
                  <p className="text-sm text-gray-700 text-center">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('about.contributors')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-white/70 backdrop-blur-lg rounded-xl border border-blue-200 hover:scale-105 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-20 h-20 rounded-full ring-2 ring-blue-400/50"
                  />
                  <h3 className="text-lg font-medium text-blue-700">{contributor.name}</h3>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm">
                      {contributor.mergedPRs} merged
                    </span>
                    <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-sm">
                      {contributor.openPRs} open
                    </span>
                  </div>
                  <a
                    href={contributor.profile}
                    className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('about.viewProfile')}
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
