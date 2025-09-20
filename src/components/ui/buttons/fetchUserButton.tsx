import React from 'react'
import { Button } from '../button'
import { actions } from 'astro:actions'

function fetchUserButton() {

  function getUser() {
    const userId = "9af8a9c1-847e-4a8c-8b31-9752409e5517"
    actions.orderActions.getUserOrders({ userId })
  }

  return (
    <Button variant={'primary'} onClick={getUser}>
      Fetch User
    </Button>
  )
}

export default fetchUserButton