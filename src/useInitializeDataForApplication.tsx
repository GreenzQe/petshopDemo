import {useAtom} from "jotai";
import {AllPetsAtom} from "./PetAtom.ts";
import {useEffect} from "react";

export function useInitializeDataForApplication() {

    const [, setAllPets] = useAtom(AllPetsAtom)

    useEffect(() => {
        fetch('http://localhost:5173/persons')
            .then(result => {
                result.json().then(allPets => {
                    setAllPets(allPets)
                })
            });
    }, [])

}