"use client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const router = useRouter();
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;
  return (
    <div className="flex items-center justify-between text-gray-500 mt-3">
      <button
        disabled={!hasPrev}
        className="px-2 py-1 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed "
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 py-1 rounded-md ${
                pageIndex === page ? "bg-lamaSky text-white" : "bg-gray-100"
              }`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className="px-2 py-1 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed "
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
