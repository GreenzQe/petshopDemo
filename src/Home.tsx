import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <hr />
                <br />

                <div className="flex justify-center items-center">
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/pets')}>
                        Pets
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Home
                    </button>
                </div>

                {/* Drawer rendered here */}
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                            Add new pet
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li><input type="text" placeholder="Type here" className="input" /></li>
                            <br/>
                            <li><input type="text" placeholder="Type here" className="input" /></li>
                            <br/>
                            <li><input type="text" placeholder="Type here" className="input" /></li>
                            <br/>
                            <li><input type="text" placeholder="Type here" className="input" /></li>
                        </ul>
                    </div>
                </div>

                <Outlet />
                <br />
                <hr />
            </div>
        </>
    );
}