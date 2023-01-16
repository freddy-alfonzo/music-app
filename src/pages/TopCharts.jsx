import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts = () => {

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const topChartsRef = useRef(null)

  useEffect(() => {
    setTimeout(()=>topChartsRef.current.scrollIntoView({ behavior: 'smooth' }),1000);
  });

  if (isFetching)
    return <Loader tittle="Loading top charts" />;
  if (error) return <Error />;
  

  return (
    <div ref={topChartsRef} className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        {" "}
       Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
