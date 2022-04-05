import { SubPageContainer } from '@/page/loan/layout/subPageContainer'
import { useState } from 'react'
import { Tabs } from '@arco-design/web-react'
import BorrowSection from '@/page/loan/subPage/Loan/Borrow.section'

type TabKey = 'borrow' | 'order' | 'assetOverview'

const Loan = () => {
  const [currentTabKey, setCurrentTabKey] = useState<TabKey>('borrow')

  return (
    <SubPageContainer>
      <Tabs activeTab={currentTabKey}>
        <Tabs.TabPane key="borrow" title="Borrow">
          <BorrowSection />
        </Tabs.TabPane>
        <Tabs.TabPane key="order" title="Order">
          <></>
        </Tabs.TabPane>
        <Tabs.TabPane key="assetOverview" title="Asset Overview">
          <></>
        </Tabs.TabPane>
      </Tabs>
    </SubPageContainer>
  )
}

export default  Loan
