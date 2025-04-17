import { useState } from "react";
import "./App.css";
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/Sidebar";
import RouteController from "./routes";
import { useLocation } from "react-router-dom";

function App() {
    const [isOpen, setIsOpen] = useState(true);
    const { pathname } = useLocation();

    return (
        <>
            {pathname.includes("/auth") ? (
                <RouteController />
            ) : (
                <div
                    className={` md:grid transition-all duration-300 relative  ${
                        isOpen ? "grid-cols-[260px_auto]" : "grid-cols-[90px_auto]"
                    }`}>
                    <Sidebar
                        className={`absolute z-30 transition-all duration-300 ${
                            isOpen ? "left-0" : "-left-full"
                        } md:static md:block md:left-0 h-full`}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                    />
                    <div>
                        <Navbar className='' setIsOpen={setIsOpen} />
                        <RouteController />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
