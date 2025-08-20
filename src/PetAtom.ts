import {atom} from "jotai";
import type {Pet} from "./PetDetails.tsx";
import type {Author} from "./Authors.tsx";

export const AllPetsAtom = atom<Pet[]>([])
export const AllAuthorsAtom = atom<Author[]>([])