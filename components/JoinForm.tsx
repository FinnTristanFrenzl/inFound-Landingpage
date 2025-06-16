"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client"; // passe den Import an!

export default function JoinForm({ ideaId, receiverId }: { ideaId: string, receiverId: string }) {
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const supabase = createClient()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {data: {user}, error: userError} = await supabase.auth.getUser()
    if (userError) throw new Error('Error getting user')
    if (!user) return alert("Bitte einloggen!");

    setLoading(true);

    const { error } = await supabase.from("join_requests").insert({
      idea_id: ideaId,
      sender_id: user.id,
      receiver_id: receiverId,
      message,
      skills,
      contact_info: contactInfo,
      status: "pending",
    });

    setLoading(false);

    if (error) {
      setErrorState(true)
    } else {
      setErrorState(false)
      setIsSubmit(true)
    }
  };

  return (
    <div>
        {!errorState
        ? <>{isSubmit
            ? <div className="w-full max-w-lg mx-auto p-6 bg-[#0e1725] rounded-xl shadow-md space-y-4 text-white text-center font-bold text-2xl">
                ✅ Request sent!
                </div>
            : <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-[#0e1725] rounded-xl shadow-md space-y-4 text-white">
        <h2 className="text-xl font-semibold">Send join request</h2>

        <div>
            <label className="block mb-1 font-medium">Your message</label>
            <textarea
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Who are you and why do you want to join?"
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Skills / Industry</label>
            <input
            className="w-full border border-gray-300 rounded p-2"
            type="text"
            required
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. Frontend, Marketing, Design..."
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Contact Info</label>
            <input
            className="w-full border border-gray-300 rounded p-2"
            type="text"
            required
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="e.g. Discord, E-Mail, ..."
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 w-full rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white disabled:opacity-50"
        >
            {loading ? "Sending..." : "Send request"}
        </button>
        </form>
            }</>
    : <div className="w-full max-w-lg mx-auto p-6 bg-[#0e1725] rounded-xl shadow-md space-y-4 text-white text-center font-bold text-2xl">
        ❌ An Error occured</div>}
    </div>
  );
}
