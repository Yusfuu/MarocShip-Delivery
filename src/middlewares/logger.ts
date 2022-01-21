import morgan from "morgan";
import { createWriteStream } from "fs";
import { IMorgantoken } from "@interfaces/types";


// =========== morgan logger  middleware ============
export const logger = morgan(':id :role :method :url :status :date[web] :remote-addr', { stream: createWriteStream(('./app.log'), { flags: 'a' }) });

export const loggerGetId = (req: IMorgantoken) => req?.user?.id || 'anonymous';

export const loggerGetRole = (req: IMorgantoken) => req?.user?.role || 'user';