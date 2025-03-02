import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        // The return statement inside useEffect is used for cleanup functions,
        // which run when the component unmounts or before the effect runs again.
        return () => clearTimeout(timeout)
    }, [search]);

    useEffect(() => {
        async function fetchUsers() {
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`);
            console.log(response.data.user)
            setUsers(response.data.user)
        }
        fetchUsers();
    }, [debouncedSearch]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user.username} user={user} />)}
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"}
                onClick={() => {
                    navigate('/send?id=' + user._id + '&name=' + user.firstName + ' ' + user.lastName)
                }} />
        </div>
    </div>
}