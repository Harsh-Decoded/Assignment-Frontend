import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { setUsers } from "@/store/usersSlice";
import { useAxios } from "@/Middleware";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const users = useSelector((state) => state.user);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Initialize loading state
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch data using Axios (assuming useAxios is a custom hook for Axios)
        useAxios({
            method: "GET",
            url: "/api/users"
        }).then(res => {
            if (res.isSuccess) {
                dispatch(setUsers(res.data));
                setIsDataLoaded(true); // Update state when data is loaded
            } else {
                toast.warn("Failed to fetch data.");
                setIsDataLoaded(true); // Ensure state is updated even on failure
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
            setIsDataLoaded(true); // Handle error and update loading state
            toast.error("An error occurred while fetching data.");
        });
    }, [dispatch]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()));
    }, [users, search]);

    return (
        <main className="flex flex-col mt-20 mx-10 border p-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <Input
                        type="search"
                        placeholder="Search by username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md"
                    />
                    <Link className={buttonVariants({ variant: "default" })} to="/signup"> Add User </Link>
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
                            { !isDataLoaded ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="font-medium">Loading...</TableCell>
                                </TableRow>
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="font-medium">No users found.</TableCell>
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
    );
}
