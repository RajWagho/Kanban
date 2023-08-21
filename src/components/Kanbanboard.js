import React from 'react'
import './Kanbanboard.css'
import { getName , getRisk } from '../utils/funcs'
import featureImg from '../Icons/Feature/feature.png'
import personLogo from '../Icons/Users/icons8-male-user-48.png'
import { getPriorityLogo } from '../utils/funcs'

const Kanbanboard = ({ groupedData , userData,so}) =>{
  console.log(groupedData)
  const sortedGroupedData = { ...groupedData };

  // Sort the data within each group based on sortingOption
  for (const groupName in sortedGroupedData) {
    if (so === 'Priority') {
      sortedGroupedData[groupName].sort((a, b) => a.priority - b.priority); // Sort by priority (low to high)
    } else if (so === 'Title') {
      sortedGroupedData[groupName].sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (alphabetically)
    }
  }



    return (
    <div className="kanban-board">
      {Object.keys(sortedGroupedData).map((groupName, index) => (
        <div key={index} className="kanban-column">
          
          <div style={{display:'flex',alignItems:'center'}}>
            <img style={{ width:'35px' ,height:'35px' } } src={getRisk(groupName)} alt="" />
            <p style={{marginLeft:'15px'}} >{getName(groupName)}</p>
            <p style={{color:'#9b9c9e' , marginLeft:'20px'}} >{Object.values(sortedGroupedData)[index].length}</p>
          </div>

          {sortedGroupedData[groupName].map(ticket => (

            <div key={ticket.id} className="kanban-card">

              <div style={{color:'#9b9c9e'}} > {ticket.id}</div>

              <div style={{display:'flex',justifyContent:'space-between'}}>
                <p style={{color:'black',fontSize:'14px'}} >{ticket.title}</p>
                <img   style={{ width:'25px' ,height:'25px',}} src={personLogo}></img>
              </div>
              
              <div style={{display:'flex',alignItems:'center'}}>
                <img style={{width: '17px' , height: '17px',}} src={getPriorityLogo(ticket.status)} alt="" />
                <p style={{marginLeft:'10px'}} >{ticket.status}</p>
              </div>
              
              {/* Add more ticket information */}
            </div>
          ))}
        </div>
      ))}
    </div>
      );
  }

export default Kanbanboard

