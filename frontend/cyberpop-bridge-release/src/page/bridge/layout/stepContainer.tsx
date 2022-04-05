import styled from 'styled-components'
import { Steps } from '@arco-design/web-react'

export const StepContainer = styled(Steps)`
  justify-content: center;
  
  .step-disabled {
    &-title, &-text {
      font-size: 2rem;
      font-weight: 400;
      color: #FFFFFF;
    }
    
    &-title {
      opacity: 0.6;
    }
    
    &-text {
      opacity: 0.8;
    }
  }

  .arco-steps-item:not(:last-child) {
    margin-bottom: 2rem;
  }
  
  .arco-steps-item-title {
    font-size: 2rem;
    font-weight: bold;
    color: #FFFFFF;
  }
  
  .arco-steps-item-description {
    max-width: none;
    margin-top: 2rem;
  }
`

export const StepWrapper = styled.div`
  background-color: #26172F;
  border-radius: 5px;
  padding: 3rem 2rem;
  width: 115rem;

  // Next button
  .next-step-button-wrapper {
    margin-top: 3rem;
    text-align: right;

    .arco-btn {
      height: 4rem;
      width: 10rem;
      border-radius: 10px;
    }
  }
`
