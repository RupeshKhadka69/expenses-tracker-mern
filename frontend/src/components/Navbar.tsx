import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLocalStorage } from '../utils/UserLocalStorage';
import { useQueryClient } from 'react-query';
import { UserDataComponent } from './UserData';
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from './MenuToggle';
import { RxAvatar } from "react-icons/rx";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};
const Navbar = () => {
  const [isOpens, toggleOpen] = useCycle(false, true);
  // const containerRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {

    setIsOpen(!isOpen);
    userLocalStorage.setUserToLocalStorage(null);

    queryClient.invalidateQueries('user');
    navigate('/');
  };

  const { data } = UserDataComponent();

  return (
    <div className='bg-indigo-300 relative  py-[18px] '>
      <div className="flex items-center  justify-between md:px-8 px-2  container mx-auto">
        <div className="logo flex flex-none md:flex-auto">Rupesh</div>
        {!data ? (
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </ul>
        ) : (
          <div className=' md:grow grow-0 items-center'>
            <div className='flex items-center justify-between'>

              <div className='hidden md:flex items-center gap-4'>
                <ul className='flex items-center  gap-4 '>
                  <li><Link to={"/dashboard"}>DashBoard</Link> </li>
                  <li><Link to={"/income"}>Income</Link></li>
                  <li><Link to={"/expense"}>Expense</Link></li>
                </ul>

              </div>
              <div className='flex  items-center gap-4'>

                <div className="relative ">
                  <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className=""
                    type="button"
                  >
                    <RxAvatar className='text-2xl font-bold' />

                  </button>
                  {/* Dropdown menu */}
                  {isOpen && (
                    <div
                      className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      style={{ top: '100%', right: 0 }}
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                          <Link to={"/profile"}

                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Profile
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={logout}
                            className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}

                </div>

                <motion.nav
                  initial={false}
                  animate={isOpens ? "open" : "closed"}
                  style={{ zIndex: 1 }}
                  transition={{ ease: 'ease-in-out', duration: 8.9 }} // Adjust duration as needed
                  className='md:hidden flex items-center justify-center'
                >
                  {/* <div className='flex justify-center pt-1 z-[12]'> */}

                  <motion.div className=" z-10" variants={sidebar} />
                  <MenuToggle toggle={() => toggleOpen()} />
                  {/* </div> */}
                  {
                    isOpens ?

                      <div className='absolute   top-[0px] right-[0px] h-[100vh] bg-slate-200 text-black w-[70%]  z-[-1]   '>
                        <ul className='flex flex-col gap-10  justify-center items-center pt-[80px]'>
                          <li className='bg-slate-100 py-4 w-full text-center'> <Link to={"/dashboard"}>Dashboard</Link> </li>
                          <li className='bg-slate-100 py-4 w-full text-center'> <Link to={"/income"}>Income</Link> </li>
                          <li className='bg-slate-100 py-4 w-full text-center'> <Link to={"/expense"}>Expense</Link> </li>
                          <li className='bg-slate-100 py-4 w-full text-center'> <Link to={"/about"}>About</Link> </li>
                        </ul>
                      </div>
                      : null
                  }
                </motion.nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
