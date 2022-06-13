import DepositsLogTable from '@/page/log/component/DepositsLogTable'

import '@/page/log/index.scss'

const LogPage = () => {
 return (
   <>
     <div className="text-center">
       <h1 className="page-primary-title">
         Deposits Status
       </h1>
     </div>
     <DepositsLogTable />
   </>
 )
}

export default LogPage
