import norisk from '../Icons/priority/nopriority.png'
import lowrisk from '../Icons/priority/low-risk.png'
import midrisk from '../Icons/priority/midrisk.png'
import highrisk from '../Icons/priority/highrisk.png'
import urgent from '../Icons/priority/Urgent.png'
import todologo from '../Icons/status/todo.png'
import wiplogo from '../Icons/status/workinprogress.png'
import pendinglogo from '../Icons/status/pending.png'


export const getRisk=(num)=>{
    
    
    if(num==='0'){
        
        return norisk
      }
      else if(num==='1'){
        return lowrisk
      }
      else if(num==='2'){
        return midrisk
      }
      else if(num==='3'){
        return highrisk
      }
      else if(num==='4'){
        return urgent
      }
}

export const getRiskLogo=(num)=>{
    
    
  if(num===0){
      
      return norisk
    }
    else if(num===1){
      return lowrisk
    }
    else if(num===2){
      return midrisk
    }
    else if(num===3){
      return highrisk
    }
    else if(num===4){
      return urgent
    }
}

export const getPriorityLogo=(priority)=>{
    if(priority==='Todo'){
        return todologo
    }
    else if(priority==='In progress'){
        return wiplogo
    }
    else if(priority==='Backlog'){
        return pendinglogo
    }
}

export const getName =(num)=>{
  if(num==='0'){
    return 'No priority'
  }
  else if(num==='1'){
    return 'Low'
  }
  else if(num==='2'){
    return 'Medium'
  }
  else if(num==='3'){
    return 'High'
  }
  else if(num==='4'){
    return 'Urgent'
  }
}
