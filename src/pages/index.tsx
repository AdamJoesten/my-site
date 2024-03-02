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
      title: 'non consectetur a erat nam at.',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      title: 'phasellus vestibulum lorem sed risus ultricies tristique nulla.',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      title: 'tellus elementum sagittis vitae et leo duis ut diam quam.',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      <div className="absolute right-0 top-0 z-20 flex space-x-1 p-4 sm:p-6 lg:p-8">
        <a href="https://github.com/AdamJoesten">
          <GithubCircle />
        </a>
        <a href="https://linkedin.com/in/AdamJoesten">
          <LinkedIn />
        </a>
      </div>
      <div className="relative bg-gradient-to-b from-comet-50 via-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        {/** Background */}
        <div className="relative z-10">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg className="h-[90rem] w-[100rem] flex-none" aria-hidden="true">
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
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="text-blue-500">Hi! </span>
              I&apos;m Adam Joesten
              <br />
              Fullstack engineer
              <br />
              Burlington, VT
            </h1>
            <h2 className="mt-6 text-lg leading-8 text-gray-600">
              I like to build{' '}
              <span className="text-blue-500">incredible products</span> with{' '}
              <span className="text-blue-500">incredible people</span>.
            </h2>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex max-sm:flex-col max-sm:space-y-4 sm:space-x-4">
          {featureCards.map((featureCard, idx) => (
            <FeatureCard key={`feature-card-${idx + 1}`} {...featureCard} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
