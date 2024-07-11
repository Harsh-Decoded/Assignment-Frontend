"use client"

import { useState, useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { setUsers } from "@/store/usersSlice"
import { useAxios } from "@/Middleware"
import { toast } from "react-toastify"

export default function Dashboard() {
    const [search, setSearch] = useState("")
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        useAxios({
            method : "GET",
            url : "/api/users"
        }).then( res => {
            if(res.isSuccess){
                dispatch(setUsers(res.data));
            }else{
                toast.warn("Failed to fetch data..");
            }
        });
    }, [dispatch])

    const filteredUsers = useMemo(() => {
        return users.filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
    }, [users, search])

    return (
        <main className="flex flex-col mt-20 mx-10 border p-4">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Input
                        type="search"
                        placeholder="Search by username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md"
                    />
                </div>
                <div className="overflow-auto border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell className="font-medium">No data found</TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.userName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    )
}
