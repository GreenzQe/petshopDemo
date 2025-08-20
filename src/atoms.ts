import {atom} from 'jotai';
import type {Pet} from "./PetDetails.tsx";

export const PetsAtom = atom<Pet[]>([]);

