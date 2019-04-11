import React from 'react'
import UserLog from './UserLog';
import UserReg from './UserReg';


const AccountSec = ( {activeTab }) => {
  return (
     <React.Fragment>
     {activeTab === 0 ? (
         <UserLog/>
        ) : activeTab === 1 ? (
          <UserReg/> ): null
     }

     </React.Fragment>
  )
}



export default AccountSec
