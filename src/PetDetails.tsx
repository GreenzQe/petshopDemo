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
    const [allPets] = useAtom(AllPetsAtom)
    const pet = allPets.find(b => b.id == (params.petId!))


    return <div className="flex justify-center items-center ">

        {
            <div className="card bg-base-100 w-96 shadow-sm" >
                <figure>
                    <img
                        src={pet?.imgurl}
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