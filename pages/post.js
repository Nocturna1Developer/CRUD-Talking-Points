import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
// Gives notifications when certain threshold is met
import { toast } from 'react-toastify';

// The Form the user interacts with, This class allows us to type stuff into a text box and post on the website
export default function Post() {

    const [post, setPost] = useState({ description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    // Submit post with form - when page gets reset we don't want to rest data in from
    const submitPost = async (e) => {
        e.preventDefault();

        // Checks post length to see if user is allowed to submit
        if (!post.description) {
            toast.error('Description felid is empty!', {
                // Making an object here
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return;
        }
        else if (post.description.length > 300) {
            toast.error('Description is too long!', {
                // Making an object here
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return;
        }

        if (post?.hasOwnProperty("id")) {
            const docRef = doc(db, "posts", post.id);
            // the text in the text area
            const updatedPost = { ...post, timestamp: serverTimestamp() };
            await updateDoc(docRef, updatedPost);
            return route.push("/");
        } else {
            // Making new post, creates a "collection" in firebase
            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });
            setPost({ description: "" });

            toast.success("Your comment is now live! 🚀🚀🚀", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            
            // user goes back to home screen after commenting on the form
            return route.push("/");
        }
    };

    // When we are editing a post, the current post isn't deleted, instead it carries over to the form
    // Kind of like editing a reddit comment
    const checkUser = async () => {
        if (loading) return;
        if (!user) routeData.push("/auth/login");
        if (routeData.id) {
            setPost({ description: routeData.description, id: routeData.id })
        }
    };

    useEffect(() => {
        checkUser();
    }, [user, loading]);

    // if current post is being edited, the title changes from "create" --> "edit"
    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">
                    {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
                </h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
                    ></textarea>
                    <p className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? "text-red-600" : ""}`}>
                        {post.description.length}/300
                    </p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm">
                    Submit
                </button>
            </form>
        </div>
    );
}
