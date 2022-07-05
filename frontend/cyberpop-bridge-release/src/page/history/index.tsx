import { Main } from '@/layout/main'
import DepositsLogTable from '@/page/history/component/DepositsLogTable'
import Nav from '@/component/Nav'
import Content from '@/layout/Content'

const HistoryPage = () => {
  return (
    <Main>
      <Nav/>
      <Content justifyCenter alignCenter>
        <div className="text-center">
          <h1 className="page-primary-title">
            Deposits History
          </h1>
        </div>
        <DepositsLogTable/>
      </Content>
    </Main>
  )
}

export default HistoryPage
