import type { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";

const Profile:React.FC = () => {

    const user = useSelector((state:RootState) => state.auth.user)

    console.log(user)

    return (
        <div className="p-5">
            <h1 className="font-bold text-6xl">Profile</h1>
            <p className="text-gray-400 text-xs">View all of your details here.</p>
            <div className="flex border border-dashed mt-5 gap-5 p-5">
                <div className="w-[30%] border rounded-2xl  p-10">
                    <img className="w-60 h-60 rounded-full aspect-square" src={user?.profileImage}/>
                </div>
                <div className="w-[70%] border rounded-2xl p-5">
                    <h2 className="font-medium text-lg">Details</h2>
                    <div className="grid mt-5 md:grid-cols-2 md:grid-rows-4">
                        <div>
                            <h4 className="text-sm text-gray-400">Name</h4>
                            <p>{user?.name}</p>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-400">Email</h4>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-400">Contact Number</h4>
                            <p>{user?.contactNumber}</p>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-400">Date of Birth</h4>
                            <p>{!user?.dateOfBirth ? "01-01-2000" : user?.dateOfBirth}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;