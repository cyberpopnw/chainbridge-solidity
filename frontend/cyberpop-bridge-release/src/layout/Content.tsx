import styled from 'styled-components'

const Content = styled.div<{
  justifyCenter?: boolean;
  alignCenter?: boolean;
}>`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  
  ${p => p.justifyCenter && `
    justify-content: center;
  `};

  ${p => p.alignCenter && `
    align-items: center;
  `};
  
  @media only screen and (min-width: 800px) {
    padding: 5rem 10rem;
  }
`

export default Content
