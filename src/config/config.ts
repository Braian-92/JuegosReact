interface Config {
    API_URL: string;
    APP_VERSION: string;
}

const config: Config = {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost/JuegosReact/api',
    APP_VERSION: '1.0.0'
};

export default config; 