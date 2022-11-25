import Link from "next/link";
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Login menu

// When "create a talking point" is clicked, it takes us back to root folder
// if "talk now" is clicked, it takes us to the auth page
export default function Nav() {
    const [user, loading] = useAuthState(auth);

    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="py-100 my-12 text-3xl text-center">~~TALKING POINTS!~~</button>
            </Link>
            <ul className="flex items-center gap-20">
                {!user && (
                    <Link legacyBehavior href={"/auth/login"}>
                        <a className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
                            Sign up now!
                        </a>
                    </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/post">
                            <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-mg text-small">
                                Start Posting!
                            </button>
                        </Link>

                        <Link href="/dashboard">
                            <img
                                className="w-12 rounded-full cursor-pointer"
                                src={user.photoURL}
                            />
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}