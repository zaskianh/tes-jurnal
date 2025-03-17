import { useState } from '#imports';
import { usePocketBaseClient } from './pocketbaseClient';

export const usePocketBaseUser = () => {
  const client = usePocketBaseClient()
  const user = useState('user', () => null)
  const isUserLoggedIn = client?.authStore.isValid;
  
  if(isUserLoggedIn) {
    user.value = {
		  email: client.authStore.model.email,
		  name: client.authStore.model.nama,
			id: client.authStore.model.id,
      role: client.authStore.model.role
		}
	} else {
	  user.value = null
	}
  return { user, isUserLoggedIn }
}