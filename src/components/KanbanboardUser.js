import React,{useState,useEffect} from 'react'
import './Kanbanboard.css'
import personLogo from '../Icons/Users/icons8-male-user-48.png'
import todologo from '../Icons/status/todo.png'
import wiplogo from '../Icons/status/workinprogress.png'
import pendinglogo from '../Icons/status/pending.png'
import featureImg from '../Icons/Feature/feature.png'
import { getRiskLogo } from '../utils/funcs'

const KanbanboardUser = ({ groupedData ,users,so}) => {
    
    const [sortedGroupedData, setSortedGroupedData] = useState(groupedData);
    
    useEffect(() => {
        const x = sortGroupedData()
        setSortedGroupedData(x);
        
      }, [groupedData,so]);
    
      const sortGroupedData = () => {
        const sortedData = {};
        if(so){
        if (so === 'Priority') {
          for (const user in groupedData) {
            if (groupedData.hasOwnProperty(user)) {
              const userTickets = groupedData[user];
    
              const sortedTickets = userTickets.sort((a, b) => b.priority - a.priority);
      
              sortedData[user] = sortedTickets;
            }
          }
        } else if (so === 'Title') {
          for (const user in groupedData) {
            if (groupedData.hasOwnProperty(user)) {
              const userTickets = groupedData[user];

              const sortedTickets = userTickets.sort((a, b) =>
                a.title.localeCompare(b.title)
              );
            
              sortedData[user] = sortedTickets;
            }
          }
        }
        
        return sortedData
    }
      };
      
      
    return (
        
        <div className="kanban-board">
            
            {users.map(user => (
                <div key={user.id} className="kanban-column">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <p style={{fontSize:'18px'}}>{user.name}</p>
                        <img style={{ width:'35px' ,height:'35px' } } src={personLogo} alt="" />
                    </div>
                    {sortedGroupedData[user.id]?.map(ticket => (
                    
                    <div key={ticket.id} className="kanban-card">
                            
                            <div style={{color:'#9b9c9e'}} className="ticket-id">{ticket.id}</div>
                            <div style={{display:'flex', alignItems:'flex-start' }} className="ticket-info">
                                <img  style={{marginTop:'10px'}} className='statuslogo' src={ticket.status === 'Todo' ? todologo : (ticket.status=='In progress') ? wiplogo : pendinglogo} />
                                <p style={{marginLeft:'10px',color:'black'}} className="title">{ticket.title}</p>
                            </div>
                            <div style={{display:'flex',alignItems:'center'}} >
                                
                                <img  style={{ width:'24px' ,height:'24px' } } src={getRiskLogo(ticket.priority)} />
                                <div  
                                    className="user-feature" >
                                    <img style={{ width:'15px' ,height:'15px'} }  src={featureImg}  ></img>
                                    <p style={{margin:'0px 5px'}}>{ticket.tag[0]}</p>
                                </div>
                            </div>
                            
                    </div>
                    ))}
                </div>
            ))}
        </div>
    );
  }

export default KanbanboardUser