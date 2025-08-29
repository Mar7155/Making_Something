import { defineAction } from "astro:actions";

export const userActions = {
  getUsers: defineAction({
    handler: async () => {
      fetch(`http://localhost:3000/users/getUsers`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log('User data:', data)
        })
        .catch(error => {
          console.error('Error fetching user:', error)
        })
    }
  })
}