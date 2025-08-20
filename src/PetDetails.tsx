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
    imgur1: string
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
        }} >Click to change Pet name</button>

        {
            JSON.stringify(pet)
        }

    </div>
}