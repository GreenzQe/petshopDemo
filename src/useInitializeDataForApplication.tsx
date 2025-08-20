import {useAtom} from "jotai";
import {AllAuthorsAtom, AllPetsAtom} from "./PetAtom.ts";
import {useEffect} from "react";

export function useInitializeDataForApplication() {

    const [, setAllPets] = useAtom(AllPetsAtom)
    const [, setAllAuthors] = useAtom(AllAuthorsAtom)

    useEffect(() => {
        fetch('https://fakerestapi.azurewebsites.net/api/v1/Books')
            .then(result => {
                result.json().then(allPets => {
                    setAllPets(allPets)
                })
            })
        fetch('https://fakerestapi.azurewebsites.net/api/v1/Authors').then(result => {
            result.json().then(authors => {
                setAllAuthors(authors);
            })
        });
    }, [])

}