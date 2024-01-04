// Client Side Rendered Component:
"use client";

// Imports:
import {
  useRouter
} from "next/navigation";
import {
  useEffect,
  useState
} from "react";
import {
  Input
} from "../ui/input";
import Image from "next/image";

// Type: Props:
interface Props {
  routeType: string;
}

// Searchbar:
function Searchbar({ routeType }: Props) {

  // Route:
  const router = useRouter();

  // State:
  const [search, setSearch] = useState("");

  // Note: This Query is Triggered after (0.3 seconds) of Input not Recieved:
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    // Return:
    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  // Return:
  return (
    <div className='searchbar'>

      {/* Image: */}
      <Image
        className='object-contain'
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24} />

      {/* Input: */}
      <Input
        className='no-focus searchbar_input'
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}

        // Note: I used "search" instead of "/search".
        placeholder={`${routeType !== "search" ? "Seek communal echoes..." : "Seek sole as well as shared voices..."
          }`} />
    </div>
  );
}

// Exports:
export default Searchbar;