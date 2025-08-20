import {useNavigate} from "react-router";
import {Outlet} from "react-router/internal/react-server-client";

export default function Home() {

    const navigate = useNavigate();

    return <>
        <div>

            <hr/>
            <br/>

            <div className="flex h-screen flex-wrap justify-center items-center">
                <button className="btn btn-secondary" onClick={() => {
                    navigate(-1)
                }}>Go back
                </button>
                <button className="btn btn-primary" onClick={() => {
                    navigate('/pets')
                }}>Pets
                </button>
                <button className="btn btn-primary" onClick={() => {
                    navigate('/authors')
                }}>Authors
                </button>
                <button className="btn btn-primary" onClick={() => {
                    navigate('/')
                }}>Home
                </button>

                <Outlet></Outlet>

            </div>
            <br/>
            <hr/>

        </div>
    </>
}