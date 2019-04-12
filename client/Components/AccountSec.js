import React from 'react'
import UserLog from './UserLog';
import UserReg from './UserReg';


const AccountSec = ( {activeTab, method }) => {
  return (
     <React.Fragment>
     {activeTab === 0 ? (
         <UserLog method={method}/>
        ) : activeTab === 1 ? (
          <UserReg method={method}/> ): null
     }

     </React.Fragment>
  )
}



export default AccountSec
