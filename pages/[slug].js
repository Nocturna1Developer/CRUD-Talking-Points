import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

// Dynamic page - no matter the URL, it will always come back here
export default function Details() {

    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);

    

    // If you click on a individual comment you can see all the replies to that comment, like a dropdown menu but it instead goes to a new page
    return (
        <div>
            <Message {...routeData}></Message>

            <div className="my-4">
                <div className="flex">
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        value={message}
                        placeholder="Send a message!"
                        className="bg-gray-800 w-full p-2 text-white text-sm" />
                    <button
                        onClick={submitMessage}
                        className="bg-cyan-500 text-white py-2 px-4 text-sm">
                        Submit
                    </button>
                </div>

                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessage?.map((message) => (
                        <div className="bg-white p-4 my-4 border-2" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img
                                    className="w-10 rounded-full"
                                    src={message.avatar}
                                    alt=""
                                />
                                <h2>{message.userName}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}