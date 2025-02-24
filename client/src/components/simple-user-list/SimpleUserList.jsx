import React, { useCallback, useState, useEffect, useContext  } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/ThemeProvider';
//import { UserContext } from '../../contexts/UserProvider';
import Details from './Deatils';

/**
 *
 * @param {date} format yyyy-mm-gg
 * @returns rendered comppnent
 */
function SimpleUserList() {

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAndProcessData = async (limit) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Replace with your API URL
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();

      let users = data.map(user => {
        return {
          name: user.name,
          email: user.email,
        };
      });

      if( limit != null){
        users = users.slice(0, limit);
      }

      setUsers(users);
      setUser(users[0]);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      fetchAndProcessData(4);
      //outputRef.current.innerText = count3;
  }, []); // solo quando count3 cambia

  useEffect(() => {
    setUser(users[0]);
    //outputRef.current.innerText = count3;
  }, [users]); // solo quando count3 cambia


  const userClick = (user) => {
    return () => {
      console.log("Product clicked: ", user);
      setUser(user);
    };
  };

  const removeUser = (userRemoved, index) => {
    return () => {
      console.log("removeUser at index ", index);
      console.log("removeUser is ", userRemoved);




      let updatedUsers = users.filter((userRemoved, i) => i !== index);
      setUsers(updatedUsers);

      if(user.name === userRemoved.name) {

        const lastUser = updatedUsers[0];
        setUser(lastUser);
      }

    }
  };

  const userList = <div>

    {users && users.length > 0 ? (
      <div>
      {users.map((user, index) => (
        <div key={index} onClick={userClick(user)}>
          <span style={{cursor: 'pointer'}}>{user.name}</span>  <span onClick={removeUser(user, index)} style={{cursor: 'pointer'}}>&nbsp;-remove</span>
        </div>
      ))}
      </div>
    ) : (<div>Caricamento in corso...</div>)}

  </div>;


  return (
    <div className='userlist-container'>

      <h2>React user list</h2>

      <div className="flex-container" style={{ maxHeight: 500}}>

        <div className="flex-item user-details">
            <Details user={user} />
        </div>

        <div className="flex-item">
          {userList}
        </div>

      </div>
    </div>
  );
}

export default SimpleUserList;
