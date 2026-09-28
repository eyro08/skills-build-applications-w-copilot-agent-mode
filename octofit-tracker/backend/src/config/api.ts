const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const frontendOrigins = [
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
];