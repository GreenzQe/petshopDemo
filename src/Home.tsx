import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { AllPetsAtom } from "./PetAtom.ts";
import type { Pet } from "./PetDetails.tsx";

export default function Home() {
    const navigate = useNavigate();
    const [, setAllPets] = useAtom(AllPetsAtom);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleCreate = () => {
        fetch(`http://localhost:5063/CreatePerson`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: "00000000-0000-0000-0000-000000000000",
                name,
                age: age
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const newPet = await response.json();
                    setAllPets((pets: Pet[]) => [...pets, newPet]);
                    toast.success("Person created successfully.");
                } else {
                    toast.error("Failed to create person.");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("An error occurred.");
            });
    };

    return (
        <>
            <div>
                <hr/>
                <br/>

                <div className="flex justify-center items-center">
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                    <button className="btn btn-primary mx-5" onClick={() => navigate('/pets')}>
                        Pets
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Home
                    </button>
                </div>

                {/* Drawer rendered here */}
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-content">
                        <br/>
                        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                            Add new person
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li>
                                <input
                                    name="Name"
                                    type="text"
                                    placeholder="Name"
                                    className="input"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </li>
                            <br/>
                            <li>
                                <input
                                    name="Age"
                                    type="number"
                                    placeholder="Age"
                                    className="input"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </li>
                            <li>
                                <button onClick={handleCreate}>Add Person</button>
                            </li>
                            <br/>
                        </ul>
                    </div>
                </div>

                <Outlet/>
                <br/>
                <hr/>
            </div>
        </>
    );
}
