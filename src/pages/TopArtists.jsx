import React from "react";
import { useEffect, useRef } from "react";
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const topArtistRef = useRef(null)

  useEffect(() => {
    setTimeout(()=>topArtistRef.current.scrollIntoView({ behavior: 'smooth' }),1000);
  });

  if (isFetching) return <Loader tittle="Loading top charts" />;
  if (error) return <Error />;

  return (
    <div ref={topArtistRef} className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        {" "}
        Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track, i) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
