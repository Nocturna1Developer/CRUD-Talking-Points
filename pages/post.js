// This class allows us to type stuff into a text box and post on the website

import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Router, { userEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Gives notifications when certain threshold is met
import { toast } from 'react-toastify';

export default function Post() {
    // Form state 
    const [post, setPost] = useState({ description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    // Submit post with form - when page gets reset we don't want to rest data in from
    // ! posting says insufficient permissions (timestamp 1:13:07)
    const submitPost = async (e) => {
        e.preventDefault();

        // Checks if user is allowed to submit
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

        // making new post, creates a "collection" in firebase
        const collectionRef = collection(db, "posts");
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });
        setPost({ description: "" });
        return route.push('/'); // user goes back to home screen after commenting on the form
    };
    
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
                    className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
