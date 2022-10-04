import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { BsBook } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
// import { logoutUser, setLoader } from "../../redux/actions/AuthActions";
import { logoutUser } from '../../redux/actions/AuthActions';
import toast from "react-hot-toast";

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 80px;
`;

const SidebarNav = styled.nav`
  background: #512DA8;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  width: 300px;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const navigate = useNavigate();
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setLoader("idle"));
//   }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser())
    navigate("/login");
    toast.success("Successfully Logged out");
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <div className='container'>
            <div className='row justify-content-between'>
              <div className='col-auto'>
                <NavIcon to='#'>
                    <FaBars onClick={showSidebar} />
                </NavIcon>
              </div>
              <div className='col-auto text-white font-bold text-lg'>
                Welcome, {props.name.split(" ")[0].replace('"','')}
              </div>
            </div>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <div className='container'>
              <div className='row mt-3 justify-content-end'>
                <div className='col-auto'>
                  <NavIcon to='#'>
                    <AiOutlineClose onClick={showSidebar} />
                  </NavIcon>
                </div>
              </div>
              <div className='row justify-content-center text-white font-bold text-lg mt-3 mb-4'>{props.name.replace(/"/g,'')}</div>
              <div className='row text-white font-bold text-md mb-2'>
                <div className='offset-1 col-10'><hr/></div>
              </div>
              <div className='row font-bold text-md mb-2'>
                <div className='offset-1 col-auto g-0 mt-1'><BsBook/></div>
                <div className='col-auto'><Link to="#" className='text-decoration-none text-white'>Function 1</Link></div>
              </div>
              <div className='row text-white font-bold text-md mb-2'>
                <div className='offset-1 col-auto g-0 mt-1'><AiOutlineHeart/></div>
                <div className='col-auto'><Link to="#" className='text-decoration-none text-white'>Function 2</Link></div>
              </div>
              <div className='row text-white font-bold text-md mb-2'>
                <div className='offset-1 col-auto g-0 mt-1'><FiLogOut/></div>
                <div className='col-auto'><button onClick={() => {handleLogout()}}>Logout</button></div>
              </div>
            </div>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;