import { Resend } from "resend";

import { env } from "../env/index.mjs";

export const resend = new Resend(env.RESEND_API_KEY);
