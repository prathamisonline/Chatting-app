import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChatUsersState, SelectedUserState } from "../../../../../states/theme";

const Search = () => {
  const [search, setSearch] = useState("");
  const chatUsers = useRecoilValue(ChatUsersState);
  const setSelectedUser = useSetRecoilState(SelectedUserState);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("searched");

      if (!search) return;
      if (search.length < 3) {
        return toast.error("Search term must be at least 3 characters long");
      }

      console.log("chatUsers array:", chatUsers);

      const conversation = chatUsers?.find((c) => {
        console.log("Checking user:", c.fullname); // Log each fullname
        return c?.fullname.toLowerCase().includes(search.toLowerCase());
      });

      console.log("Found conversation:", conversation);
      if (conversation) {
        setSelectedUser(conversation);
        setSearch("");
      } else toast.error("No such user found!");
    },
    [chatUsers, search, setSelectedUser]
  );
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label className="input input-bordered flex items-center gap-2 h-8">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </form>
  );
};

export default Search;
