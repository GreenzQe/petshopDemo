import {useAtom} from "jotai";
import {AllAuthorsAtom} from "./PetAtom.ts";

export interface Author {
    id: number
    idBook: number
    firstName: string
    lastName: string
}

export default function AuthorsOverview() {

    const [allAuthors] = useAtom(AllAuthorsAtom)



    return (<>

        {
            allAuthors.map(a => {
                return <div key={a.id}>{JSON.stringify(a)}</div>
            })
        }

    </>)
}