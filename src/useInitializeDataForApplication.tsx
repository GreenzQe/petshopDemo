import {useAtom} from "jotai";
import {AllAuthorsAtom, AllBooksAtom} from "./BookAtom.ts";
import {useEffect} from "react";

export function useInitializeDataForApplication() {

    const [, setAllBooks] = useAtom(AllBooksAtom)
    const [, setAllAuthors] = useAtom(AllAuthorsAtom)

    useEffect(() => {
        fetch('https://fakerestapi.azurewebsites.net/api/v1/Books')
            .then(result => {
                result.json().then(allBooks => {
                    setAllBooks(allBooks)
                })
            })
        fetch('https://fakerestapi.azurewebsites.net/api/v1/Authors').then(result => {
            result.json().then(authors => {
                setAllAuthors(authors);
            })
        });
    }, [])

}