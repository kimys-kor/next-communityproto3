"use client";

import React, { useState } from "react";
import {
  FaFutbol,
  FaBaseballBall,
  FaBasketballBall,
  FaVolleyballBall,
} from "react-icons/fa";
import SoccerTab from "./SoccerTab";
import BaseballTab from "./BaseballTab";
import BasketballTab from "./BasketballTab";
import VolleyballTab from "./VolleyballTab";
import LeagueStandings from "./LeagueStandings";

const sports = [
  { id: "soccer", icon: <FaFutbol />, label: "축구" },
  { id: "baseball", icon: <FaBaseballBall />, label: "야구" },
  { id: "basketball", icon: <FaBasketballBall />, label: "농구" },
  { id: "volleyball", icon: <FaVolleyballBall />, label: "배구" },
];

const IconTabs: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("soccer");
  const [selectedLeague, setSelectedLeague] = useState<string | null>("EPL");

  const renderSportTab = () => {
    switch (selectedSport) {
      case "soccer":
        return (
          <SoccerTab
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
        );
      case "baseball":
        return (
          <BaseballTab
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
        );
      case "basketball":
        return (
          <BasketballTab
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
        );
      case "volleyball":
        return (
          <VolleyballTab
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full border-solid border border-[#EEEEEE] bg-white rounded-lg shadow-sm">
      <article className="rounded-t-md py-3 px-2  flex justify-around cursor-pointer border-b border-solid border-[#EEEEEE] ">
        {sports.map((sport) => (
          <div
            key={sport.id}
            onClick={() => {
              setSelectedSport(sport.id);
              if (sport.id === "soccer") {
                setSelectedLeague("EPL");
              } else if (sport.id === "baseball") {
                setSelectedLeague("MLB");
              } else if (sport.id === "basketball") {
                setSelectedLeague("NBA");
              } else if (sport.id === "volleyball") {
                setSelectedLeague("Vleague(남)");
              } else {
                setSelectedLeague(null);
              }
            }}
            className={`flex justify-center items-center w-10 h-7 md:w-12 text-sm font-bold  border-b border-solid hover:border-blue hover:text-blue ${
              selectedSport === sport.id
                ? "border-blue text-blue"
                : "border-transparent"
            }`}
          >
            {sport.label}
          </div>
        ))}
      </article>
      <article className="flex flex-col items-center">
        {selectedSport && (
          <div className="w-full">
            {renderSportTab()}
            {selectedLeague && (
              <div>
                <LeagueStandings league={selectedLeague} />
              </div>
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default IconTabs;
