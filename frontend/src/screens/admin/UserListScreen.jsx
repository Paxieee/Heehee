import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice'
import { toast}  from 'react-toastify'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
  
  // --------------------------------------------------------------------------------------
  const deleteHandler = async (id) => {
    if (window.confirm('Confirm deleting a user?')) {
        try {
            const response = await deleteUser(id);

            if (response.status === 201) {
            toast.success('User deleted(frontend - deleteHandler).');
            refetch();
            } else {
              toast.error(response?.data?.message || 'Cannot delete admin users(frontend - deleteHandler).');
              refetch();
            }
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }
  };
  // ^Comment^: At this point, backend send error message while deleting a non-admin user, frontend send error message while deleting a admin user.

  // const deleteHandler = async (id) => {
  //   if (window.confirm('Confirm deleting a user?')) {
  //       try {
  //           await deleteUser(id);
  //           toast.success('User deleted(frontend deleteHandler).');
  //           refetch();
  //       } catch (err) {
  //           toast.error(err?.data?.message || err.message)
  //       }
  //   }
  // };
  // --------------------------------------------------------------------------------------

  return (
    <>
      <h1>Users</h1>

      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant={'danger'}>
        {error}
      </Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}> 
                    <Button variant='info' className='btn-sm mx-2'>
                      <FaEdit style={{ color: 'white'}} />
                    </Button>
                  </LinkContainer>
                  <Button variant='warning' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                    <FaTrash style={{ color: 'white'}} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen