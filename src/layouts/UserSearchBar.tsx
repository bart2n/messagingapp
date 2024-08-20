import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { useGetUserSearchResultsQuery } from "@/redux/search/searchApi";
import { useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce"; // Adjust the path according to your project structure

function UserSearchBar(props: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const {
    data: searchResults,
    isFetching,
    isError,
  } = useGetUserSearchResultsQuery(debouncedSearch, {
    skip: debouncedSearch === "", // Arama kutusu boşken sorgu yapılmasını engeller
  });

  return (
    <Command className={props.className}>
      <CommandInput
        value={search || ""}
        onValueChange={(value) => {
          setSearch(value);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        placeholder="Kullanıcı ara..."
      />
      {open && (
        <CommandList
          style={{ zIndex: "9999" }}
          className="absolute w-full h-fit overflow-y-auto bg-white shadow-lg rounded-md mt-2 top-8"
        >
          {isFetching && <div className="p-2">Loading...</div>}
          {isError && (
            <div className="p-2 text-red-500">Error fetching data</div>
          )}
          {searchResults?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {searchResults?.map((user: any) => (
            <CommandItem key={user.id}>{user.username}</CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
}

export default UserSearchBar;
