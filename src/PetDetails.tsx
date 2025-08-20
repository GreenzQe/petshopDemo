import {useParams} from "react-router";
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


    return <div>

        <button onClick={() => {
            const duplicate = [...allPets];
            const index = duplicate.findIndex(b => b.id == (params.petId!));
            const pet = duplicate[index];
            pet.name = "this is a new name";
            duplicate[index] = pet;
            setAllPets(duplicate);
        }}>Click to change Pet name
        </button>

        {
            <div className="card lg:card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        src={pet?.imgurl}
                        width={300}
                        height={200}
                        alt={pet?.name}/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{pet?.name}</h2>
                    <p>Breed: {pet?.breed}</p>
                    <p>
                        Sold: {
                        (pet?.sold) ? <span className="text-success">Yes</span> : <span className="text-error">No</span>

                    }  </p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>


        }

    </div>
}