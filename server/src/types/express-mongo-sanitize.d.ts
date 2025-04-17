declare module 'express-mongo-sanitize' {
    interface Options {
      onSanitize?: ({ req, key }: { req: any; key: string }) => void;
      dryRun?: boolean;
      replaceWith?: string;
      allowDots?: boolean;
      action?: 'remove' | 'replace';
    }
  
    function mongoSanitize(options?: Options): import('express').RequestHandler;
  
    export default mongoSanitize;
  }