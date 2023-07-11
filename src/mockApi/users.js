
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
  ];
  
  export const fetchUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 1000);
    });
  };
  