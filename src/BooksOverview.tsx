import {useNavigate} from "react-router";
import {AllBooksAtom} from "./BookAtom.ts";
import {useAtom} from "jotai";

export default function BooksOverview() {
    const [allBooks, ] = useAtom(AllBooksAtom)
    const navigate = useNavigate();



    return <div>
        {
            allBooks.map(book => {
                return <div key={book.id!}>
                    <button onClick={() => {
                        navigate('/book/' + book.id)
                    }}>{book.title}</button>
                </div>
            })
        }
    </div>
}