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
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");

    const handleCreate = () => {
        fetch(`https://api-divine-grass-2111.fly.dev/CreatePet`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                breed,
                imgurl,
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
                            Add new pet
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li>
                                <input
                                    name="Name"
                                    type="text"
                                    placeholder="Pet Name"
                                    className="input"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </li>
                            <br/>
                            <li>
                                <input
                                    name="Breed"
                                    type="text"
                                    placeholder="Pet Breed"
                                    className="input"
                                    value={breed}
                                    onChange={e => setBreed(e.target.value)}
                                />
                            </li>
                            <br/>
                            <li>
                                <input
                                    name="IMG"
                                    type="text"
                                    placeholder="Image URL"
                                    className="input"
                                    value={imgurl}
                                    onChange={e => setImgurl(e.target.value)}
                                />
                            </li>
                            <br/>
                            <li>
                            <button onClick={handleCreate}>Add Pet</button>
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
