import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Всё кроме api, _next, файлов со extensions
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
