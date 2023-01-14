import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPLaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) return <Loader tittle="Loading songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center flex-col  my-5 mb-10">
        <div className="flex flex-row">
          <h2 className="font-bold text-3xl text-white mx-3 my-3">
             Discover {genreTitle}
          </h2>
          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId || "pop"}
            className="bg-[#08411d] text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 my-3 mx-3"
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap  justify-center gap-8">
          {data?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPLaying={isPLaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Discover;
