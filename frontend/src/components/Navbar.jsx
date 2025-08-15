import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="h-10 flex items-center justify-between px-8 text-2xl bg-stone-200">
      <span className="font-semibold text-stone-600">LOGO</span>
      <a onClick={() => navigate('/')}>
        <FaHome className="text-stone-600 cursor-pointer"/>
      </a>
    </div>
  );
};

export default Navbar;
