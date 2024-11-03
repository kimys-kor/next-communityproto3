import React from "react";

interface BaseballTabProps {
  selectedLeague: string | null;
  setSelectedLeague: (league: string) => void;
}

const baseballLeagues = ["MLB", "NPB", "KBO"];

const BaseballTab: React.FC<BaseballTabProps> = ({
  selectedLeague,
  setSelectedLeague,
}) => {
  return (
    <div>
      <div className="flex flex-wrap justify-start px-2 py-4">
        {baseballLeagues.map((league) => (
          <button
            key={league}
            onClick={() => setSelectedLeague(league)}
            className={`text-sm cursor-pointer rounded-lg m-2 underline-offset-4  hover:text-black hover:underline ${
              selectedLeague === league
                ? "text-black underline font-semibold"
                : "text-[#AAAAAA] font-medium"
            }  `}
          >
            {league}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BaseballTab;
