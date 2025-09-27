import Image from "next/image";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center ring-[1.6px] ring-gray-300 rounded-full px-2 text-xs">
        <Image src="/search.png" height={20} width={20} alt="search" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px]  p-2 bg-transparent outline-none"
        />
      </div>

      {/* Icons */}
      <div className="flex  gap-2 justify-end w-full items-center">
        <div className="bg-white p-2 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" height={20} width={20} alt="message" />
        </div>
        <div className="bg-white relative p-2 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image
            src="/announcement.png"
            height={20}
            width={20}
            alt="announcement"
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-white text-center text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium leading-3">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <Image
          className="rounded-full"
          src="/avatar.png"
          height={36}
          width={36}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
