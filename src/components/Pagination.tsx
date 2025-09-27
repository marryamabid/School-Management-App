const Pagination = () => {
  return (
    <div className="flex items-center justify-between text-gray-500 mt-3">
      <button
        disabled
        className="px-2 py-1 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        <button className="px-2  rounded-sm bg-lamaSky ">1</button>
        <button className="px-2 rounded-sm y  ">2</button>
        <button className="px-2  rounded-sm ">3</button>
        ...
        <button className="px-2  rounded-sm    ">10</button>
      </div>
      <button
        disabled
        className="px-2 py-1 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
