import { useEffect, useRef, useState } from "react";
import "./styles.css";

const Url = "https://dummyjson.com/users";

export default function App() {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [phone, setPhone] = useState([]);

  const handleToggle = (index) => {
    const disabledCopy = [...disabled];
    disabledCopy[index] = !disabledCopy[index];
    setDisabled(disabledCopy);
  };

  const handleChange = (e, index) => {};

  const count = useRef(0);

  count.current = count.current + 1;
  useEffect(() => {
    if (count.current > 1) {
      //logic
    }
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const resObj = await fetch(Url);
        const data = await resObj.json();
        const phoneData = setData(data.users);
        setPhone();
        setDisabled(new Array(data.users.length).fill(true));
      } catch (e) {}
    };
    getData();
  }, []);

  return (
    <div className="App">
      <table>
        <tr>
          <th>Serial No.</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Action</th>
        </tr>
        {data.length > 0 &&
          data.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td>
                <input
                  onChange={(e) => handleChange(e, index)}
                  value={user.phone}
                  disabled={disabled[index]}
                />
              </td>
              <td>
                {disabled[index] ? (
                  <button onClick={() => handleToggle(index)}>Edit</button>
                ) : (
                  <>
                    <button onClick={() => handleToggle(index)}>Cancel</button>
                    <button onClick={() => handleSave(index)}>Save</button>
                  </>
                )}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
