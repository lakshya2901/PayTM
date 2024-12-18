import { Appbar } from "../components/Appbar";
import { Balance }from "../components/Balance"
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard(){
    return (
        <div className="px-10 py-10">
            <Appbar></Appbar>
            <Balance value = {"1000"}/>
            <Users />
        </div>
    )
}