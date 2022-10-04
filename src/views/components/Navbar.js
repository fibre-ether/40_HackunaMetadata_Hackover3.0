import { Disclosure } from "@headlessui/react";
// import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar'
// import { setLoader } from "../../redux/actions/AuthActions";

export default function Navbar() {
//   const { name } = useSelector((state) => state.user.user);
//   const { sap } = useSelector((state) => state.user.user);
//   const { token } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setLoader("idle"));
//   }, [dispatch]);

  return(
    <Disclosure as="nav" className="navbar-bg mb-5 font-poppins">
      {/* {token ?
        <Sidebar name={name} sap={sap}/> :
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start pl-5">
                  <div className="flex space-x-4 text-white font-bold text-3xl">
                    CSE-DS E-LIBRARY
                  </div>
              </div>
          </div>
        </div>
      } */}
      <Sidebar/>
    </Disclosure>
  );
}
