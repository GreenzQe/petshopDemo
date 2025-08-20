import {atom} from 'jotai';
import type {Pet} from "./PetDetails.tsx";

export const BooksAtom = atom<Pet[]>([]);

