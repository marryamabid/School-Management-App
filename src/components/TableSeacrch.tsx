import Image from "next/image";
const TableSeacrch = () => {
  return (
    <div className="w-full md:w-auto flex items-center ring-[1.6px] ring-gray-300 rounded-full px-2 text-xs">
      <Image src="/search.png" height={20} width={20} alt="search" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px]  p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSeacrch;
