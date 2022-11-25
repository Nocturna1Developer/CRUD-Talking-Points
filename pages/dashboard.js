import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    // Checking is user is logged
    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");

        // if the user exists display all their comments from firebase storage *comes from logged in user
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where('user', '==', user.uid));

        // same functionality as dash board except we ensured that only current user data is shown, instead of all of them
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    };

    // *Delete Post (references the document in cloud firestore) must need a collection before document is made
    const deletePost = async (id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef); // comes from import statement
    }

    // Get users data when user changes
    useEffect(() => {
        getData();
    }, [user, loading]);

    // ! logout not working for some reason check time stamp 52:51
    return (
        <div>
            <h1 className="text-lg my-2 text-center">Your talking points!</h1>
            <div>
                {posts.map((post) => {
                    return (
                        <Message {...post} key={post.id}>

                            <div className="flex gap-4">

                                <button
                                    onClick={() => deletePost(post.id)}
                                    className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm">
                                    <BsTrash2Fill className="text-2xl" /> Delete
                                </button>

                                <Link href={{ pathname: "/post", query: post }}>
                                    <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                                        <AiFillEdit className="text-2xl" />
                                        Edit
                                    </button>
                                </Link>

                            </div>
                        </Message>
                    );
                })}
            </div>

            <button
                className="font-medium text-white bg-gray-800 py-2 px-4 my-6"
                onClick={() => auth.signOut()}>
                Sign out
            </button>

        </div>
    );
}