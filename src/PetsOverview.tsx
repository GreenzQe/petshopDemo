import {useNavigate} from "react-router";
import {AllPetsAtom} from "./PetAtom.ts";
import {useAtom} from "jotai";

export default function PetsOverview() {
    const [allPets, ] = useAtom(AllPetsAtom)
    const navigate = useNavigate();



    return <div>
        {
            allPets.map(pet => {
                return <div key={pet.id!}>
                    <button onClick={() => {
                        navigate('/pet/' + pet.id)
                    }}>{pet.name}</button>
                </div>
            })
        }
    </div>
}