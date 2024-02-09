import { createGlobalStyle } from 'styled-components'
import Roboto from './Roboto-Regular.woff'
import RobotoThin from './Roboto-Thin-webfont.woff'

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'), local('Roboto'),
        url(${Roboto}) format('woff');
        font-style: normal;
    }
    @font-face {
        font-family: 'Roboto Thin';
        src: local('Roboto Thin'), local('RobotoThin'),
        url(${RobotoThin}) format('woff');
        font-style: normal;
    }
`
