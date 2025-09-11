import React from 'react';
import Layout from '../components/Layout';
import { Github, Globe, Mail, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer, creative problem-solver, and lifelong learner
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Story */}
          <div className="lg:col-span-2 space-y-8">
            <section className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                My Story
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Welcome to my corner of the internet! <br/>
                  I decided to become a programmer at the age of 6 mostly inspired by the Super Nintendo Game "Super Mario World"; that game fascinated me by all the variety of levels it had, the gameplay and the ability to explore a magical "World" through a TV screen, thus making me want to be able to create a "Worlds" of my own. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Currently, my full time job is as a Leader Software Developer Engineer at Thomson Reuters, there I lead a team of very talented developers across the world building and maintaining a web applications used by some of the biggest companies in the world.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  However, on my spare time I work on <a 
                    href="https://crimsonrgames.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 transition-colors"
                  >
                    Crimson R Games
                  </a>, which is my own website, where I publish the games I develop and interactive web experiences I create.
                  This is something I've been doing since 2012, and I will continue on until my last day alive.
                  All of that is fueled by my love and passion for gaming and technology and I don't make any money from it.
                  I love the challenge of turning creative ideas into experiences that I hope people will enjoy.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As much as I love coding, I'm equally passionate about art and music. I firmly believe that video games are a form of art, and I strive to incorporate artistic elements into my work.
                </p>
              </div>
            </section>

            <section className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                What I Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-crimson-600 dark:text-crimson-400">
                    Software Development
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    My main focus and career is in software development.
                    I've done everything from building small personal projects to large-scale applications for enterprise clients.
                    From frontend to backend, game development to web apps, mobile apps to desktop applications, machine learning to computer vision.
                    I enjoy working with a variety of technologies and constantly learning new skills to stay current in the field.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-warm-orange-400">
                    Illustration & Design
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I always liked drawing since I was a kid, and that passion has carried over into my work as a developer.
                    Video games are a form of art, and as such, being able to convey emotions and tell stories through visuals is something I strive for.
                    As it's hard to fully focus on art since it's not my main profession, I try to improve my skills bit by bit every day.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-warm-yellow-400">
                    Music production
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I enjoy creating music and soundscapes for my projects. 
                    I believe that audio is a crucial part of the overall experience, and I strive to make it as immersive as possible.
                    Same way as with visuals, I have a lot to learn, but I try to improve my skills whenever is possible.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    Knowledge Sharing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Ever since the humble beginnings of my programming journey, I've been passionate about sharing knowledge and helping others learn.
                    I firmly believe that collaboration and communication are key to overcoming challenges and driving innovation.
                    We're stronger together, and I enjoy being part of a community that supports and uplifts each other.
                    Even if I'm not very active on social media, I try to share my knowledge through blog posts and open source contributions whenever I can.
                    Sadly some of those have been lost over time, but I'm working on rebuilding that knowledge base bit by bit.
                  </p>
                </div>
              </div>
            </section>

            <section className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Philosophy & Values
              </h2>
              <div className="space-y-4">

                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-warm-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Video Games are Art
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Of course profit and revenue are important, but I believe that the true value of a game lies in its ability to evoke emotions, tell stories, and create memorable experiences.
                      I strive to infuse my projects with a burning passion that will resonate with players on a deeper level.
                      The same way I was inspired by the games I played as a kid, I want to help inspire the next generation of developers and gamers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-warm-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      To Live is to learn
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      The tech landscape evolves rapidly, and I embrace that change. 
                      I'm always exploring new tools, techniques, and best practices.
                      Adaptability is key to growth and success.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-crimson-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Technology should improve lives
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Technology should serve people, not the other way around.
                      I look for ways to leverage tech to solve real problems, enhance productivity, and foster connection.
                      Ethical considerations are always top of mind.
                    </p>
                  </div>
                </div>
                
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Facts */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location</span>
                  <span className="text-gray-900 dark:text-gray-100">Mexico City</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Experience</span>
                  <span className="text-gray-900 dark:text-gray-100">13+ years</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Speciality</span>
                  <span className="text-gray-900 dark:text-gray-100">Frontend & Games</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Coffee</span>
                  <span className="text-gray-900 dark:text-gray-100">I don't drink coffee</span>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Let's Connect
              </h3>
              <div className="space-y-3">
                <a 
                  href="mailto:aldo@crimsonrgames.com"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </a>
                <a 
                  href="https://github.com/aldoram5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a 
                  href="https://crimsonrgames.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">Crimson R Games</span>
                </a>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="card p-6 bg-gradient-to-br from-crimson-50 to-warm-orange-50 dark:from-crimson-900/10 dark:to-warm-orange-900/10 border-crimson-200 dark:border-crimson-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Fun Fact
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                I used to hate catgirls, but now I'm a very big fan of them.
                Expect to see more of them in my projects in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;