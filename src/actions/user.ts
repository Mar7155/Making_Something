import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const userActions = {
  getUsers: defineAction({
    handler: async () => {
      try {
        
      } catch (error) {
      }
  }
  }),
  getUser: defineAction({
    input: z.object({
      username: z.string()
    }),
    handler: async (input) => {
      try {
        
      } catch (error) {

      }
    }
  }),
  createUser: defineAction({
    handler: async (input) => {
      try {
        
        
      } catch (error) {

      }
    }
  }),
  logout: defineAction({
    handler: async () => {
      try {
        
      } catch (error) {
        
      }
    }
  })
}