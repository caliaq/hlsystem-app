import Navigation from "../components/Navigation"
import Products from "../components/Products"
import Overview from "../components/Overview"
import Gates from "../components/Gates"

export default function Home() {
    return (
        <div className="flex w-full h-dvh">
            <Navigation />
            <div className="flex flex-1">
                <div className="w-1/2 h-full">
                    <Products />
                </div>
                <div className="flex flex-col w-1/2 flex-1">
                    <div className="w-full h-1/2">
                        <Overview />
                    </div>
                    <div className="w-full h-1/2">
                        <Gates />
                    </div>
                </div>
            </div>
        </div>
    );
}