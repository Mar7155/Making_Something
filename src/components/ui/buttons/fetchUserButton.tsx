import React from 'react'
import { Button } from '../button'
import { actions } from 'astro:actions'

function fetchUserButton() {

  function getUser() {
    actions.userActions.getUsers()
  }

  return (
    <Button variant={'primary'} onClick={getUser}>
      Fetch User
    </Button>
  )
}

export default fetchUserButton