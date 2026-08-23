# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Order Email Notifications

This project includes a Node/Express backend API for secure order processing and store-owner email notifications.

### Environment Variables

Copy `.env.example` to `.env` and fill in your SMTP credentials:

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_username
EMAIL_PASS=your_smtp_password
STORE_OWNER_EMAIL=elasarapushanmukhasai@gmail.com
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
VITE_API_URL=http://localhost:5000
```

Never add real email credentials to frontend code or commit `.env`.

### Local Development

Install dependencies:

```bash
npm install
```

Run the frontend and backend together:

```bash
npm run dev:full
```

Or run them separately:

```bash
npm run server
npm run dev
```

The checkout form posts to `POST /api/orders`. The server validates required customer and cart fields, saves the order to `server/data/orders.json`, then attempts to send a Nodemailer email. If email delivery fails, the saved order still returns a successful response and the error is logged on the server.

### Deployment

Deploy the Express server with the same environment variables configured in your hosting provider. Set `CLIENT_ORIGIN` to your deployed frontend URL and set `VITE_API_URL` to your deployed backend URL before building the frontend.
