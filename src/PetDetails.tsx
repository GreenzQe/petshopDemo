import {useParams} from "react-router";
import {useAtom} from "jotai";
import {AllPetsAtom} from "./PetAtom.ts";

export type PetIdParameter = {
    petId: string;
}

export interface Pet {
    id: number
    title: string
    description: string
    pageCount: number
    excerpt: string
    publishDate: string
}

export default function PetDetails() {

    const params = useParams<PetIdParameter>();
    const [allPets, setAllPets] = useAtom(AllPetsAtom)
    const pet = allPets.find(b => b.id == Number.parseInt(params.petId!))


    return <div>

        <button onClick={() => {
            const duplicate = [...allPets];
            const index = duplicate.findIndex(b => b.id == Number.parseInt(params.petId!));
            const pet = duplicate[index];
            pet.title = "this is a new title";
            duplicate[index] = pet;
            setAllPets(duplicate);
        }} >Click to change Pet name</button>

        {
            JSON.stringify(pet)
        }

    </div>
}