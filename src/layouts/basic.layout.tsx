import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  // General Styles
  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;


    /* font-family: 'Roboto', sans-serif; */
    *{
      font-family: 'Roboto', sans-serif;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export const BasicLayout = ({ children }: { children: any }) => {
  return (
    <>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='true'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
        rel='stylesheet'
      ></link>
      <GlobalStyle />
      {children}
    </>
  );
};
