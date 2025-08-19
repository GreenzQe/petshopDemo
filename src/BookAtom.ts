import {atom} from "jotai";
import type {Book} from "./BookDetails.tsx";
import type {Author} from "./Authors.tsx";

export const AllBooksAtom = atom<Book[]>([])
export const AllAuthorsAtom = atom<Author[]>([])