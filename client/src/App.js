import Routes from './pages/Routes';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        background: {
            default: '#f8f8f8'
        }
    }
})

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes />
            </ThemeProvider>
        </>
    );
}

export default App;
