

import { useState,useEffect } from 'react';

import { fetchData } from './utils/fetchData';
import Kanbanboard from './components/Kanbanboard';
import KanbanboardUser from './components/KanbanboardUser';
import KanbanboardStatus from './components/KanbanboardStatus';

function App() {

  const [data,setData] = useState({})
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem('groupingOption') || 'By Status'
  );
  const [sortingOption, setSortingOption] = useState(
    localStorage.getItem('sortingOption') || 'Title'
  );
  const [passData,setPassData] = useState({})
  
  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem('sortingOption', sortingOption);
  }, [sortingOption]);


  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setData(data); // Set the data in state
        setTickets(data.tickets)
        setUsers(data.users)
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  useEffect(() => {
    groupAndSortTickets();
  }, [groupingOption,tickets,users,sortingOption]);

  
  const groupAndSortTickets = () => {
    // setGroupedTickets({})
    
    if (groupingOption === 'By Status') {
      
      const groupedByStatus = {}
      for(let i = 0 ;i < tickets.length;i++) {
        const status = tickets[i].status
        if (!groupedByStatus[status]){
          groupedByStatus[status]=[]
        }
        groupedByStatus[status].push(tickets[i])
      }
      
      setGroupedTickets(groupedByStatus)
      

    } 

    else if (groupingOption === 'By User') {
      
      const groupedByUser={}

      for (let i=0;i<tickets.length;i++){
        const user=tickets[i].userId
        if(!groupedByUser[user]){
          groupedByUser[user]=[]
        }
        groupedByUser[user].push(tickets[i])
      }
      
      setGroupedTickets(groupedByUser)
      

    } 
    
    else if (groupingOption === 'By Priority') {

      const groupedByPriority = {};

      for (const ticket of tickets) {
        const priority = ticket.priority;
        if (!groupedByPriority[priority]) {
          groupedByPriority[priority] = [];
        }
        groupedByPriority[priority].push(ticket);
      }
      
      setGroupedTickets(groupedByPriority);
      
    }

    if (sortingOption === 'Priority') {
      // Sort by priority logic...
    } else if (sortingOption === 'Title') {
      // Sort by title logic...
    }
  };

  // console.log(groupedTickets)
  
  return (
    <div >
      <h1 style={{marginLeft:'30px'}}>QuickSell Kanban Board</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' , marginBottom:'10px',marginTop:'20px'}}>
        <select
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
            style={{
              padding: '8px',
              border: '2px solid #ccc',
              borderRadius: '5px',
              marginRight: '10px',
              fontSize: '16px',
            }}
          >
            <option value="By Status">By Status</option>
            <option value="By Priority">By Priority</option>
            <option value="By User">By User</option>
          </select>

          <select
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
            style={{
              padding: '8px',
              border: '2px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
            }}
            >
            <option value="Priority">Sort by Priority</option>
            <option value="Title">Sort by Title</option>
        </select>
      </div>

      {groupingOption === 'By User' ? <KanbanboardUser groupedData={groupedTickets} users={users} so={sortingOption} />: <></>}
      {groupingOption === 'By Status' ? <KanbanboardStatus groupedData={groupedTickets} so={sortingOption} />:<></>}
      {groupingOption === 'By Priority' ? <Kanbanboard groupedData={groupedTickets} usrs={users} so={sortingOption} />:<></>}

    </div>
  );
}

export default App;
