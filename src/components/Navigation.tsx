import { NavLink } from "react-router-dom";

export default function Navigation() {
    const navItems = [
        {
            path: "/overview",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            ),
        },
        {
            path: "/products",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            ),
        },
        {
            path: "/gates",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            ),
        },
    ];

    return (
        <nav className="h-screen w-16 bg-primary flex flex-col items-center p-2">
            {/* Logo or app icon */}
            <div className="w-10 h-10 bg-primary rounded-full mt-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </div>
            
            {/* Navigation links */}
            <div className="flex flex-col items-center mt-8 space-y-4">
                {navItems.map((item, index) => (
                    <NavLink 
                        key={index}
                        to={item.path} 
                        className={({ isActive }) => 
                            `w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                isActive ? "bg-primary" : "bg-text-secondary hover:bg-text-primary"
                            }`
                        }
                    >
                        {item.icon}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}