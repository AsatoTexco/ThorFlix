'client side'
import React from 'react' 

  
function LinkEmb({idMovie}) {  
  return (
    <div> 
      <a target='_blank' href={ Buffer.from("aHR0cHM6Ly9lbWJlZGRlci5uZXQvZS9tb3ZpZT90bWRiPQ==", 'base64').toString('utf-8')+ +idMovie}>Link</a>
    </div>
  )
}

export default LinkEmb