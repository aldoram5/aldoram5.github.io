import React from 'react';
import Layout from '../components/Layout';
import { Mail, MapPin, Globe } from 'lucide-react';

const Resume: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Aldo Pedro Rangel Montiel
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Lead Software Development Engineer
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>aldo@crimsonrgames.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mexico City, Mexico</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <a 
                  href="https://crimsonrgames.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 transition-colors"
                >
                  crimsonrgames.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Passionate software developer with expertise in modern web technologies and game development. 
            Experienced in building scalable applications, interactive games, and user-friendly interfaces. 
            Strong problem-solving skills and commitment to writing clean, maintainable code.
          </p>
        </section>

        {/* Experience */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Experience
          </h2>
          
          <div className="space-y-8">
            {/* Job 1 */}
            <div className="border-l-4 border-crimson-400 pl-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Lead Software Development Engineer
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  2024(January) - Present
                </span>
              </div>
              <p className="text-crimson-600 dark:text-crimson-400 font-medium mb-3">
                Thomson Reuters
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Successfully led a team of vendor developers 100% remotely through implementing the modularization of the frontend and adopting a new internal UI framework</li>
                <li>• Currently leading one of the core product teams in the development of OneSource - Indirect Tax </li>
                <li>• Mentoring and guiding junior developers in best practices and coding standards</li>
                <li>• Led the successful migration of legacy codebases to modern frameworks and modern code standards</li>
                <li>• Pioneering the adoption of AI technologies in product development</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="border-l-4 border-warm-orange-400 pl-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Senior Software Development Engineer
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  2022(August) - 2023(December)
                </span>
              </div>
              <p className="text-crimson-600 dark:text-crimson-400 font-medium mb-3">
                Thomson Reuters
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Worked with a team all around the world to deliver high-quality software solutions</li>
                <li>• Worked on the Angular migration of one of the core Product's of the Company: One Source - Indirect Tax</li>
                <li>• Was a key contributor for solving customer related issues and improving product performance</li>
              </ul>
            </div>
            {/* Job 3 */}
            <div className="border-l-4 border-warm-yellow-400 pl-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Fullstack & Mobile Developer
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  2012(August) - 2022(June)
                </span>
              </div>
              <p className="text-crimson-600 dark:text-crimson-400 font-medium mb-3">
                GBMobile
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Started as a trainee and stayed with the company until 2022</li>
                <li>• Worked on various projects, including mobile applications and web platforms(Frontend and Backend)</li>
                <li>• Worked on projects related to one of the biggest Television networks in Mexico (TV Azteca)</li>
                <li>• Gained extensive experience in full-stack development and agile methodologies</li>
              </ul>
            </div>
            {/* Job 4 */}
            <div className="border-l-4 border-warm-yellow-200 pl-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Freelancing
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Various Periods (2010 - 2021)
                </span>
              </div>
              <p className="text-crimson-600 dark:text-crimson-400 font-medium mb-3">
                Various Clients
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Assisted with front-end development using React and TypeScript for https://www.acceder.io/ 100% remotely</li>
                <li>• Assisted with mobile and web development for a Chilean-based mobile company 100% remotely</li>
                <li>• Provided consultancy services to small businesses in Mexico</li>
                <li>• Mentored junior developers and taught best practices in software development</li>
              </ul>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                DISCLAIMER: Freelancing jobs were part-time(working on weekends) and not full-time positions, they never overlapped with my full-time jobs, I have a strong commitment to my employers and work ethically.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Frontend Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Angular', 'TypeScript', 'JavaScript', 'Microfrontends', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-crimson-100 dark:bg-crimson-900/20 text-crimson-700 dark:text-crimson-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Game Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Phaser', 'Unity 3d', 'Ren\'Py', 'RPG Maker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-warm-orange-100 dark:bg-warm-orange-900/20 text-warm-orange-700 dark:text-warm-orange-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Backend & DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Kotlin', 'Python', 'Flask', 'Springboot', 'Debian', 'Github Actions', 'Docker', 'pm2'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-warm-yellow-100 dark:bg-warm-yellow-900/20 text-warm-yellow-700 dark:text-warm-yellow-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Problem Solving', 'Team Collaboration', 'Code Review', 'Mentoring', 'Adaptability', 'Communication', 'Time Management', 'Project Management'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Education
          </h2>

          <div className="border-l-4 border-crimson-400 pl-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Bachelor of Engineering of Computational Systems (Unfinished)
              </h3>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                2011 - 2012
              </span>
            </div>
            <p className="text-crimson-600 dark:text-crimson-400 font-medium mb-3">
              IPN ESCOM (Instituto Politécnico Nacional - Escuela Superior de Cómputo)
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Relevant coursework: Data Structures, Algorithms, Software Engineering, 
              Computer Graphics, Human-Computer Interaction
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Notable Projects
          </h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Please check the projects page for a more comprehensive list of projects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resume;