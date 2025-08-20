import {useAtom} from "jotai";
import {AllPetsAtom} from "./PetAtom.ts";
import {useEffect} from "react";

export function useInitializeDataForApplication() {

    const [, setAllPets] = useAtom(AllPetsAtom)

    useEffect(() => {
        fetch('https://api-divine-grass-2111.fly.dev/GetPets')
            .then(result => {
                result.json().then(allPets => {
                    setAllPets(allPets)
                })
            });
    }, [])

}