
export const deleteUserById = async (id) => {
  try {
    const response = await fetch(`http://10.120.32.81/restaurant/api/v1/users/${id}`,{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });

    return await response.json();

  } catch (error) {
    console.error('Error deleting user', error);
    //setErrorMessage('Something went wrong');
  }
}
