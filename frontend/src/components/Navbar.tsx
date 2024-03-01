import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLocalStorage } from '../utils/UserLocalStorage';
import { useQueryClient } from 'react-query';
import { UserDataComponent } from './UserData';

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    userLocalStorage.setUserToLocalStorage(null);
    queryClient.invalidateQueries('userLogin');
    navigate('/');
  };

  const { data } = UserDataComponent();

  return (
    <div className='bg-orange-200 '>
      <div className="flex items-center justify-between px-8 relative container mx-auto">
        <div className="logo">Rupesh</div>
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
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className=""
              type="button"
            >
              {data.name}

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
        )}
      </div>
    </div>
  );
};

export default Navbar;
