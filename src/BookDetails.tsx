import {useParams} from "react-router";
import {useAtom} from "jotai";
import {AllBooksAtom} from "./BookAtom.ts";

export type BookIdParameter = {
    bookId: string;
}

export interface Book {
    id: number
    title: string
    description: string
    pageCount: number
    excerpt: string
    publishDate: string
}

export default function BookDetails() {

    const params = useParams<BookIdParameter>();
    const [allBooks, setAllBooks] = useAtom(AllBooksAtom)
    const book = allBooks.find(b => b.id == Number.parseInt(params.bookId!))


    return <div>

        <button onClick={() => {
            const duplicate = [...allBooks];
            const index = duplicate.findIndex(b => b.id == Number.parseInt(params.bookId!));
            const book = duplicate[index];
            book.title = "this is a new title";
            duplicate[index] = book;
            setAllBooks(duplicate);
        }} >Click to change book title</button>

        {
            JSON.stringify(book)
        }

    </div>
}