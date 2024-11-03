import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Dashboard(){

    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
    },[])

    const handlelogout = ()=>{
        localStorage.removeItem('user-info');
        navigate('/login');
    }
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Leave');
  const [urgency, setUrgency] = useState('Low');
  const [requests, setRequests] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      title,
      description,
      type,
      urgency,
    };
    setRequests([...requests, newRequest]);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setType('Leave');
    setUrgency('Low');
  };

  const handleApprove = async (request) => {
    try {
      const response = await axios.post('http://localhost:8080/api/approve', request);
      console.log('Approved:', response.data);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };
    return(
        <div>
            <h1>Welcome {userInfo?.name}</h1>
            <h3>Email: {userInfo?.email}</h3>
            <img src={userInfo?.image} alt={userInfo?.email} />
            {userInfo?.selects === 'Admin' ? (
                <div>
                    <h2>Requests</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Urgency</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((request, index) => (
                            <tr key={index}>
                            <td>{request.title}</td>
                            <td>{request.description}</td>
                            <td>{request.type}</td>
                            <td>{request.urgency}</td>
                            <td>
                                <button onClick={() => handleApprove(request)}>Approve</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                        Title of Request:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        </label>
                    </div>

                    <div>
                        <label>
                        Description of Request:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        </label>
                    </div>

                    <div>
                        <label>
                        Type of Request:
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="Leave">Leave</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Overtime">Overtime</option>
                        </select>
                        </label>
                    </div>

                    <div>
                        <label>
                        Urgency:
                        <select value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        </label>
                    </div>

                    <button type="submit">Submit Request</button>
                </form>
            )}
            <button onClick={handlelogout}>Logout</button>
        </div>
    )
}

export default Dashboard