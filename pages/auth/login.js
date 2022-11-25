// go to 'react-icons' .com and import any icons here
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../../utils/firebase";
import { db } from "../../utils/firebase";

// Redirect user to new page using a route
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function Login() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth); // passes in the actual user auth, from utils firebase

    // Google sign in process
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider); // kinda 'imports' exported functions from firebase.js
            route.push("/")  // home page
        } catch (error) {
            console.log(error);
        }
    }

    // runs every time the user changes
    useEffect(() => {
        // takes the user to home page
        if (user) {
            route.push("/");
        }
        else {
            console.log("login");
        }
    }, [user]);

    return (
        <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
            <h2 className="text-2xl">Join Today</h2>
            <div className="py-4">
                <h3 className="py-4">If you want to talk, please sign in!</h3>
                <button onClick={GoogleLogin}
                    className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2">
                    <FcGoogle className="text-2x1" />
                    Google Sign-In
                </button>
            </div>
        </div>
    )
}