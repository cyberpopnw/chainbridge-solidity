import styled from 'styled-components'
import LoanPage from '@/page/loan/subPage/Loan'
import { Tabs } from '@arco-design/web-react'
import { BorrowTab, LoanTab } from '@/page/loan/component/tabs'

import { useState } from 'react'


type TabKey = 'loan' | 'borrow'

const Container = styled.div`
  width: 100%;
  height: 7rem;
`

const TabsContainer = styled.div`
  .arco-tabs-header-wrapper {
    justify-content: center;
  }
  
  .tabs-item-icon {
    width: 4rem;
    height: 4rem;
  }
  
  .tabs-item-text {
    font-size: 5rem;
  }
  
  .arco-tabs-header-title-active .tabs-item{
    color: #ffffff;
  }
`

const Loan = () => {
  const [currentTabKey, setCurrentTabKey] = useState<TabKey>('loan')

  return (
    <>
      <Container>
        <TabsContainer>
          <Tabs activeTab={currentTabKey}>
            <Tabs.TabPane key="loan" title={<LoanTab />}>
              <LoanPage />
            </Tabs.TabPane>
            <Tabs.TabPane key="borrow" title={<BorrowTab />}>
              <></>
            </Tabs.TabPane>
          </Tabs>
        </TabsContainer>
      </Container>
    </>
  )
}

export default Loan
