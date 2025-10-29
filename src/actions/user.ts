import { $user } from "@/lib/stores/userStore";
import type { User, UserResponse } from "@/lib/types/user";
import { $userStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { API_URL } from "astro:env/server";

export const userActions = {
  getUsers: defineAction({
    handler: async () => {
      try {
        const response = await fetch(API_URL + `user/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        )
        const users: User[] = await response.json()
        return users
      } catch (error) {
        console.error('Error fetching users:', error)
      }
  }
  }),
  getUser: defineAction({
    input: z.object({
      username: z.string()
    }),
    handler: async (input) => {
      try {
        console.log(API_URL);
        
        const response = await fetch(API_URL + `user/userByUsername/${input.username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        return await response.json();
      } catch (error) {
        console.error('Error fetching user:', error)
        return { success: false, message: "Error getting user by username"};
      }
    }
  }),
  createUser: defineAction({
    handler: async (input) => {
      const user = useStore($userStore)
      console.log(user);    
      try {
        const response = await fetch(API_URL + "user", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user
            }
          ),
          credentials: "include"
        })
        const data = await response.json()
        return { succes: true, message: "User created successfully", data }
      } catch (error) {
        console.error('Error creating user', error)
        return { succes: false, message: "Error creating user"}
      }
    }
  })
}