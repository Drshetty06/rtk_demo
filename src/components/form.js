// Form.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, QueryClient, QueryClientProvider } from 'react-query'; 
import { updateName, submitName } from '../store/formSlice';
import { setUsers } from '../store/usersSlice';
import { fetchUsers } from '../mockApi/users';

const saveNameToServer = async (name) => {
  // Simulating an API call to save the name
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Saving name: ${name}`);
};

const Form = () => {
  const name = useSelector((state) => state.form.name);
  const submittedName = useSelector((state) => state.form.submittedName);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const queryClient = new QueryClient();

  const { mutate } = useMutation(saveNameToServer, {
    onSuccess: () => {
      dispatch(submitName());
      queryClient.invalidateQueries('users');
    },
  });

  const { data, isLoading, isError } = useQuery('users', fetchUsers, {
    onSuccess: (data) => {
      dispatch(setUsers(data));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(name);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => dispatch(updateName(e.target.value))} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submittedName && <p>Submitted Name: {submittedName}</p>}
      <h2>User List:</h2>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Form;
