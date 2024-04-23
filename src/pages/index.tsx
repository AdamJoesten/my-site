import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { FeatureCard } from '../components/FeatureCard';
import { SpockHandGesture } from '../components/icons/SpockHandGesture';
import { Developer } from '../components/icons/Developer';
import { OrthogonalView } from '../components/icons/OrthogonalView';
import { Rocket } from '../components/icons/Rocket';
import { GithubCircle } from '../components/icons/GithubCircle';
import { LinkedIn } from '../components/icons/LinkedIn';

const IndexPage: React.FC<PageProps> = () => {
  const [isDeveloperHovered, setIsDeveloperHovered] = React.useState(false);
  const [isSpockHovered, setIsSpockHovered] = React.useState(false);
  const [isOrthogonalHovered, setIsOrthogonalHovered] = React.useState(false);
  const featureCards: Array<React.ComponentProps<typeof FeatureCard>> = [
    {
      title: 'Craft Solutions with Resourcefulness and Ingenuity',
      subtitle:
        'At the intersection of technology and creativity, I thrive by blending technical expertise with creative problem-solving.',
      icon: (
        <div className="relative size-6">
          <Developer
            className={`absolute transition delay-150 duration-300 ease-in-out ${isDeveloperHovered ? 'opacity-0' : 'opacity-100'}`}
          />
          <Rocket
            className={`absolute transition delay-150 duration-300 ease-in-out ${isDeveloperHovered ? 'scale-150 stroke-blue-500 opacity-100' : 'stroke-black opacity-0'}`}
          />
        </div>
      ),
      className: 'flex-1',
      hoverable: true,
      onMouseOut: () => setIsDeveloperHovered(false),
      onMouseOver: () => setIsDeveloperHovered(true),
    },
    {
      title: 'Embrace Diversity and Learning',
      subtitle:
        'I believe the best ideas emerge from the confluence of diverse perspectives. My collaborative spirit thrives on team dynamics, where each voice is valued and learning is continuous.',
      icon: (
        <div>
          <OrthogonalView
            className={`transition delay-150 duration-300 ease-in-out  ${isOrthogonalHovered ? 'rotate-90 skew-x-12 scale-110 stroke-blue-500  ' : 'stroke-black'}`}
          />
        </div>
      ),
      className: 'flex-1',
      hoverable: true,
      onMouseOut: () => setIsOrthogonalHovered(false),
      onMouseOver: () => setIsOrthogonalHovered(true),
    },
    {
      title: 'Be Yourself and Make Work Fun',
      subtitle:
        'By championing an atmosphere where laughter and authenticity are as integral as deadlines and deliverables, I create spaces where teams can thrive, innovate, and exceed expectations, all while genuinely enjoying the journey.',
      icon: (
        <div className="relative flex size-6">
          <SpockHandGesture
            className={`absolute transition duration-300  ${isSpockHovered ? 'scale-110 animate-[ping_1s_ease-in-out_150ms_infinite] stroke-blue-500' : ''}`}
          />
          <SpockHandGesture
            className={`absolute transition delay-150 duration-300 ${isSpockHovered ? 'scale-110 stroke-blue-500' : 'stroke-black '}`}
          />
        </div>
      ),
      className: 'flex-1',
      hoverable: true,
      onMouseOut: () => setIsSpockHovered(false),
      onMouseOver: () => setIsSpockHovered(true),
    },
  ];

  return (
    <main className="">
      {/** Hero Section */}
      <div className="absolute right-0 top-0 z-20 flex space-x-1 p-4 sm:p-6 lg:p-8 xl:p-10">
        <a
          href="https://github.com/AdamJoesten"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubCircle />
        </a>
        <a
          href="https://linkedin.com/in/AdamJoesten"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </a>
      </div>
      <div className="relative bg-gradient-to-b from-comet-50 via-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        {/** Background */}
        <div className="relative z-10">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg className="h-[90rem] w-5/6 flex-none" aria-hidden="true">
              <defs>
                <pattern
                  id="graph-paper"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <g fillRule="evenodd">
                    <g className="fill-comet-600 opacity-20">
                      <path
                        opacity=".5"
                        d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"
                      />
                      <path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z" />
                    </g>
                  </g>
                </pattern>
              </defs>
              <rect fill="url(#graph-paper)" width="100%" height="100%" />
            </svg>
          </div>
        </div>
        {/** Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl xl:max-w-5xl">
            <div className="align-center justify-center sm:flex">
              <span className="text-4xl font-bold tracking-tight text-blue-500 sm:text-6xl lg:text-7xl xl:text-8xl">
                Hi!&nbsp;
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl xl:text-8xl">
                I&apos;m Adam Joesten
              </h1>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl xl:text-8xl">
              Fullstack Engineer
            </h2>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl xl:text-8xl">
              Burlington, VT
            </h2>
            <h3 className="mt-6 text-lg leading-8 text-gray-600 lg:text-2xl xl:text-3xl">
              I like to build{' '}
              <span className="text-blue-500">incredible products</span> with{' '}
              <span className="text-blue-500">incredible people</span>.
            </h3>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-6 lg:px-8 lg:pb-8 xl:max-w-[100rem]">
        <div className="flex pb-6 max-sm:flex-col max-sm:space-y-4 sm:space-x-4 lg:pb-8">
          {featureCards.map((featureCard, idx) => (
            <FeatureCard key={`feature-card-${idx + 1}`} {...featureCard} />
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-4xl rounded-lg border bg-white px-4 py-8 text-center text-gray-800 shadow-lg">
          <p className="mb-4 text-lg text-gray-700 xl:text-xl">
            My approach to engineering is holistic, considering business needs,
            product vision, user experience, technical requirements, and risk
            analysis to devise effective solutions. With a passion for exploring
            the unknown and turning challenges into opportunities, I bring a
            blend of resourcefulness and ingenuity to every project.
          </p>
          <br />
          <p className="font-semibold">--Adam</p>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Adam Joesten</title>
    <meta property="og:title" content="Adam Joesten" />
    <meta property="og:description" content="Landing Page" />
    <meta property="og:url" content="www.adamjoesten.com" />
  </>
);
