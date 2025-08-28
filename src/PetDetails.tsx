import {useNavigate, useParams} from "react-router";
import {useAtom} from "jotai";
import {AllPetsAtom} from "./PetAtom.ts";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";

export type PetIdParameter = {
    petId: string;
}

export interface Pet {
    id: string
    name: string
    age: number
    breed: string
    imgurl: string
    sold: boolean
}

export default function PetDetails() {

    const params = useParams<PetIdParameter>();
    const [allPets, setAllPets] = useAtom(AllPetsAtom)
    const pet = allPets.find(b => b.id == (params.petId!))
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");

    useEffect(() => {
        setName(pet?.name ?? "");
        setBreed(pet?.breed ?? "");
        setImgurl(pet?.imgurl ?? "")
    }, [pet]);

    const handleSoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        fetch(`https://api-divine-grass-2111.fly.dev/UpdatePet`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: pet?.id,
                name: pet?.name,
                breed: pet?.breed,
                imgurl: pet?.imgurl,
                sold: e.target.checked
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const updatedPet = await response.json();
                    setAllPets((pets: Pet[]) =>
                        pets.map(p => p.id === updatedPet.id ? updatedPet : p)
                    );
                    toast.success("Pet updated successfully.");
                } else {
                    toast.error("Failed to update pet.");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };

    const handleDelete = () => {
        fetch(`https://api-divine-grass-2111.fly.dev/DeletePet?id=${pet?.id}`, {
            method: 'DELETE',
            body: JSON.stringify({})
        }).then(response => {
            if (response.ok) {
                setAllPets(pets => pets.filter(p => p.id !== pet?.id));
                toast.success("Pet deleted successfully.");
            }else{
                toast.error("Failed to delete pet.");
            }
        }).catch(error => {
            console.error(error);
            toast.error(error);
        });


        navigate('/pets'); // Redirect after deletion
    };

    const handleUpdate = () => {
        fetch(`https://api-divine-grass-2111.fly.dev/UpdatePet`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: pet?.id,
                name,
                breed,
                imgurl,
                sold: pet?.sold
            }),
        })
            .then(async response => {
                if (response.ok) {
                    const updatedPet = await response.json();
                    setAllPets((pets: Pet[]) =>
                        pets.map(p => p.id === updatedPet.id ? updatedPet : p)
                    );
                    toast.success("Pet updated successfully.");
                } else {
                    toast.error("Failed to update pet.");
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            });
    };


    return <div className="flex justify-center items-center ">

        {
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={pet?.imgurl}
                        alt={pet?.name}/>
                </figure>
                <div className="drawer2">
                    <input id="my-drawer2" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-content2">
                        {(pet?.id === "1" || pet?.id === "2") ?
                            null
                            : <label htmlFor="my-drawer2" className="btn btn-primary drawer-button">
                                Edit pet
                            </label> }

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li>
                                <input
                                    name="Name"
                                    type="text"
                                    placeholder={name}
                                    className="input"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </li>
                            <br/>
                            <li>
                                <input
                                    name="Age"
                                    type="text"
                                    placeholder={breed}
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
                                    placeholder={imgurl}
                                    className="input"
                                    value={imgurl}
                                    onChange={e => setImgurl(e.target.value)}
                                />
                            </li>
                            <br/>
                            <li>
                                <button onClick={handleUpdate}>Edit Pet</button>
                            </li>
                            <br/>
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{pet?.name}</h2>
                    <p>Breed: {pet?.breed}</p>
                    <div>
                        <div className="flex items-center justify-center">
                            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                                <legend className="fieldset-legend">Sold Status</legend>
                                <label className="label">
                                    <input type="checkbox" checked={pet?.sold} onChange={handleSoldChange} className="checkbox"/>
                                    Sold
                                </label>
                            </fieldset>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        {(pet?.id === "1" || pet?.id === "2") ?
                            null
                            : <button
                                name="karl"
                                onClick={handleDelete}
                                className="btn btn-primary"
                            >
                                Delete
                            </button> }

                    </div>
                </div>
            </div>


        }

    </div>
}