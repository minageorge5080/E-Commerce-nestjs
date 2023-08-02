import * as dotenv from 'dotenv';

dotenv.config();

export class Environments {
  public static DB_URL = process.env.DB_URL ?? '';
}
