export function validateEnvVars() {
    const requiredEnvVars = [
        'SHOPIFY_API_KEY',
        'SHOPIFY_API_SECRET',
        'HOST',
        'PORT'
    ];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            console.error(`Error: Missing required environment variable: ${envVar}`);
            process.exit(1);
        }
    });
}
