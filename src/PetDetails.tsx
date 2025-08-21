import {useNavigate, useParams} from "react-router";
import {useAtom} from "jotai";
import {AllPetsAtom} from "./PetAtom.ts";

export type PetIdParameter = {
    petId: string;
}

export interface Pet {
    id: string
    name: string
    breed: string
    imgurl: string
    sold: boolean
}

export default function PetDetails() {

    const params = useParams<PetIdParameter>();
    const [allPets, setAllPets] = useAtom(AllPetsAtom)
    const pet = allPets.find(b => b.id == (params.petId!))
    const navigate = useNavigate();

    const handleSoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllPets(pets =>
            pets.map(p =>
                p.id === pet?.id ? { ...p, sold: e.target.checked } : p
            )
        );
    };

    const handleDelete = () => {
        fetch(`https://api-divine-grass-2111.fly.dev/DeletePet/${pet?.id}`, {
            method: 'DELETE',
            body: JSON.stringify({})
        }).then(response => {
                if (response.ok) {
                    setAllPets(pets => pets.filter(p => p.id !== pet?.id));
                }
            }).catch(error => console.log(error));


        navigate('/pets'); // Redirect after deletion
    };


    return <div className="flex justify-center items-center ">

        {
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={pet?.imgurl}
                        alt={pet?.name}/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{pet?.name}</h2>
                    <p>Breed: {pet?.breed}</p>
                    <p>
                        <div className="flex items-center justify-center">
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                            <legend className="fieldset-legend">Sold Status</legend>
                            <label className="label">
                                <input type="checkbox" checked={pet?.sold} onChange={handleSoldChange} className="checkbox"/>
                                Sold
                            </label>
                        </fieldset>
                        </div>
                    </p>
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