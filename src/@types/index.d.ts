declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_CLIENT: string;
      JWT_SECRET_DELIVERYMAN: string;
      DATABASE_URL: string;
    }
  }
}

export {};
