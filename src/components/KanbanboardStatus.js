import React , {useEffect,useState}from 'react'
import './Kanbanboard.css'
import todologo from '../Icons/status/todo.png'
import wiplogo from '../Icons/status/workinprogress.png'
import pendinglogo from '../Icons/status/pending.png'
import featureImg from '../Icons/Feature/feature.png'
import plus from '../Icons/priority/plus.png'
import dots from '../Icons/priority/nopriority.png'
import personLogo from '../Icons/Users/icons8-male-user-48.png'
import { getRiskLogo} from '../utils/funcs'

const KanbanboardStatus = ({groupedData , so}) => {

    
    console.log(groupedData)

    const [sortedGroupedData, setSortedGroupedData] = useState(groupedData);

    useEffect(() => {
      const sortedData = sortGroupedData();
      setSortedGroupedData(sortedData);
    }, [so, groupedData]);

    const sortGroupedData = () => {
      const sortedData = {};
    
      if (so === 'Priority') {
        for (const status in groupedData) {
          if (groupedData.hasOwnProperty(status)) {
            const statusTickets = groupedData[status];
    
            // Sort tickets by priority in descending order
            const sortedTickets = statusTickets.sort((a, b) => b.priority - a.priority);
    
            sortedData[status] = sortedTickets;
          }
        }
      } else if (so === 'Title') {
        for (const status in groupedData) {
          if (groupedData.hasOwnProperty(status)) {
            const statusTickets = groupedData[status];
    
            // Sort tickets by title in alphabetical order
            const sortedTickets = statusTickets.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
    
            sortedData[status] = sortedTickets;
          }
        }
      }
    
      return sortedData;
    };
    
  return (
    <div className="kanban-board">
      {Object.keys(groupedData).map(status => (
        <div key={status} className="kanban-column">

              <div style={{display:'flex' ,alignItems:'center',justifyContent:'space-between' }}>
                <div style={{display:'flex' ,alignItems:'center' }}>
                  <img className='statuslogo' src={status === 'Todo' ? todologo : (status=='In progress') ? wiplogo : pendinglogo} />
                  <p  style={{marginLeft:'5px',fontSize:'18px',}}>  {status}</p>
                </div>
                <div>
                  <div>
                    <img style={{ width:'25px' ,height:'25px',margin:'0px 5px'}}  src={plus} alt="" />
                    <img style={{ width:'25px' ,height:'25px',}} src={dots} alt="" />
                  </div>
                </div>
              </div>
            
            
            {sortedGroupedData[status]?.map(ticket => (

            <div key={ticket.id} className="kanban-card">
              <div style={{color:'#9b9c9e'}} className="ticket-id">{ticket.id}</div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                
                <p style={{color:'black',fontSize:'14px'}} >{ticket.title}</p>
                <img   style={{ width:'25px' ,height:'25px',}} src={personLogo}></img>
              </div>
              <div className='status-feature' >
                <img  style={{ width:'24px' ,height:'24px' } } src={getRiskLogo(ticket.priority)} />
                <div className="user-feature">
                    <img style={{ width:'15px' ,height:'15px'} }  src={featureImg}  ></img>
                    <p style={{margin:'0px 5px'}}>{ticket.tag[0]}</p>
                </div>
              </div>
              
              {/* Add user info if needed */}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default KanbanboardStatus