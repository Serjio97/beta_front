import React from 'react';

interface RunningTextProps {
  companies: string[];
}

const RunningText: React.FC<RunningTextProps> = ({ companies }) => {
  return (
    <div className="bg-[#1872f2] py-4 overflow-hidden">
      <div className="relative w-full">
        <div className="marquee-content flex animate-marquee">
          {[...companies, ...companies].map((company, index) => (
            <span
              key={`${company}-${index}`}
              className="text-lg font-medium text-white mx-8 whitespace-nowrap"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-content {
            width: max-content;
          }

          .animate-marquee {
            animation: marquee 15s linear infinite;
            display: flex;
          }
        `}
      </style>
    </div>
  );
};

export default RunningText;
