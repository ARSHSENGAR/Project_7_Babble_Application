// Client Side Rendered Component:
"use client";

// Imports:
import {
  useRouter
} from "next/navigation";
import {
  Button
} from "../ui/button";

// Type: Props:
interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

// Pagination:
function Pagination({ pageNumber, isNext, path }: Props) {

  // Router:
  const router = useRouter();

  // Note: Handel Navigation:
  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;
    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }
    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };
  if (!isNext && pageNumber === 1) return null;

  // Return:
  return (
    <div className='pagination'>

      {/* Button: */}
      <Button
        className='!text-small-regular text-light-2'
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}>
        Prev
      </Button>

      {/* Title: */}
      <p className='text-small-semibold text-light-1'>
        {pageNumber}
      </p>

      {/* Button: */}
      <Button
        className='!text-small-regular text-light-2'
        onClick={() => handleNavigation("next")}
        disabled={!isNext}>
        Next
      </Button>
    </div>
  );
}

// Exports:
export default Pagination;