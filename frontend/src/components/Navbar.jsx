import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-10 flex items-center justify-between px-8 text-2xl bg-stone-200">
      <span className="font-semibold text-stone-600">LOGO</span>
      <a href="/">
        <FaHome className="text-stone-600"/>
      </a>
    </div>
  );
};

export default Navbar;
