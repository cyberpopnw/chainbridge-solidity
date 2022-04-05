import styled from 'styled-components'

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15rem;
  grid-row-gap: 6rem;

  .arco-form-label-item > label {
    font-size: 2rem;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
  }

  .arco-form-item-wrapper {
    .arco-select-view, .arco-input {
      height: 6rem;
      border-radius: 10px;
      background-color: transparent;
      border: 2px solid rgba(255, 255, 255, .2);
      transition: all .3s;
      
      :hover {
        border: 2px solid #ffffff;
      }
    }

    .arco-select-view {
      &-input {
        color: #ffffff;
        font-size: 1.5rem;

        ::placeholder {
          color: rgba(255, 255, 255, .2);
        }
      }

      &-value {
        line-height: 6rem;
        font-size: 1.5rem;
        color: #ffffff;
      }
    }

    .arco-input {
      height: 6rem;
      border-radius: 10px;
      background-color: transparent;
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, .2);
      font-size: 1.5rem;

      ::placeholder {
        color: rgba(255, 255, 255, .2);
      }
    }

    .form-full-button {
      width: 100%;
      height: 6rem;
      border-radius: 10px;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`
