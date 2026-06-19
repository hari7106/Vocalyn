"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";
import { UserDetailContext } from "./context/UserDetailContext";

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const {
          data: { user: authUser },
          error,
        } = await supabase.auth.getUser();

        if (error || !authUser) {
          console.log("No auth user");
          setLoading(false);
          return;
        }

        const { data: users, error: fetchError } = await supabase
          .from("Users")
          .select("*")
          .eq("email", authUser.email)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error(fetchError);
        }

        if (!users) {
          const { data: newUser, error: insertError } = await supabase
            .from("Users")
            .insert({
              name: authUser.user_metadata?.name,
              email: authUser.email,
              picture: authUser.user_metadata?.picture,
            })
            .select()
            .single();

          if (insertError) {
            console.error(insertError);
          }

          setUser(newUser);
        } else {
          setUser(users);
        }
      } catch (err) {
        console.error("Provider error:", err);
        // Don't block the app - just continue with no user
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div className="p-10">Loading dashboard…</div>;
  }

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
