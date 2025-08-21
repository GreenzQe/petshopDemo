import {useNavigate} from "react-router";
import {AllPetsAtom} from "./PetAtom.ts";
import {useAtom} from "jotai";


export default function PetsOverview() {
    const [allPets, ] = useAtom(AllPetsAtom)
    const navigate = useNavigate();



    return <div>
        {
            allPets.map(pet => {
                return <div key={pet.id!}>
                    <br></br>
                    <button className="card-xs bg-base-300 shadow-sm" onClick={() => {
                        navigate('/pet/' + pet.id)
                    }}>
                    <div>
                        <img src={pet.imgurl}
                        width={128}
                        height={100}/>
                    </div>{pet.name}
                    </button>
                </div>

            })
        }
    </div>
}